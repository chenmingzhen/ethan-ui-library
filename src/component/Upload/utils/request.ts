import { RequestParams } from '../type'

export const UPLOADING = 'UPLOADING'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'
export const REMOVED = 'REMOVED'
export const MANUAL = 'MANUAL'

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

    Object.keys(params).forEach(k => {
        data.append(k, params[k])
    })

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
