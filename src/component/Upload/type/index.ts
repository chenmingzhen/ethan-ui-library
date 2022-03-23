import { ButtonProps } from '@/component/Button'
import React from 'react'

export interface DefaultUploadValue {
    name?: string

    url?: string
}

export interface UploadProps<SuccessData extends any | DefaultUploadValue = any> {
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
    onProgress?: ((file: EthanFile) => void) | boolean
    onSuccess?: (value: any, file: File, data: string, xhr: XMLHttpRequest) => SuccessData
    onError?: (xhr: XMLHttpRequest, file: File) => string | void
    onHttpError?: (xhr: XMLHttpRequest, file: File) => string
    params?: Record<any, any>
    recoverAble?: boolean
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
    validatorHandle?: boolean | ((error: Error, file: File) => boolean)
    disabled?: boolean
    renderContent?: (res: string, value: SuccessData, index: number, values: SuccessData[]) => React.ReactNode
    renderResult?: (data: SuccessData) => React.ReactNode
    drop?: boolean
    /** 文件选中后的筛选 */
    filesFilter?: (fileList: File) => boolean
    onErrorRemove?: (xhr: XMLHttpRequest, file: File, internalFile?: EthanFile) => void
    forceAccept?: string
}

export interface IUploadProps extends UploadProps {
    /** @todo  如果返回false与reject 应该阻止上传，例如antd的Form中 */
    beforeUpload?: (blob: File, f) => Promise<EthanFile>
    imageStyle?: React.CSSProperties
    validateHook?: (hooks) => void
    customResult?: React.ElementType
    webkitdirectory?: boolean | string
}

export interface EthanFile {
    id?: React.Key
    name?: string
    process?: number
    status?: 'UPLOADING' | 'SUCCESS' | 'ERROR' | 'REMOVED' | 'MANUAL'
    blob?: File
    message?: string
    xhr?: XMLHttpRequest
    data?: string
}

export interface UploadState {
    files: Record<string, EthanFile>
    fileList: EthanFile[]
    recycle?: any[]
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

export interface UploadContext extends Pick<UploadProps, 'multiple' | 'accept' | 'disabled' | 'limit'> {
    addFile
}

export interface DropProps extends Pick<UploadProps, 'disabled' | 'accept' | 'multiple'> {
    onDrop(files: File[], dropData?: number): void
    className?: string
    dropData?: number
    children?: React.ReactNode
    drop: boolean
}

export interface FileInputProps extends Pick<UploadProps, 'accept' | 'multiple'> {
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export type AddFileFromDraggerHandler = (e: { fromDragger?: boolean; files?: File[] }) => void

export interface FileProps extends EthanFile {
    id: string

    onRemove(id: string): void

    style?: React.CSSProperties
}

export interface ImageFileProps extends Omit<FileProps, 'style'> {
    style: React.CSSProperties
}

export interface ResultProps extends Pick<IUploadProps, 'renderContent' | 'renderResult'> {
    index: number
    onRemove?: (index: number) => void
    onRecover?: (index: number, value: any) => void
    recoverAble?: boolean
    showRecover?: boolean
    value: any
    [rest: string]: any
}

export interface UploadImageProps extends UploadProps {
    height?: number
    width?: number
}

export interface UploadImageState {
    urlInvalid: boolean
}

export interface UploadProgressProps extends UploadProps, Pick<ButtonProps, 'type'> {
    loading?: React.ReactNode
    placeholder?: React.ReactNode
    className?: string
}

export interface UploadProgressState {
    progress: number
}

export type ImageUploadComponent = React.ComponentClass<UploadImageProps>

export type UploadProgressComponent = React.ComponentClass<UploadProgressProps>

export interface UploadComponent extends React.ComponentClass<UploadProps> {
    Image: ImageUploadComponent
    Button: UploadProgressComponent
}

export type BeforeUploadFileType = File | boolean
