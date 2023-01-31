import React, { memo, useCallback } from 'react'
import { uploadClass } from '@/styles'
import Progress from '../Progress'
import Image from '../Image'
import { ERROR, REMOVED, UPLOADING } from './utils/request'
import { ImageFileProps } from './type'
import icons from '../icons'

const ImageFile: React.FC<ImageFileProps> = (props) => {
    const { process, status, style, data, message, onRemove, id, file, showRecover, onRecover, renderContent } = props

    const className = uploadClass('image-item', showRecover && 'to-be-delete', {
        removed: status === REMOVED,
        error: status === ERROR,
    })

    const handleRemove = useCallback(() => {
        onRemove(id)
    }, [onRemove, id])

    const handleRecover = useCallback(() => {
        onRecover(id)
    }, [onRecover, id])

    function buildContent() {
        const content = renderContent?.(file)

        if (content) return content

        if (data) return <Image src={data} target="_modal" fit="contain" className={uploadClass('image-bg')} />
    }

    return (
        <div style={style} className={className}>
            {buildContent()}

            {message && <div className={uploadClass('message')}>{message}</div>}

            {showRecover && (
                <a className={uploadClass('recover')} onClick={handleRecover}>
                    {icons.Recovery}
                </a>
            )}

            {status !== REMOVED && !showRecover && <span className={uploadClass('delete')} onClick={handleRemove} />}

            {status === UPLOADING && (
                <div className={uploadClass('progress-bg')}>
                    <Progress
                        className={uploadClass('progress')}
                        color="#f2f2f2"
                        background="rgba(0,0,0,0.5)"
                        value={process}
                        strokeWidth={2}
                    />
                </div>
            )}
        </div>
    )
}

export default memo(ImageFile)
