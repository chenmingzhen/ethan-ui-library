import React, { memo, useMemo } from 'react'
import { badgeClass } from '@/styles'

export interface BadgeProps {
    style?: React.CSSProperties

    children?: React.ReactNode

    dot?: boolean

    color?: string

    count?: number

    maxCount?: number

    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Badge: React.FC<BadgeProps> = props => {
    const { style, children, dot, color, count, maxCount, onClick } = props

    const subStyle = useMemo(() => (color ? { backgroundColor: color } : {}), [color])

    const ComputedCount = useMemo(() => (maxCount > count ? `${maxCount}+` : count), [count, maxCount])

    return (
        <span className={badgeClass('_')} style={style}>
            {children}
            {dot ? (
                <sub className={badgeClass('dot')} style={subStyle} />
            ) : (
                <sub className={badgeClass('count')} onClick={onClick} style={subStyle}>
                    {ComputedCount}
                </sub>
            )}
        </span>
    )
}

Badge.displayName = 'EthanBadge'

export default memo(Badge)
