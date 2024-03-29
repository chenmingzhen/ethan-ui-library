import { ButtonProps } from '@/component/Button/type'
import React from 'react'

export interface UploadValidator {
    size?: (size: number) => Error | void
    ext?: (ext: string) => Error | void
    customValidator?: (file: File) => Error | void
}

export enum UpdateFileListItemAction {
    /** 更新Props */
    UPDATE = 'UPDATE',
    /** 移除指定的File */
    REMOVE = 'REMOVE',
    /** 恢复文件 */
    RECOVER = 'RECOVER',
    /** 缓存指定文件，但状态为REMOVED */
    CACHE = 'CACHE',
}

export interface UploadProps {
    accept?: string
    action?: string | ((file: File) => string)
    children?: React.ReactNode
    className?: string
    headers?: any
    /** 最大上传文件数 */
    limit?: number
    /** 多选 */
    multiple?: boolean
    name?: string
    onChange?: (fileList: EthanFile[], file: EthanFile) => void
    onProgress?: ((file: EthanFile) => void) | boolean
    onError?: (xhr: XMLHttpRequest) => string
    params?: Record<any, any>
    recoverAble?: boolean
    request?: (options: RequestOptions) => XMLHttpRequest
    value?: EthanFile[]
    defaultValue?: EthanFile[]
    style?: React.CSSProperties
    /** 是否携带cookie */
    withCredentials?: boolean
    showUploadList?: boolean
    validator?: UploadValidator
    disabled?: boolean
    renderContent?: (file: EthanFile) => React.ReactNode
    drop?: boolean
    beforeUpload?: (blob: File) => Promise<EthanFile>
}

export interface IUploadProps extends UploadProps {
    imageStyle?: React.CSSProperties
    customResult?: React.ElementType
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type UploadFileStatus = ('UPLOADING' | 'SUCCESS' | 'ERROR' | 'REMOVED' | 'MANUAL' | 'PENDING') | (string & {})

export interface EthanFile {
    id?: string
    name?: string
    process?: number
    status?: UploadFileStatus
    blob?: File
    message?: string
    xhr?: XMLHttpRequest
    data?: string
}

export interface UploadState {
    fileList: EthanFile[]
}

export interface RequestOptions {
    url: string
    name: string
    file: File
    onProgress?: (e: ProgressEvent) => void
    onError: (xhr: XMLHttpRequest) => void
    onLoad(xhr: XMLHttpRequest): void
    withCredentials: XMLHttpRequest['withCredentials']
    params?: Record<string | number, any> | ((file: File) => Record<string | number, any>)
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

export interface FileProps extends EthanFile {
    onRemove(id: string): void

    onRecover(id: string): void

    style?: React.CSSProperties

    file: EthanFile

    renderContent?: (file: EthanFile) => React.ReactNode

    showRecover: boolean
}

export interface ImageFileProps extends Omit<FileProps, 'style'> {
    style: React.CSSProperties
}

export interface UploadImageValidator extends UploadValidator {
    imageSize?: (image: HTMLImageElement) => Error | void
}

export interface UploadImageProps extends Omit<UploadProps, 'validator'> {
    height?: number
    width?: number
    validator?: UploadImageValidator
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

export type BeforeUploadFileType = File | EthanFile
