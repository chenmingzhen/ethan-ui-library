import { uploadClass } from '@/styles'
import { KeyboardKey } from '@/utils/keyboard'
import React from 'react'
import { BeforeUploadFileType, EthanFile, UploadImageProps } from './type'
import Upload from './Upload'
import { ERROR, PENDING } from './utils/request'

const UploadImage: React.FC<UploadImageProps> = function (props) {
    const { accept = 'image/*', height = 80, width = 80, validator = {}, children, beforeUpload, ...others } = props

    const style = { width, height }
    const content = children || <div className={uploadClass('indicator')} />

    function handleKeydown(e: React.KeyboardEvent) {
        if (e.key === KeyboardKey.Enter) (e.target as HTMLElement).click()
    }

    async function handleBeforeUpload(blob: File): Promise<EthanFile> {
        let transformedFile: BeforeUploadFileType = blob
        let ethanFile: EthanFile = { status: PENDING, name: blob.name, blob }

        if (beforeUpload) {
            try {
                transformedFile = await beforeUpload(blob)
            } catch (error) {
                return {
                    ...ethanFile,
                    status: ERROR,
                    message: error?.message,
                }
            }
        }

        /** 处理过的文件 */
        if (!(transformedFile instanceof File)) {
            ethanFile = { ...ethanFile, ...transformedFile }
        }

        return new Promise((resolve, reject) => {
            const { imageSize } = validator

            /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader */
            const reader = new FileReader()

            reader.onload = (e) => {
                const data = e.target.result as string
                const image = new window.Image()

                ethanFile.data = ethanFile.data || data

                image.onerror = () => {
                    reject()
                }
                image.onload = () => {
                    if (!imageSize) {
                        resolve(ethanFile)

                        return
                    }

                    const res = imageSize(image)

                    if (res instanceof Error) {
                        ethanFile.status = ERROR
                        ethanFile.message = res.message
                    }

                    resolve(ethanFile)
                }

                image.src = ethanFile.data
            }

            /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL */
            reader.readAsDataURL(blob)
        })
    }

    return (
        <Upload {...others} accept={accept} validator={validator} imageStyle={style} beforeUpload={handleBeforeUpload}>
            <div
                tabIndex={props.disabled ? -1 : 0}
                style={style}
                onKeyDown={handleKeydown}
                className={uploadClass('image-plus', 'image-item', others.disabled && 'disabled')}
            >
                {content}
            </div>
        </Upload>
    )
}

UploadImage.displayName = 'EthanUploadImage'

export default React.memo(UploadImage)
