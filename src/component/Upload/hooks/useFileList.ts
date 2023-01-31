import useRefMethod from '@/hooks/useRefMethod'
import useStateCallback from '@/hooks/useStateCallback'
import { useUpdateEffect } from 'react-use'
import { EthanFile, UpdateFileListItemAction, UploadProps } from '../type'
import { MANUAL, REMOVED, SUCCESS } from '../utils/request'

interface UseFileListProps {
    defaultValue: EthanFile[]
    value: EthanFile[]
    onChange: UploadProps['onChange']
}

interface UpdateFileListItemParams {
    id: React.Key
    updateProps?: EthanFile
    action?: UpdateFileListItemAction
}

type FileListItemUpdater = (params: UpdateFileListItemParams) => void

const useFileList = (
    props: UseFileListProps
): [
    EthanFile[],
    (state: EthanFile[] | ((state: EthanFile[]) => void), cb?: (state: EthanFile[]) => void) => void,
    FileListItemUpdater
] => {
    const { defaultValue, value, onChange } = props

    const [fileList, updateFileList] = useStateCallback(() => {
        if (value !== undefined) return value
        if (defaultValue !== undefined) return defaultValue
        return []
    })

    const mergeFileList = value !== undefined ? value : fileList

    useUpdateEffect(() => {
        if (value === undefined) {
            updateFileList([])
        }
    }, [value])

    const updateFileListItem: FileListItemUpdater = useRefMethod(({ id, updateProps, action }) => {
        const index = fileList.findIndex((stateFile) => stateFile.id === id)

        if (index === -1) return

        /** for onChange callback params */
        let cacheRemoveFile: EthanFile

        const nextFileList = [...fileList]

        switch (action) {
            case UpdateFileListItemAction.UPDATE: {
                nextFileList[index] = Object.assign({}, nextFileList[index], updateProps)

                break
            }

            case UpdateFileListItemAction.REMOVE: {
                const deleteFileList = nextFileList.splice(index, 1)

                cacheRemoveFile = Object.assign({}, deleteFileList[0], { status: REMOVED })

                break
            }

            case UpdateFileListItemAction.RECOVER: {
                const originStatus = nextFileList[index].status

                const mergeStatus = originStatus === MANUAL ? MANUAL : SUCCESS

                /** 恢复到已成功状态 */
                nextFileList[index] = Object.assign({}, nextFileList[index], { status: mergeStatus })

                break
            }

            case UpdateFileListItemAction.CACHE: {
                nextFileList[index] = Object.assign({}, nextFileList[index], { status: REMOVED })

                cacheRemoveFile = nextFileList[index]

                break
            }

            default:
                nextFileList[index] = Object.assign({}, nextFileList[index])

                break
        }

        let changeFile = cacheRemoveFile

        if (action === UpdateFileListItemAction.REMOVE && cacheRemoveFile) {
            changeFile = cacheRemoveFile
        } else {
            const changeFileIndex = nextFileList.findIndex((stateFile) => stateFile.id === id)

            if (changeFileIndex !== -1) {
                changeFile = nextFileList[changeFileIndex]
            }
        }

        if (changeFile && onChange) {
            onChange(nextFileList, changeFile)
        }

        updateFileList(nextFileList)
    })

    return [mergeFileList, updateFileList, updateFileListItem]
}

export default useFileList
