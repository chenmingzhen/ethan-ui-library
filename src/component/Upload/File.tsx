import React, { memo, useCallback } from 'react'
import { uploadClass } from '@/styles'
import Progress from '../Progress'
import icons from '../icons'
import { ERROR, UPLOADING } from './utils/request'
import { FileProps } from './type'
import Spin from '../Spin'

const File: React.FC<FileProps> = props => {
    const { id, message, name, onRemove, process, status, showRecover, onRecover } = props

    const handleRemove = useCallback(() => {
        onRemove(id)
    }, [onRemove, id])

    const handleRecover = () => {
        onRecover(index, value)
    }

    const className = uploadClass('view-file', status === ERROR && 'error')

    return (
        <div className={className}>
            <div className={uploadClass('text')}>
                {status === UPLOADING && (
                    <span style={{ display: 'inline-block', marginRight: 8 }}>
                        <Spin size={10} name="ring" />
                    </span>
                )}
                {name}
                {message && <span>({message}) </span>}
            </div>

            <a className={uploadClass('delete')} onClick={handleRemove}>
                {icons.Close}
            </a>

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
