import { UploadFileStatus } from '../type'
import { ERROR } from './request'

export function doMergeStatus(hasError: boolean, defaultStatus: UploadFileStatus, propsStatus?: UploadFileStatus) {
    if (hasError) {
        return ERROR
    }

    if (propsStatus) {
        return propsStatus
    }

    return defaultStatus
}
