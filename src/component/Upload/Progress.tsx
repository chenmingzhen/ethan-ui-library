import React, { isValidElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { uploadClass } from '@/styles'
import Spin from '../Spin'
import Upload from './Upload'
import { EthanFile, UploadProgressProps, UploadProgressState } from './type'
import { UPLOADING } from './utils/request'

/** 上传按钮 */
class Progress extends PureComponent<UploadProgressProps, UploadProgressState> {
    static defaultProps = {
        type: 'primary',
    }

    static displayName = 'EthanButtonUpload'

    constructor(props) {
        super(props)

        this.state = {
            progress: -1,
        }
    }

    handleUpload = (e) => {
        const uploading = this.state.progress >= 0

        if (uploading) e.stopPropagation()
    }

    handleUploadChange = (fileList: EthanFile[], file: EthanFile) => {
        const { onChange } = this.props

        if (onChange) {
            onChange(fileList, file)
        }

        const { status, process } = file

        if (status !== UPLOADING) {
            this.setState({ progress: -1 })

            return
        }

        this.setState({ progress: process })
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) e.target.click()
    }

    renderLoadingView = (color?: string) => {
        const { placeholder, loading } = this.props

        return isValidElement(loading) ? (
            <span>{loading}</span>
        ) : (
            <span>
                <span style={{ display: 'inline-block', marginRight: 8 }}>
                    <Spin size={10} name="ring" color={color} />
                </span>
                {typeof loading === 'string' ? loading : placeholder}
            </span>
        )
    }

    render() {
        const { placeholder, type, ...others } = this.props

        const uploading = this.state.progress >= 0

        const wrapperClassName = classnames(
            uploadClass('bprogress', others.disabled && 'disabled'),
            uploading ? uploadClass('uploading', `border-${type}`) : uploadClass(`bprogress-${type}`)
        )

        const style = {
            right: uploading ? `${100 - this.state.progress}%` : '100%',
        }
        return (
            <Upload {...others} limit={undefined} showUploadList={false} onChange={this.handleUploadChange}>
                <div
                    tabIndex={this.props.disabled ? -1 : 0}
                    className={wrapperClassName}
                    onClick={this.handleUpload}
                    onKeyDown={this.handleKeyDown}
                >
                    {uploading && (
                        <div style={style} className={uploadClass(`bprogress-${type}`, 'stream')}>
                            {this.renderLoadingView('#fff')}
                        </div>
                    )}
                    <span>{uploading ? this.renderLoadingView() : placeholder}</span>
                </div>
            </Upload>
        )
    }
}

export default Progress
