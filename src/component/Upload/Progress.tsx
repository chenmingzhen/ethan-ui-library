import { uploadClass } from '@/styles'
import { KeyboardKey } from '@/utils/keyboard'
import classnames from 'classnames'
import React, { isValidElement, useState } from 'react'
import Spin from '../Spin'
import { EthanFile, UploadProgressProps } from './type'
import Upload from './Upload'
import { UPLOADING } from './utils/request'

const Progress: React.FC<UploadProgressProps> = function (props) {
    const { type = 'primary', placeholder, onChange, loading, ...others } = props
    const [progress, updateProgress] = useState(-1)

    const uploading = progress >= 0

    const wrapperClassName = classnames(
        uploadClass('bprogress', others.disabled && 'disabled'),
        uploading ? uploadClass('uploading', `border-${type}`) : uploadClass(`bprogress-${type}`)
    )

    function handleUploadChange(fileList: EthanFile[], file: EthanFile) {
        if (onChange) {
            onChange(fileList, file)
        }

        const { status, process } = file

        if (status !== UPLOADING) {
            updateProgress(-1)

            return
        }

        updateProgress(process)
    }

    function handleUpload(e) {
        if (uploading) e.stopPropagation()
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === KeyboardKey.Enter) (e.target as HTMLElement).click()
    }

    function renderLoadingView(color?: string) {
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

    const style = {
        right: uploading ? `${100 - progress}%` : '100%',
    }

    return (
        <Upload {...others} limit={undefined} onChange={handleUploadChange}>
            <div
                tabIndex={props.disabled ? -1 : 0}
                className={wrapperClassName}
                onClick={handleUpload}
                onKeyDown={handleKeyDown}
            >
                {uploading && (
                    <div style={style} className={uploadClass(`bprogress-${type}`, 'stream')}>
                        {renderLoadingView('#fff')}
                    </div>
                )}
                <span>{uploading ? renderLoadingView() : placeholder}</span>
            </div>
        </Upload>
    )
}

Progress.displayName = 'EthanUploadProgress'

export default React.memo(Progress)
