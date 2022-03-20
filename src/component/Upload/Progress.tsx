import React, { isValidElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { uploadClass } from '@/styles'
import Spin from '../Spin'
import Upload from './Upload'
import { UploadProgressProps, UploadProgressState } from './type'

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

    handleChange = (p: number) => {
        this.setState({
            progress: p,
        })
    }

    handleProgress = file => {
        this.handleChange(file.process)
    }

    handleError = (xhr, file) => {
        const { onError } = this.props

        if (onError) onError(xhr, file)

        this.handleChange(-1)
    }

    handleSuccess = (value: any, file: File, data: string, xhr: XMLHttpRequest) => {
        const { onSuccess } = this.props

        if (onSuccess) onSuccess(value, file, data, xhr)

        this.handleChange(-1)

        return file
    }

    handleUpload = e => {
        const uploading = this.state.progress >= 0

        if (uploading) e.stopPropagation()
    }

    handleKeyDown = e => {
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
            <Upload
                {...others}
                limit={undefined}
                onProgress={this.handleProgress}
                onStart={this.handleChange.bind(this, 1)}
                showUploadList={false}
                onError={this.handleError}
                onSuccess={this.handleSuccess}
            >
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
