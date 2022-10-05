/**
 * cn - 处理文件
 *    -- 利用beforeUpload预先处理文件，例如添加水印
 * en - Process File
 *    -- BeforeUpload return a Promise Object and resolve an EthanFile with MANUAL status
 */
import React from 'react'
import { Upload } from 'ethan-ui'
import { action } from 'doc/config'

export default function() {
    return (
        <div>
            <Upload.Image
                action={action}
                name="file"
                limit={3}
                style={{ width: 300 }}
                beforeUpload={file => {
                    return new Promise(resolve => {
                        const reader = new FileReader()

                        reader.readAsDataURL(file)

                        reader.onload = () => {
                            const img = document.createElement('img')

                            img.src = reader.result as string

                            img.onload = () => {
                                const canvas = document.createElement('canvas')

                                canvas.width = img.naturalWidth
                                canvas.height = img.naturalHeight

                                const ctx = canvas.getContext('2d')

                                ctx.drawImage(img, 0, 0)
                                ctx.fillStyle = 'red'
                                ctx.textBaseline = 'middle'
                                ctx.font = '33px Arial'
                                ctx.fillText('Ethan', 20, 20)
                                canvas.toBlob((blob: File) => {
                                    /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL */
                                    const data = canvas.toDataURL('image/jpeg', 1)

                                    resolve({ blob, data })
                                })
                            }
                        }
                    })
                }}
            />
        </div>
    )
}
