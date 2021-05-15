// @ts-nocheck
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '@/styles'
import icons from '../icons'
import Image from '../Image'

const ImageResult = props => {
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
    const url = renderResult(value)

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

            {onRemove && <span className={uploadClass('delete')} onClick={handleRemove} />}
        </div>
    )
}

ImageResult.propTypes = {
    index: PropTypes.number,
    onRemove: PropTypes.func,
    onRecover: PropTypes.func,
    recoverAble: PropTypes.bool,
    renderResult: PropTypes.func,
    showRecover: PropTypes.bool,
    style: PropTypes.object,
    value: PropTypes.any,
    renderContent: PropTypes.func,
    values: PropTypes.array,
}

ImageResult.defaultProps = {
    renderResult: a => a,
}

export default memo(ImageResult)
