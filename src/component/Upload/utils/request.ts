export interface DefaultRequestParams {
    url: string
    name: string
    file: File
    onStart: (file: File) => void
    onProgress: XMLHttpRequest['onprogress']
    onLoad(e: EventTarget): void
    onError: XMLHttpRequest['onerror']
    withCredentials: XMLHttpRequest['withCredentials']
    params?: Record<string | number, string | Blob>
    headers?: Record<string | number, string>
}

export const UPLOADING = 1
export const SUCCESS = 2
export const ERROR = 3

const createCORSRequest = (method, url) => {
    let xhr = new XMLHttpRequest()

    if ('withCredentials' in xhr) {
        xhr.open(method, url, true)
    } else {
        xhr = null
    }

    return xhr
}

function defaultRequest(props: DefaultRequestParams) {
    const { url, name, file, onProgress, onLoad, onError, withCredentials, params = {}, headers = {}, onStart } = props

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

    xhr.onload = e => onLoad(e.currentTarget)

    xhr.onerror = onError

    Object.keys(headers).forEach(k => {
        xhr.setRequestHeader(k, headers[k])
    })

    if (onStart) onStart(file)

    xhr.send(data)

    return xhr
}

export default defaultRequest
