import { isObject } from '@/utils/is'
import { RequestParams } from '../type'

/** 上传中 */
export const UPLOADING = 'UPLOADING'
/** 上传成功 */
export const SUCCESS = 'SUCCESS'
/** 上传错误 */
export const ERROR = 'ERROR'
/** 文件被移除 */
export const REMOVED = 'REMOVED'
/** 手动上传 */
export const MANUAL = 'MANUAL'
/** 等待执行任何动作 */
export const PENDING = 'PENDING'

const createCORSRequest = (method, url) => {
    let xhr = new XMLHttpRequest()

    if ('withCredentials' in xhr) {
        xhr.open(method, url, true)
    } else {
        xhr = null
    }

    return xhr
}

function defaultRequest(options: RequestParams) {
    const { url, name, file, onProgress, onLoad, onError, withCredentials, params = {}, headers = {} } = options

    if (!url) {
        console.error(new Error(`action is required, but its value is ${url}`))

        return undefined
    }

    const data = new FormData()

    const processParams = isObject(params) ? params : (params as (file: File) => Record<string | number, any>)?.(file)

    if (isObject(processParams)) {
        Object.keys(processParams).forEach(k => {
            data.append(k, params[k])
        })
    } else {
        console.error(`Expect params is object.But got ${typeof processParams}`)
    }

    data.append(name, file)

    const xhr = createCORSRequest('post', url)

    xhr.withCredentials = withCredentials

    if (onProgress) xhr.upload.addEventListener('progress', onProgress, false)

    xhr.onload = e => onLoad(e.currentTarget as XMLHttpRequest)

    xhr.onerror = onError as any

    Object.keys(headers).forEach(k => {
        xhr.setRequestHeader(k, headers[k])
    })

    xhr.send(data)

    return xhr
}

export default defaultRequest
