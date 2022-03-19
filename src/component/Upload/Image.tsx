import React, { PureComponent } from 'react'
import immer from 'immer'
import { uploadClass } from '@/styles'
import { getLocale } from '@/locale'
import Upload from './Upload'
import { ERROR } from './utils/request'
import { ImageUploadProps, ImageUploadState } from './type'

class Image extends PureComponent<ImageUploadProps, ImageUploadState> {
    timer: NodeJS.Timeout

    static defaultProps: ImageUploadProps = {
        accept: 'image/*',
        height: 80,
        validator: {},
        width: 80,
    }

    constructor(props) {
        super(props)

        this.state = {
            urlInvalid: false,
        }
    }

    componentDidUpdate() {
        if (this.state.urlInvalid) {
            clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                this.setState({ urlInvalid: false })
            }, 3000)
        }
    }

    beforeUpload = (blob: File, validatorHandle: (error: Error, file: File) => boolean) => {
        return new Promise((resolve, reject) => {
            const { imageSize } = this.props.validator

            const file: any = {}
            // FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
            // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
            const reader = new FileReader()

            reader.onload = e => {
                const data = e.target.result

                file.data = data

                const image = new window.Image()

                image.onerror = () => {
                    this.setState(
                        immer(draft => {
                            draft.urlInvalid = true
                        })
                    )

                    reject()
                }

                image.onload = () => {
                    if (!imageSize) {
                        resolve(file)
                        return
                    }

                    const res = imageSize(image)

                    if (res instanceof Error) {
                        if (!validatorHandle(res, blob)) reject()

                        file.status = ERROR

                        file.message = res.message
                    }

                    resolve(file)
                }

                image.src = data as string
            }

            // FileReader.readAsDataURL()
            // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL
            reader.readAsDataURL(blob)
        })
    }

    handleKeyDown = e => {
        this.setState({ urlInvalid: false })

        if (e.keyCode === 13) e.target.click()
    }

    render() {
        const { children, width, height, ...others } = this.props

        const { urlInvalid } = this.state

        const style = { width, height }

        const content = children || <div className={uploadClass('indicator', urlInvalid && 'url-invalid-indicator')} />

        return (
            <Upload {...others} imageStyle={style} beforeUpload={this.beforeUpload}>
                <div
                    tabIndex={this.props.disabled ? -1 : 0}
                    style={style}
                    onKeyDown={this.handleKeyDown}
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
}

export default Image
