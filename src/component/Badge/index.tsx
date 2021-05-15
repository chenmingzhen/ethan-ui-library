// @ts-nocheck
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { badgeClass } from '@/styles'

const Badge = props => {
    const { style, children, dot, color, count, maxCount, onClick } = props

    const subStyle = useMemo(() => (color ? { backgroundColor: color } : {}), [color])

    const ComputedCount = useMemo(() => (maxCount > count ? `${maxCount}+` : count), [count, maxCount])

    const handleClick = e => {
        onClick && onClick(e)
    }
    return (
        <span className={badgeClass('_')} style={style}>
            {children}
            {dot ? (
                <sub className={badgeClass('dot')} style={subStyle} />
            ) : (
                <sub className={badgeClass('count')} onClick={handleClick} style={subStyle}>
                    {ComputedCount}
                </sub>
            )}
        </span>
    )
}

Badge.propTypes = {
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dot: PropTypes.bool,
    color: PropTypes.string,
    maxCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Badge.displayName = 'EthanBadge'

export default memo(Badge)
