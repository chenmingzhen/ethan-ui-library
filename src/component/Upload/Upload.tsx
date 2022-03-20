import { uploadClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { FormError } from '@/utils/errors'
import { range } from '@/utils/numbers'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { createRef } from 'react'
import attrAccept from '@/component/Upload/utils/accept'
import { getLocale } from '@/locale'
import immer from 'immer'
import { InternalFile, IUploadProps, RequestParams, UploadState } from './type'
import ImageFile from './ImageFile'
import ImageResult from './ImageResult'
import Result from './Result'
import defaultRequest, { ERROR, UPLOADING } from './utils/request'
import Drop from './Drop'
import FileInput, { FileInputInstance } from './FileInput'
import InternalFileComponent from './File'

const VALIDATOR_ITEMS = [
    { key: 'size', param: blob => blob.size },
    {
        key: 'ext',
        param: blob => {
            const exts = blob.name.split('.')
            return exts[exts.length - 1]
        },
    },
    { key: 'customValidator', param: blob => blob },
]

class Upload extends PureComponent<IUploadProps, UploadState> {
    static defaultProps: IUploadProps = {
        limit: 100,
        recoverAble: false,
        validator: {},
        value: [],
        withCredentials: false,
        showUploadList: true,
        validatorHandle: true,
        onProgress: true,
        renderResult: result => result,
    }

    static displayName = 'EthanUpload'

    fileInput = createRef<FileInputInstance>()

    constructor(props: IUploadProps) {
        super(props)

        this.state = {
            files: {},
            recycle: [],
        }

        props.validateHook(this.validate)
    }

    get accept() {
        const { accept, forceAccept } = this.props

        return forceAccept || accept
    }

    validate = () => {
        const { files } = this.state

        return new Promise((resolve, reject) => {
            if (Object.keys(files).length > 0) reject(new FormError(''))

            resolve(true)
        })
    }

    useValidator = (blob: File) => {
        const { validator, forceAccept } = this.props

        const { files } = this.state

        const { accept } = this

        let error = null

        let i = 0

        if (forceAccept) {
            const acceptRes = attrAccept(blob, accept)

            /** accept不符合 */
            if (!acceptRes) return new Error(getLocale('invalidAccept'))
        }

        while (VALIDATOR_ITEMS[i]) {
            const item = VALIDATOR_ITEMS[i]

            if (typeof validator[item.key] === 'function') {
                error = validator[item.key](item.param(blob), files)

                if (error instanceof Error) return error
            }

            i += 1
        }

        return null
    }

    validatorHandle = (error: Error, file: File) => {
        const { validatorHandle } = this.props

        if (typeof validatorHandle === 'function') return validatorHandle(error, file)

        return validatorHandle
    }

    getAction = (file: File) => {
        const { action } = this.props

        if (typeof action === 'string') return action

        if (typeof action === 'function') return action(file)

        return ''
    }

    handleError = (id: string, xhr: XMLHttpRequest, file: File) => {
        const { onError, onHttpError } = this.props

        let message = xhr.statusText

        /** @todo 这个onError与onHttpError重复 */
        if (onError) message = onError(xhr, file) || message

        if (onHttpError) message = onHttpError(xhr, file) || message

        this.setState(
            immer(draft => {
                draft.files[id].status = ERROR
                draft.files[id].message = message
            })
        )
    }

    uploadFile = (id: string, file: File, data?: string) => {
        const { onSuccess, name, htmlName, params, withCredentials, headers, request, onProgress, onStart } = this.props

        const req = request || defaultRequest

        let throttle = false

        const options: RequestParams = {
            url: this.getAction(file),
            name: htmlName || name,
            params,
            withCredentials,
            file,
            headers,
            onStart,
            onSuccess,
            onProgress: (e, msg) => {
                const percent = (e.loaded / e.total) * 100

                if (throttle) return

                throttle = true

                setTimeout(() => {
                    throttle = false
                }, 16)

                if (this.state.files[id]) {
                    this.setState(
                        immer(draft => {
                            draft.files[id].process = percent

                            if (msg) draft.files[id].message = msg
                        }),
                        // expose the file progress to Upload.Button
                        () => {
                            if (typeof onProgress === 'function') {
                                onProgress(this.state.files[id])
                            }
                        }
                    )
                }
            },
            onLoad: xhr => {
                /** http 1223 is apparently a bug in IE */
                if (!/^2/.test(String(xhr.status))) {
                    this.handleError(id, xhr, file)

                    return
                }

                let value = xhr.responseText || xhr.response

                if (onSuccess) {
                    value = onSuccess(value, file, data, xhr)
                }

                if (value instanceof Error) {
                    this.setState(
                        immer(draft => {
                            draft.files[id].status = ERROR
                            draft.files[id].name = file.name
                            draft.files[id].message = value.message
                        })
                    )
                } else {
                    this.setState(
                        immer(draft => {
                            delete draft.files[id]
                        })
                    )

                    const values = immer(this.props.value, draft => {
                        draft.push(value)
                    })

                    this.props.onChange(values)
                }
            },

            onError: xhr => this.handleError(id, xhr, file),
        }

        if (!onProgress) {
            delete options.onProgress
        }

        return req(options)
    }

    addFile = (e: React.ChangeEvent<HTMLInputElement> | { fromDragger: boolean; files: File[] }) => {
        const { beforeUpload, value, limit, filesFilter } = this.props

        let fileList = 'fromDragger' in e && 'files' in e ? e.files : e.target.files

        if (filesFilter) fileList = Array.from(fileList).filter(filesFilter)

        const addLength = limit - value.length - Object.keys(this.state.files).length

        if (addLength <= 0) return

        // eslint-disable-next-line
        const files = { ...this.state.files }

        range(Math.min(fileList.length, addLength)).forEach((_, i) => {
            const blob = fileList[i]

            const id = getUidStr()

            const file: InternalFile = {
                name: blob.name,
                process: -1,
                status: UPLOADING,
                blob,
            }

            files[id] = file

            const error = this.useValidator(blob)

            /** beforeUpload的异步setState在外层setState files后执行 */
            if (error instanceof Error) {
                if (!this.validatorHandle(error, file.blob)) {
                    delete files[id]

                    return
                }

                file.message = error.message

                file.status = ERROR

                if (beforeUpload) {
                    beforeUpload(blob, this.validatorHandle)
                        .then(args => {
                            this.setState(
                                immer(draft => {
                                    draft.files[id] = Object.assign({}, draft.files[id], args)
                                })
                            )
                        })
                        .catch(() => true)
                }

                return
            }

            if (beforeUpload) {
                beforeUpload(blob, this.validatorHandle)
                    .then(args => {
                        if (args.status !== ERROR) files[id].xhr = this.uploadFile(id, blob, args.data)

                        this.setState(
                            immer(draft => {
                                draft.files[id] = Object.assign({}, draft.files[id], args)
                            })
                        )
                    })
                    .catch(() => {
                        this.setState(
                            immer(draft => {
                                delete draft.files[id]
                            })
                        )
                    })
            } else {
                files[id].xhr = this.uploadFile(id, blob)
            }
        })

        this.setState({ files })
    }

    handleFileDrop = (files: File[]) => {
        this.addFile({ files, fromDragger: true })
    }

    handleAddClick = () => {
        const { disabled } = this.props

        if (disabled) return

        this.fileInput.current.click()
    }

    handleRemoveValue = (index: number) => {
        const { recoverAble, disabled } = this.props

        if (disabled) return

        if (recoverAble) {
            this.setState(
                immer(draft => {
                    draft.recycle.push(this.props.value[index])
                })
            )
        }

        const value = immer(this.props.value, draft => {
            draft.splice(index, 1)
        })

        this.props.onChange(value)
    }

    removeFile = (id: string) => {
        const { onErrorRemove } = this.props

        const file = this.state.files[id]

        if (file) {
            /** 如果该请求已被发出，XMLHttpRequest.abort() 方法将终止该请求。 */
            if (file.xhr && file.xhr.abort) file.xhr.abort()

            this.setState(
                immer(draft => {
                    delete draft.files[id]
                }),
                () => {
                    if (file.status === ERROR && onErrorRemove) {
                        onErrorRemove(file.xhr, file.blob, file)
                    }
                }
            )
        }
    }

    handleReplace = (files: File[], index) => {
        this.handleRemoveValue(index)

        setTimeout(() => {
            this.addFile({ files, fromDragger: true })
        })
    }

    /** value为onSuccess的的return */
    handleRecoverValue = (index: number, value: any) => {
        const { disabled } = this.props

        if (disabled) return

        this.props.onChange(
            immer(this.props.value, draft => {
                draft.push(value)
            })
        )

        this.setState(
            immer(draft => {
                draft.recycle.splice(index, 1)
            })
        )
    }

    /** 上传按钮或上传图片占位 */
    renderHandle = () => {
        const { limit, value, children, multiple, disabled, drop } = this.props

        const { accept } = this

        const count = value.length + Object.keys(this.state.files).length

        /** 超过限制 不显示上传 */
        if (limit > 0 && limit <= count) return null

        return (
            <Drop
                accept={accept}
                disabled={disabled}
                onDrop={this.handleFileDrop}
                multiple={multiple || limit > 1}
                drop={drop}
            >
                <span className={uploadClass('handle')} onClick={this.handleAddClick}>
                    {children}
                    <FileInput accept={accept} ref={this.fileInput} multiple={multiple} onChange={this.addFile} />
                </span>
            </Drop>
        )
    }

    render = () => {
        const {
            limit,
            value,
            renderResult,
            style,
            imageStyle,
            recoverAble,
            showUploadList,
            disabled,
            renderContent,
            drop,
        } = this.props

        const { accept } = this

        const { files, recycle } = this.state

        const className = classnames(
            uploadClass('_', disabled && 'disabled', showUploadList === false && 'hide-list'),
            this.props.className
        )

        const FileComponent = imageStyle ? ImageFile : InternalFileComponent

        const ResultComponent = imageStyle ? ImageResult : Result

        return (
            <div className={className} style={style}>
                {!imageStyle && this.renderHandle()}

                {/* Success */}
                {showUploadList &&
                    value.map((v, i) => (
                        <Drop
                            drop={drop}
                            multiple={false}
                            key={i}
                            accept={accept}
                            dropData={i}
                            disabled={disabled}
                            onDrop={this.handleReplace}
                        >
                            <ResultComponent
                                renderContent={renderContent}
                                value={v}
                                values={value}
                                index={i}
                                style={imageStyle}
                                renderResult={renderResult}
                                onRemove={this.handleRemoveValue}
                            />
                        </Drop>
                    ))}

                {showUploadList &&
                    Object.keys(files).map(id => (
                        <FileComponent {...files[id]} key={id} id={id} style={imageStyle} onRemove={this.removeFile} />
                    ))}

                {imageStyle && this.renderHandle()}

                {recoverAble &&
                    recycle.map((v, i) => (
                        <ResultComponent
                            renderContent={renderContent}
                            key={i}
                            value={v}
                            values={recycle}
                            index={i}
                            renderResult={renderResult}
                            showRecover={recoverAble && limit > value.length}
                            onRecover={this.handleRecoverValue}
                            style={imageStyle}
                            recoverAble
                        />
                    ))}
            </div>
        )
    }
}

export default Upload
