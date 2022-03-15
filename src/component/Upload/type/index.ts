import React from 'react'

export interface DefaultUploadValue {
    name?: string

    url?: string
}

export interface UploadProps<SuccessData extends any = DefaultUploadValue> {
    accept?: string
    action?: string | ((file: File) => string)
    children?: React.ReactNode
    className?: string
    headers?: any
    htmlName?: string
    /** 最大上传文件数 */
    limit?: number
    /** 多选 */
    multiple?: boolean
    name?: string
    onChange?: (value: SuccessData[]) => void
    onProgress?: ((file: InternalFile) => void) | boolean
    onSuccess?: (value: any, file: File, data: string | ArrayBuffer, xhr: XMLHttpRequest) => SuccessData
    onError?: (xhr: XMLHttpRequest, file: File) => string
    onHttpError?: (xhr: XMLHttpRequest, file: File) => string
    params?: Record<any, any>
    recoverAble?: boolean
    renderResult?: (data) => React.ReactNode
    request?: (options: RequestParams) => XMLHttpRequest
    value?: SuccessData[]
    defaultValue?: SuccessData[]
    style?: React.CSSProperties
    /** 是否携带cookie */
    withCredentials?: boolean
    onStart?: (file: File) => void
    showUploadList?: boolean
    /** todo */
    validator?: any
    validatorHandle?: (error: any, file: File) => boolean | boolean
    disabled?: boolean
    renderContent?: (res, value, index, values) => React.ReactNode
    drop?: boolean
    /** 文件选中后的筛选 */
    filesFilter?: (fileList: File[]) => boolean
    onErrorRemove?: (xhr: XMLHttpRequest, file: File, internalFile?: InternalFile) => void
    forceAccept?: string
}

export interface IUploadProps extends UploadProps {
    beforeUpload?: (blob: File, f) => Promise<InternalFile>
    // todo
    imageStyle?: React.CSSProperties
    validateHook?: Function
    customResult?: React.ElementType
    webkitdirectory?: boolean | string
}

export interface InternalFile {
    name: string
    process: number
    status: number
    blob: File
    message?: string
    xhr?: XMLHttpRequest
    /** todo */
    data?: any
}

export interface UploadState {
    files: Record<string | number, InternalFile>
    /** 回收的下标值List */
    recycle?: number[]
}

export interface RequestParams {
    url: string
    name: string
    file: File
    onStart: UploadProps['onStart']
    onProgress?: (e: ProgressEvent, msg?: string) => void
    onError: (xhr: XMLHttpRequest) => void
    onLoad(xhr: XMLHttpRequest): void
    onSuccess: UploadProps['onSuccess']
    withCredentials: XMLHttpRequest['withCredentials']
    params?: Record<string | number, string | Blob>
    headers?: Record<string | number, string>
}
