import React from 'react'
import classnames from 'classnames'
import { progressClass } from '@/styles'
import analyzeColor from './analyzeColor'
import { ProgressProps } from './type'
import Popup from './Popup'

const Line: React.FC<ProgressProps> = (props) => {
    const { children, strokeWidth, type, value, color, style, background, popup } = props

    const hasChildren = children !== undefined

    const className = classnames(progressClass('line', type, hasChildren && popup && 'line-popup'), props.className)

    const innerStyle: React.CSSProperties = {
        width: `${value}%`,
        borderRadius: strokeWidth / 2,
    }

    if (typeof color === 'string') {
        innerStyle.background = color
        innerStyle.backgroundSize = '1em 1em'
    } else if (typeof color === 'object') {
        innerStyle.background = `linear-gradient(to right,${analyzeColor(color).reduce(
            (accumulatedValue, currentValue) => {
                const col = `${currentValue.color} ${currentValue.pos}`

                return accumulatedValue ? `${accumulatedValue},${col}` : col
            },
            ''
        )})`
    }

    return (
        <div className={className} style={style}>
            <div
                className={progressClass('background')}
                style={{ height: strokeWidth, background, borderRadius: strokeWidth / 2 }}
            >
                <div className={progressClass('front')} style={innerStyle} />
            </div>

            {hasChildren &&
                (popup ? (
                    <Popup value={value}>{children}</Popup>
                ) : (
                    <div className={progressClass('content')}>{children}</div>
                ))}
        </div>
    )
}

Line.defaultProps = {
    strokeWidth: 8,
}

export default React.memo(Line)
