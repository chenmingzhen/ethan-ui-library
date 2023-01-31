import { UploadFileStatus } from '../type'
import { ERROR } from './request'

export const VALIDATOR_ITEMS = [
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

export function doMergeStatus(hasError: boolean, defaultStatus: UploadFileStatus, propsStatus?: UploadFileStatus) {
    if (hasError) {
        return ERROR
    }

    if (propsStatus) {
        return propsStatus
    }

    return defaultStatus
}
