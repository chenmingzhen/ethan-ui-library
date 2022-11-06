import { uploadClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { createRef } from 'react'
import attrAccept from '@/component/Upload/utils/accept'
import { getLocale } from '@/locale'
import immer from 'immer'
import { BeforeUploadFileType, EthanFile, IUploadProps, RequestOptions, UploadState } from './type'
import ImageFile from './ImageFile'
import defaultRequest, { ERROR, MANUAL, PENDING, REMOVED, SUCCESS, UPLOADING } from './utils/request'
import Drop from './Drop'
import FileInput, { FileInputInstance } from './FileInput'
import InternalFileComponent from './File'
import { doMergeStatus } from './utils'

enum UpdateFileListStateAction {
    /** 更新Props */
    UPDATE = 'UPDATE',
    /** 移除指定的File */
    REMOVE = 'REMOVE',
    /** 恢复文件 */
    RECOVER = 'RECOVER',
    /** 缓存指定文件，但状态为REMOVED */
    CACHE = 'CACHE',
}

interface UpdateFileListStateParams {
    id: React.Key
    updateProps?: EthanFile
    action?: UpdateFileListStateAction
}

const VALIDATOR_ITEMS = [
    { key: 'size', params: (file: File) => file.size },
    {
        key: 'ext',
        params: (file: File) => {
            const exts = file.name.split('.')
            return exts[exts.length - 1]
        },
    },
    { key: 'customValidator', params: (file: File) => file },
]

class Upload extends PureComponent<IUploadProps, UploadState> {
    static defaultProps: IUploadProps = {
        limit: 100,
        recoverAble: false,
        validator: {},
        value: [],
        withCredentials: false,
        showUploadList: true,
    }

    static displayName = 'EthanUpload'

    recoverPositionMap = new Map<React.Key, number>()

    fileInput = createRef<FileInputInstance>()

    /** 由于addFile中使用setState callback，所以只有callback完成时才接受Props的受控 */
    propsOnChangeLock = true

    constructor(props: IUploadProps) {
        super(props)

        this.state = {
            fileList: props.value || [],
        }
    }

    useValidator = (blob: File) => {
        const { validator, accept } = this.props

        const { fileList } = this.state

        let error = null

        let i = 0

        const acceptRes = attrAccept(blob, accept)

        /** accept不符合 */
        if (!acceptRes) return new Error(getLocale('invalidAccept'))

        while (VALIDATOR_ITEMS[i]) {
            const item = VALIDATOR_ITEMS[i]

            const validatorFunc = validator[item.key]

            if (typeof validatorFunc === 'function') {
                const params = item.params(blob)

                error = validatorFunc(params, fileList)

                if (error instanceof Error) return error
            }

            i += 1
        }

        return null
    }

    getAction = (file: File) => {
        const { action } = this.props

        if (typeof action === 'string') return action

        if (typeof action === 'function') return action(file)

        return ''
    }

    /** onChange callback dispatcher */
    updateFileListState({ id, updateProps, action }: UpdateFileListStateParams) {
        const { onChange } = this.props

        const index = this.state.fileList.findIndex((stateFile) => stateFile.id === id)

        if (index === -1) return

        /** for onChange callback params */
        let cacheRemoveFile: EthanFile

        this.propsOnChangeLock = false

        this.setState(
            immer((draft) => {
                const fileList = [...draft.fileList]

                switch (action) {
                    case UpdateFileListStateAction.UPDATE: {
                        fileList[index] = Object.assign({}, fileList[index], updateProps)

                        break
                    }

                    case UpdateFileListStateAction.REMOVE: {
                        const deleteFileList = fileList.splice(index, 1)

                        cacheRemoveFile = Object.assign({}, deleteFileList[0], { status: REMOVED })

                        break
                    }

                    case UpdateFileListStateAction.RECOVER: {
                        const originStatus = fileList[index].status

                        const mergeStatus = originStatus === MANUAL ? MANUAL : SUCCESS

                        /** 恢复到已成功状态 */
                        fileList[index] = Object.assign({}, fileList[index], { status: mergeStatus })

                        break
                    }

                    case UpdateFileListStateAction.CACHE: {
                        fileList[index] = Object.assign({}, fileList[index], { status: REMOVED })

                        cacheRemoveFile = fileList[index]

                        break
                    }

                    default:
                        fileList[index] = Object.assign({}, fileList[index])

                        break
                }

                draft.fileList = fileList
            }),
            () => {
                let changeFile = cacheRemoveFile

                if (action === UpdateFileListStateAction.REMOVE && cacheRemoveFile) {
                    changeFile = cacheRemoveFile
                } else {
                    const changeFileIndex = this.state.fileList.findIndex((stateFile) => stateFile.id === id)

                    if (changeFileIndex !== -1) {
                        changeFile = this.state.fileList[changeFileIndex]
                    }
                }

                if (!changeFile) return

                onChange(this.state.fileList, changeFile)
            }
        )
    }

    handleError = (id: React.Key) => {
        const index = this.state.fileList.findIndex((stateFile) => stateFile.id === id)

        if (index === -1) return

        const { onError } = this.props

        const { xhr } = this.state.fileList[index]

        const message = onError?.(xhr) || xhr.statusText || getLocale('uploadFail')

        this.updateFileListState({
            id,
            updateProps: { status: ERROR, message },
            action: UpdateFileListStateAction.UPDATE,
        })
    }

    uploadFile = (ethanFile: EthanFile) => {
        const { blob: file, id } = ethanFile

        const uploadFileIndex = this.state.fileList.findIndex((stateFile) => stateFile.id === id)

        if (uploadFileIndex === -1) return

        const { name, params, withCredentials, headers, request } = this.props

        const req = request || defaultRequest

        const options: RequestOptions = {
            url: this.getAction(file),
            name,
            params,
            withCredentials,
            file,
            headers,
            onProgress: (e) => {
                const percent = (e.loaded / e.total) * 100

                this.updateFileListState({
                    id,
                    updateProps: { process: percent, status: UPLOADING },
                    action: UpdateFileListStateAction.UPDATE,
                })
            },
            onLoad: (xhr) => {
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

        this.setState(
            immer((draft) => {
                draft.fileList[uploadFileIndex].xhr = xhr

                /** 没有action将status设置为Error */
                if (xhr === undefined) {
                    this.updateFileListState({
                        id,
                        updateProps: { status: ERROR },
                        action: UpdateFileListStateAction.UPDATE,
                    })
                }
            }),
            () => {
                /** 等待fileList的基本状态初始完成后，允许Props的受控 */
                this.propsOnChangeLock = false
            }
        )
    }

    processFile = async (originFile: File): Promise<EthanFile> => {
        const { beforeUpload } = this.props

        let transformedFile: BeforeUploadFileType = originFile

        const id = getUidStr()

        const error = this.useValidator(originFile)

        const hasError = error instanceof Error

        if (beforeUpload) {
            try {
                transformedFile = await beforeUpload(originFile)
            } catch {
                // transformedFile = false
            }

            /** 手动上传 */
            if ((transformedFile as EthanFile)?.status === MANUAL) {
                return {
                    id,
                    blob: originFile,
                    name: originFile.name,
                    message: error?.message,
                    ...transformedFile,
                    status: doMergeStatus(hasError, MANUAL),
                }
            }
        }

        /** 无执行过beforeUpload处理的文件 */
        if (transformedFile instanceof File) {
            return {
                id,
                blob: transformedFile,
                name: transformedFile.name,
                status: doMergeStatus(hasError, PENDING),
                message: error?.message,
            }
        }

        return {
            id,
            message: error?.message,
            blob: originFile,
            /** 经过BeforeUpload处理的File有可能有状态与message，需要覆盖默认状态 */
            ...transformedFile,
            status: doMergeStatus(hasError, PENDING, transformedFile?.status),
        }
    }

    handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target

        this.addFile({ files })
    }

    addFile = (data: { files: File[] | FileList; spliceIndex?: number }) => {
        const { limit } = this.props

        const { fileList } = this.state

        const originFileList = Array.from(data.files)

        const addLength = limit - fileList.length

        if (addLength <= 0) return

        const processFileListPromises = originFileList.slice(0, addLength).map(this.processFile)

        Promise.all(processFileListPromises).then((processFileList) => {
            const newFileList = [...fileList]

            const { spliceIndex } = data

            if (spliceIndex === undefined) {
                newFileList.push(...processFileList)
            } else {
                newFileList.splice(spliceIndex, 0, ...processFileList)
            }

            this.propsOnChangeLock = true

            this.setState(
                {
                    fileList: newFileList,
                },
                () => {
                    const pendingPostFileList: EthanFile[] = []

                    const holdFileList: EthanFile[] = []

                    processFileList.forEach((file) => {
                        if (file.status === PENDING) {
                            pendingPostFileList.push(file)
                        } else {
                            holdFileList.push(file)
                        }
                    })

                    /** 非PENDING的文件无执行post，所以没有执行onChange的callback。非PENDING的初始状态在此执行onChange callback */
                    holdFileList.forEach(({ id }) => {
                        this.updateFileListState({ id })
                    })

                    pendingPostFileList.forEach(this.uploadFile)
                }
            )
        })
    }

    handleFileDrop = (files: File[]) => {
        this.addFile({ files })
    }

    handleAddClick = () => {
        const { disabled } = this.props

        if (disabled) return

        this.fileInput.current.click()
    }

    handleRemoveFile = (id: React.Key) => {
        const { disabled, recoverAble } = this.props

        if (disabled) return

        const fileIndex = this.state.fileList.findIndex((file) => file.id === id)

        if (fileIndex === -1) return

        const file = this.state.fileList[fileIndex]

        /** 如果该请求已被发出，XMLHttpRequest.abort() 方法将终止该请求。 */
        if (file.xhr && file.xhr.abort) file.xhr.abort()

        const { status } = file

        let action: UpdateFileListStateAction

        switch (status) {
            case PENDING:
            case ERROR:
            case UPLOADING:
                action = UpdateFileListStateAction.REMOVE
                break
            case SUCCESS:
            case MANUAL:
                if (recoverAble) {
                    action = UpdateFileListStateAction.CACHE
                } else {
                    action = UpdateFileListStateAction.REMOVE
                }
                break

            default:
                break
        }

        this.updateFileListState({
            id,
            action,
        })
    }

    handleReplace = (files: File[], position: number) => {
        const positionFile = this.state.fileList[position]

        if (!positionFile) return

        this.handleRemoveFile(positionFile.id)

        setTimeout(() => {
            this.addFile({ files, spliceIndex: position })
        })
    }

    handleRecoverValue = (id: string) => {
        const { disabled } = this.props

        if (disabled) return

        this.updateFileListState({
            id,
            action: UpdateFileListStateAction.RECOVER,
        })
    }

    componentDidUpdate() {
        /** 受控处理 */
        if (!this.propsOnChangeLock) {
            this.setState({ fileList: this.props.value })
        }
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
                    <FileInput
                        accept={accept}
                        ref={this.fileInput}
                        multiple={multiple}
                        onChange={this.handleFileInputChange}
                    />
                </span>
            </Drop>
        )
    }

    render = () => {
        const { style, imageStyle, showUploadList, disabled, renderContent, drop, accept, recoverAble } = this.props

        const { fileList } = this.state

        const className = classnames(
            uploadClass('_', disabled && 'disabled', showUploadList === false && 'hide-list'),
            this.props.className
        )

        const FileComponent = imageStyle ? ImageFile : InternalFileComponent

        return (
            <div className={className} style={style}>
                {!imageStyle && this.renderHandle()}

                {showUploadList &&
                    fileList.map((file, i) => {
                        const mergeDrop = drop && file.status !== UPLOADING

                        const showRecover = recoverAble && file.status === REMOVED

                        return (
                            <Drop
                                drop={mergeDrop}
                                multiple={false}
                                key={file.id}
                                accept={accept}
                                dropData={i}
                                disabled={disabled}
                                onDrop={this.handleReplace}
                            >
                                <FileComponent
                                    {...file}
                                    file={file}
                                    key={file.id}
                                    style={imageStyle}
                                    onRemove={this.handleRemoveFile}
                                    onRecover={this.handleRecoverValue}
                                    renderContent={renderContent}
                                    showRecover={showRecover}
                                />
                            </Drop>
                        )
                    })}

                {imageStyle && this.renderHandle()}
            </div>
        )
    }
}

export default Upload
