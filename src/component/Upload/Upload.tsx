import { uploadClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { FormError } from '@/utils/errors'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { createRef } from 'react'
import attrAccept from '@/component/Upload/utils/accept'
import { getLocale } from '@/locale'
import immer from 'immer'
import { BeforeUploadFileType, EthanFile, IUploadProps, RequestParams, UploadState } from './type'
import ImageFile from './ImageFile'
import ImageResult from './ImageResult'
import Result from './Result'
import defaultRequest, { ERROR, MANUAL, SUCCESS, UPLOADING } from './utils/request'
import Drop from './Drop'
import FileInput, { FileInputInstance } from './FileInput'
import InternalFileComponent from './File'

enum UpdateFileListStateAction {
    /** 更新Props */
    UPDATE = 'UPDATE',
    /** 移除指定的File */
    REMOVE = 'REMOVE',
    /** 移除指定的File，但保留在缓存区 */
    RECOVER = 'RECOVER',
}

interface UpdateFileListStateParams {
    id: React.Key
    updateProps?: EthanFile
    effect?: (file: EthanFile) => void
    action: UpdateFileListStateAction
}

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

    recoverPositionMap = new Map<React.Key, number>()

    fileInput = createRef<FileInputInstance>()

    constructor(props: IUploadProps) {
        super(props)

        this.state = {
            files: {},
            fileList: [],
            recycle: [],
        }

        props.validateHook(this.validate)
    }

    validate = () => {
        const { files } = this.state

        return new Promise((resolve, reject) => {
            if (Object.keys(files).length > 0) reject(new FormError(''))

            resolve(true)
        })
    }

    useValidator = (blob: File) => {
        const { validator, accept } = this.props

        const { files } = this.state

        let error = null

        let i = 0

        const acceptRes = attrAccept(blob, accept)

        /** accept不符合 */
        if (!acceptRes) return new Error(getLocale('invalidAccept'))

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

    /** onChange callback dispatcher */
    updateFileListState({ id, updateProps, effect, action }: UpdateFileListStateParams) {
        const { onChange } = this.props

        const index = this.state.fileList.findIndex(stateFile => stateFile.id === id)

        if (index === -1) return

        /** for onChange callback params */
        let cacheRemoveFile

        this.setState(
            immer(draft => {
                const fileList = [...draft.fileList]

                switch (action) {
                    case UpdateFileListStateAction.UPDATE: {
                        fileList[index] = Object.assign({}, fileList[index], updateProps)

                        break
                    }

                    case UpdateFileListStateAction.REMOVE:
                    case UpdateFileListStateAction.RECOVER: {
                        const deleteFileList = fileList.splice(index, 1)

                        cacheRemoveFile = Object.assign({}, deleteFileList[0])

                        break
                    }

                    default:
                        break
                }

                draft.fileList = fileList
            }),
            () => {
                let changeFile = cacheRemoveFile

                if (action === UpdateFileListStateAction.REMOVE && cacheRemoveFile) {
                    changeFile = cacheRemoveFile
                } else {
                    const changeFileIndex = this.state.fileList.findIndex(stateFile => stateFile.id === id)

                    if (changeFileIndex !== -1) {
                        changeFile = this.state.fileList[changeFileIndex]
                    }
                }

                if (!changeFile) return

                onChange(this.state.fileList, changeFile)

                if (!effect) return

                effect(changeFile)
            }
        )
    }

    handleError = (id: React.Key) => {
        const index = this.state.fileList.findIndex(stateFile => stateFile.id === id)

        if (index === -1) return

        const { xhr } = this.state.fileList[index]

        const message = xhr.statusText

        this.updateFileListState({
            id,
            updateProps: { status: ERROR, message },
            action: UpdateFileListStateAction.UPDATE,
        })
    }

    uploadFile = (ethanFile: EthanFile) => {
        const { blob: file, id } = ethanFile

        const uploadFileIndex = this.state.fileList.findIndex(stateFile => stateFile.id === id)

        if (uploadFileIndex === -1) return

        const { onSuccess, name, params, withCredentials, headers, request, onProgress, onStart } = this.props

        const req = request || defaultRequest

        const options: RequestParams = {
            url: this.getAction(file),
            name,
            params,
            withCredentials,
            file,
            headers,
            onStart,
            onSuccess,
            onProgress: e => {
                const percent = (e.loaded / e.total) * 100

                const handleProgressButtonCallback = (callbackEthanFile: EthanFile) => {
                    if (typeof onProgress === 'function') {
                        onProgress(callbackEthanFile)
                    }
                }

                this.updateFileListState({
                    id,
                    updateProps: { process: percent, status: UPLOADING },
                    effect: handleProgressButtonCallback,
                    action: UpdateFileListStateAction.UPDATE,
                })
            },
            onLoad: xhr => {
                if (!/^2/.test(String(xhr.status))) {
                    this.handleError(id)

                    return
                }

                this.updateFileListState({
                    id,
                    updateProps: { status: SUCCESS },
                    action: UpdateFileListStateAction.UPDATE,
                })
            },

            onError: () => this.handleError(id),
        }

        const xhr = req(options)

        if (onStart) onStart(file)

        this.setState(
            immer(draft => {
                draft.fileList[uploadFileIndex].xhr = xhr
            })
        )
    }

    processFile = async (originFile: File): Promise<EthanFile> => {
        const { beforeUpload } = this.props

        let transformedFile: BeforeUploadFileType | void = originFile

        const id = getUidStr()

        if (beforeUpload) {
            try {
                transformedFile = await beforeUpload(originFile)
            } catch {
                transformedFile = false
            }

            if (transformedFile === false) {
                return {
                    id,
                    blob: originFile,
                    name: originFile.name,
                    status: -1,
                }
            }
        }

        return {
            id,
            blob: transformedFile,
            name: transformedFile.name,
        }
    }

    addFile = (e: React.ChangeEvent<HTMLInputElement> | { fromDragger: boolean; files: File[] }) => {
        const { limit } = this.props

        const { fileList } = this.state

        const originFileList = Array.from('fromDragger' in e && 'files' in e ? e.files : e.target.files) as File[]

        const addLength = limit - fileList.length

        if (addLength <= 0) return

        const processFileListPromises = originFileList.slice(0, addLength).map(this.processFile)

        Promise.all(processFileListPromises).then(processFileList => {
            const newFileList = [...fileList, ...processFileList]

            this.setState(
                {
                    fileList: newFileList,
                },
                () => {
                    const pendingPostFileList = processFileList.filter(file => file.status !== MANUAL)

                    pendingPostFileList.forEach(processFile => {
                        this.uploadFile(processFile)
                    })
                }
            )
        })
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

    handleRemoveFile = (id: string) => {
        const { disabled, recoverAble } = this.props

        if (disabled) return

        const fileIndex = this.state.fileList.findIndex(file => file.id === id)

        if (fileIndex === -1) return

        const file = this.state.fileList[fileIndex]

        /** 如果该请求已被发出，XMLHttpRequest.abort() 方法将终止该请求。 */
        if (file.xhr && file.xhr.abort) file.xhr.abort()

        this.updateFileListState({
            id,
            action: recoverAble ? UpdateFileListStateAction.RECOVER : UpdateFileListStateAction.REMOVE,
        })
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

    renderHandle = () => {
        const { limit, children, multiple, disabled, drop, accept } = this.props

        const count = this.state.fileList.length

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
            showUploadList,
            disabled,
            renderContent,
            drop,
            accept,
            recoverAble,
        } = this.props

        const { files, recycle, fileList } = this.state

        const className = classnames(
            uploadClass('_', disabled && 'disabled', showUploadList === false && 'hide-list'),
            this.props.className
        )

        const FileComponent = imageStyle ? ImageFile : InternalFileComponent

        const ResultComponent = imageStyle ? ImageResult : Result

        return (
            <div className={className} style={style}>
                {!imageStyle && this.renderHandle()}

                {showUploadList &&
                    fileList.map((file, i) => {
                        const mergeDrop = drop && file.status !== 1

                        return (
                            <Drop
                                drop={mergeDrop}
                                multiple={false}
                                key={i}
                                accept={accept}
                                dropData={i}
                                disabled={disabled}
                                onDrop={this.handleReplace}
                            >
                                <FileComponent
                                    {...file}
                                    key={file.id}
                                    style={imageStyle}
                                    onRemove={this.handleRemoveFile}
                                    renderContent={renderContent}
                                    renderResult={renderResult}
                                    recoverAble={recoverAble}
                                />
                            </Drop>
                        )
                    })}
            </div>
        )
    }
}

export default Upload
