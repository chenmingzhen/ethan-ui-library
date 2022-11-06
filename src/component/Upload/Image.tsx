import React, { PureComponent } from 'react'
import immer from 'immer'
import { uploadClass } from '@/styles'
import { getLocale } from '@/locale'
import Upload from './Upload'
import { ERROR, PENDING } from './utils/request'
import { BeforeUploadFileType, EthanFile, UploadImageProps, UploadImageState } from './type'

class Image extends PureComponent<UploadImageProps, UploadImageState> {
    timer: NodeJS.Timeout

    static defaultProps: UploadImageProps = {
        accept: 'image/*',
        height: 80,
        validator: {},
        width: 80,
    }

    static displayName = 'EthanImageUpload'

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

    beforeUpload = async (blob: File): Promise<EthanFile> => {
        const { beforeUpload } = this.props

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
            const { imageSize } = this.props.validator

            const file: EthanFile = { status: PENDING }

            let transformProps: EthanFile = {}

            /** 处理过后的文件 */
            if (transformedFile !== false && !(transformedFile instanceof File)) {
                transformProps = { ...transformedFile }
            }

            /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader */
            const reader = new FileReader()

            reader.onload = (e) => {
                const data = e.target.result as string

                file.data = data

                const image = new window.Image()

                image.onerror = () => {
                    this.setState(
                        immer((draft) => {
                            draft.urlInvalid = true
                        })
                    )

                    reject()
                }

                /** Props的beforeUpload的result覆盖掉内部处理的result */
                image.onload = () => {
                    if (!imageSize) {
                        const processFile = Object.assign({}, file, transformProps)

                        resolve(processFile)

                        return
                    }

                    const res = imageSize(image)

                    if (res instanceof Error) {
                        file.status = ERROR

                        file.message = res.message
                    }

                    const processFile = Object.assign({}, file, transformProps)

                    resolve(processFile)
                }

                image.src = data
            }

            /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL */
            reader.readAsDataURL(blob)
        })
    }

    handleKeyDown = (e) => {
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
