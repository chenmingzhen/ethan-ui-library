import { getLocale } from '@/locale'
import { uploadClass } from '@/styles'
import { KeyboardKey } from '@/utils/keyboard'
import React, { useEffect, useState } from 'react'
import { BeforeUploadFileType, EthanFile, UploadImageProps } from './type'
import Upload from './Upload'
import { ERROR, PENDING } from './utils/request'

const UploadImage: React.FC<UploadImageProps> = function (props) {
    const { accept = 'image/*', height = 80, width = 80, validator = {}, children, beforeUpload, ...others } = props
    const [urlInvalid, updateUrlInvalid] = useState(false)

    useEffect(() => {
        if (urlInvalid) {
            const timer = setTimeout(() => {
                updateUrlInvalid(false)
            }, 3000)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [urlInvalid])

    const style = { width, height }

    const content = children || <div className={uploadClass('indicator', urlInvalid && 'url-invalid-indicator')} />

    function handleKeydown(e: React.KeyboardEvent) {
        updateUrlInvalid(false)

        if (e.key === KeyboardKey.Enter) (e.target as HTMLElement).click()
    }

    async function handleBeforeUpload(blob: File): Promise<EthanFile> {
        let transformedFile: BeforeUploadFileType = blob

        if (beforeUpload) {
            try {
                transformedFile = await beforeUpload(blob)
            } catch (error) {
                return {
                    blob,
                    status: ERROR,
                    message: error?.message,
                }
            }
        }

        return new Promise((resolve, reject) => {
            const { imageSize } = validator

            const ethanFile: EthanFile = { status: PENDING }

            let transformProps: EthanFile = {}

            /** 处理过后的文件 */
            if (!(transformedFile instanceof File)) {
                transformProps = { ...transformedFile }
            }

            /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader */
            const reader = new FileReader()

            reader.onload = (e) => {
                const data = e.target.result as string
                const image = new window.Image()

                ethanFile.data = data

                image.onerror = () => {
                    updateUrlInvalid(true)
                    reject()
                }
                /** Props的beforeUpload的result覆盖掉内部处理的result */
                image.onload = () => {
                    if (!imageSize) {
                        const processFile = Object.assign({}, ethanFile, transformProps)

                        resolve(processFile)

                        return
                    }

                    const res = imageSize(image)

                    if (res instanceof Error) {
                        ethanFile.status = ERROR

                        ethanFile.message = res.message
                    }

                    const processFile = Object.assign({}, ethanFile, transformProps)

                    resolve(processFile)
                }

                image.src = data
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
                className={uploadClass(
                    'image-plus',
                    'image-item',
                    others.disabled && 'disabled',
                    urlInvalid && 'url-invalid-border'
                )}
            >
                {content}
            </div>
            {urlInvalid && (
                <div style={{ width: '100%', position: 'relative' }}>
                    <div className={uploadClass('url-invalid-message')}>{getLocale('urlInvalidMsg')}</div>
                </div>
            )}
        </Upload>
    )
}

UploadImage.displayName = 'EthanUploadImage'

export default React.memo(UploadImage)
