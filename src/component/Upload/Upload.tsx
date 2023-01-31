import { uploadClass } from '@/styles'
import classnames from 'classnames'
import React, { useRef } from 'react'
import useRefMethod from '@/hooks/useRefMethod'
import { getUidStr } from '@/utils/uid'
import { getLocale } from '@/locale'
import { isError, isFunc, isString } from '@/utils/is'
import ImageFile from './ImageFile'
import { BeforeUploadFileType, EthanFile, IUploadProps, RequestOptions, UpdateFileListItemAction } from './type'
import InternalFileComponent from './File'
import Drop from './Drop'
import FileInput, { FileInputInstance } from './FileInput'
import defaultRequest, { ERROR, MANUAL, PENDING, REMOVED, SUCCESS, UPLOADING } from './utils/request'
import { doMergeStatus, VALIDATOR_ITEMS } from './utils'
import attrAccept from './utils/accept'
import useFileList from './hooks/useFileList'

const Upload: React.FC<IUploadProps> = function (props) {
    const {
        style,
        imageStyle,
        showUploadList = true,
        disabled,
        renderContent,
        drop,
        accept,
        recoverAble,
        limit = 100,
        children,
        multiple,
        onChange,
        beforeUpload,
        validator = {},
        name,
        params,
        withCredentials,
        headers,
        request,
        onError,
    } = props
    const fileInput = useRef<FileInputInstance>()
    const [fileList, updateFileList, updateFileListItem] = useFileList({
        defaultValue: props.defaultValue,
        value: props.value,
        onChange,
    })

    const className = classnames(
        uploadClass('_', disabled && 'disabled', showUploadList === false && 'hide-list'),
        props.className
    )

    const getAction = useRefMethod((file: File) => {
        if (isString(props.action)) return props.action
        if (isFunc(props.action)) return props.action(file)

        return ''
    })

    const validate = useRefMethod((blob: File) => {
        const acceptRes = attrAccept(blob, accept)
        let error = null
        let i = 0

        /** accept不符合 */
        if (!acceptRes) return new Error(getLocale('invalidAccept'))

        while (VALIDATOR_ITEMS[i]) {
            const item = VALIDATOR_ITEMS[i]
            const validatorFunc = validator[item.key]

            if (isFunc(validatorFunc)) {
                error = validatorFunc(item.params(blob), fileList)

                if (error instanceof Error) return error
            }

            i += 1
        }

        return null
    })

    const processFile = useRefMethod(async (originFile: File): Promise<EthanFile> => {
        const id = getUidStr()
        const error = validate(originFile)
        const hasError = isError(error)
        let transformedFile: BeforeUploadFileType = originFile

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
    })

    const handleError = useRefMethod((id: React.Key) => {
        const index = fileList.findIndex((stateFile) => stateFile.id === id)

        if (index === -1) return

        const { xhr } = fileList[index]
        const message = onError?.(xhr) || xhr.statusText || getLocale('uploadFail')

        updateFileListItem({
            id,
            updateProps: { status: ERROR, message },
            action: UpdateFileListItemAction.UPDATE,
        })
    })

    const uploadFile = useRefMethod((ethanFile: EthanFile) => {
        const { blob: file, id } = ethanFile
        const uploadFileIndex = fileList.findIndex((stateFile) => stateFile.id === id)

        if (uploadFileIndex === -1) return

        const req = request || defaultRequest
        const options: RequestOptions = {
            url: getAction(file),
            name,
            params,
            withCredentials,
            file,
            headers,
            onProgress: (e) => {
                const percent = (e.loaded / e.total) * 100

                updateFileListItem({
                    id,
                    updateProps: { process: percent, status: UPLOADING },
                    action: UpdateFileListItemAction.UPDATE,
                })
            },
            onLoad: (xhr) => {
                if (!/^2/.test(String(xhr.status))) {
                    handleError(id)

                    return
                }

                updateFileListItem({
                    id,
                    updateProps: { status: SUCCESS },
                    action: UpdateFileListItemAction.UPDATE,
                })
            },
            onError: () => handleError(id),
        }
        const xhr = req(options)

        updateFileList((prevFileList) => {
            const nextFileList = [...prevFileList]

            nextFileList[uploadFileIndex].xhr = xhr

            /** 没有action将status设置为Error */
            if (xhr === undefined) {
                updateFileListItem({
                    id,
                    updateProps: { status: ERROR },
                    action: UpdateFileListItemAction.UPDATE,
                })
            }

            return nextFileList
        })
    })

    const addFile = useRefMethod((data: { files: File[] | FileList; spliceIndex?: number }) => {
        const originFileList = Array.from(data.files)
        const addLength = limit - fileList.length

        if (addLength <= 0) return

        const processFileListPromises = originFileList.slice(0, addLength).map(processFile)

        Promise.all(processFileListPromises).then((processFileList) => {
            const nextFileList = [...fileList]
            const { spliceIndex } = data

            if (spliceIndex === undefined) {
                nextFileList.push(...processFileList)
            } else {
                nextFileList.splice(spliceIndex, 0, ...processFileList)
            }

            updateFileList(nextFileList, () => {
                const pendingPostFileList: EthanFile[] = []

                processFileList.forEach((file) => {
                    if (file.status === PENDING) {
                        pendingPostFileList.push(file)
                    }

                    /** 触发onChange */
                    updateFileListItem({ id: file.id })
                })

                pendingPostFileList.forEach(uploadFile)
            })
        })
    })

    const handleFileDrop = useRefMethod((files: File[]) => {
        addFile({ files })
    })

    const handleFileInputChange = useRefMethod((e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target

        addFile({ files })
    })

    const handleRemoveFile = useRefMethod((id: React.Key) => {
        if (disabled) return

        const fileIndex = fileList.findIndex((file) => file.id === id)

        if (fileIndex === -1) return

        const file = fileList[fileIndex]

        /** 如果该请求已被发出，XMLHttpRequest.abort() 方法将终止该请求。 */
        if (file.xhr && file.xhr.abort) file.xhr.abort()

        const { status } = file

        let action: UpdateFileListItemAction

        switch (status) {
            case PENDING:
            case ERROR:
            case UPLOADING:
                action = UpdateFileListItemAction.REMOVE
                break
            case SUCCESS:
            case MANUAL:
                if (recoverAble) {
                    action = UpdateFileListItemAction.CACHE
                } else {
                    action = UpdateFileListItemAction.REMOVE
                }
                break

            default:
                break
        }

        updateFileListItem({
            id,
            action,
        })
    })

    const handleReplace = useRefMethod((files: File[], position: number) => {
        const positionFile = fileList[position]

        if (!positionFile) return

        handleRemoveFile(positionFile.id)

        setTimeout(() => {
            addFile({ files, spliceIndex: position })
        })
    })

    const handleRecoverValue = useRefMethod((id: string) => {
        if (disabled) return

        updateFileListItem({
            id,
            action: UpdateFileListItemAction.RECOVER,
        })
    })

    function handleAddClick() {
        if (disabled || !fileInput.current) return

        fileInput.current.click()
    }

    function buildHandler() {
        const count = fileList.length

        if (limit > 0 && limit <= count) return null

        return (
            <Drop
                accept={accept}
                disabled={disabled}
                onDrop={handleFileDrop}
                multiple={multiple || limit > 1}
                drop={drop}
            >
                <span className={uploadClass('handle')} onClick={handleAddClick}>
                    {children}
                    <FileInput accept={accept} ref={fileInput} multiple={multiple} onChange={handleFileInputChange} />
                </span>
            </Drop>
        )
    }

    const FileComponent = imageStyle ? ImageFile : InternalFileComponent

    return (
        <div className={className} style={style}>
            {!imageStyle && buildHandler()}

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
                            onDrop={handleReplace}
                        >
                            <FileComponent
                                {...file}
                                file={file}
                                key={file.id}
                                style={imageStyle}
                                onRemove={handleRemoveFile}
                                onRecover={handleRecoverValue}
                                renderContent={renderContent}
                                showRecover={showRecover}
                            />
                        </Drop>
                    )
                })}

            {imageStyle && buildHandler()}
        </div>
    )
}

export default React.memo(Upload)
