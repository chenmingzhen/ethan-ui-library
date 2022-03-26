import React, { memo, useCallback } from 'react'
import { uploadClass } from '@/styles'
import Progress from '../Progress'
import icons from '../icons'
import { ERROR, UPLOADING, REMOVED } from './utils/request'
import { FileProps } from './type'
import Spin from '../Spin'

const File: React.FC<FileProps> = props => {
    const { id, message, name, onRemove, process, status, showRecover, onRecover, renderContent, file } = props

    const handleRemove = useCallback(() => {
        onRemove(id)
    }, [onRemove, id])

    const handleRecover = useCallback(() => {
        onRecover(id)
    }, [id, onRecover])

    const className = uploadClass('view-file', showRecover && 'to-be-delete', {
        removed: status === REMOVED,
        error: status === ERROR,
    })

    const content = renderContent?.(file) || name

    return (
        <div className={className}>
            <div className={uploadClass('text')}>
                {status === UPLOADING && (
                    <span style={{ display: 'inline-block', marginRight: 8 }}>
                        <Spin size={10} name="ring" />
                    </span>
                )}
                {content}
                {message && <span>({message}) </span>}
            </div>

            {status !== REMOVED && !showRecover && (
                <a className={uploadClass('delete')} onClick={handleRemove}>
                    {icons.Close}
                </a>
            )}

            {status === UPLOADING && (
                <Progress
                    className={uploadClass('progress')}
                    background={process >= 0 ? '#e9ecef' : 'transparent'}
                    value={process}
                    strokeWidth={2}
                />
            )}

            {showRecover && (
                <a className={uploadClass('recover')} onClick={handleRecover}>
                    {icons.Recovery}
                </a>
            )}
        </div>
    )
}

export default memo(File)
