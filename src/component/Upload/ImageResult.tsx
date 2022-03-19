import React, { memo } from 'react'
import { uploadClass } from '@/styles'
import icons from '../icons'
import Image from '../Image'
import { ResultProps } from './type'

const ImageResult: React.FC<ResultProps> = props => {
    const {
        value,
        renderResult,
        recoverAble,
        renderContent,
        style,
        showRecover,
        index,
        values,
        onRecover,
        onRemove,
    } = props

    const handleRemove = () => {
        onRemove(index)
    }

    const handleRecover = () => {
        onRecover(index, value)
    }

    const className = uploadClass('image-item', 'image-result', recoverAble && 'to-be-delete')

    const url = renderResult(value) as string

    return (
        <div style={style} className={className}>
            {url &&
                (renderContent ? (
                    renderContent(url, value, index, values)
                ) : (
                    <Image
                        src={url}
                        href={url}
                        fit="center"
                        width="auto"
                        height={0}
                        className={uploadClass('image-bg')}
                    />
                ))}

            {showRecover && (
                <a className={uploadClass('recover')} onClick={handleRecover}>
                    {icons.Recovery}
                </a>
            )}

            <span className={uploadClass('delete')} onClick={handleRemove} />
        </div>
    )
}

export default memo(ImageResult)
