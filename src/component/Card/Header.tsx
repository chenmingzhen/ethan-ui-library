import React from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import icons from '../icons'

export interface CardHeaderProps {
    align: string

    className: string

    // 是否折叠
    collapsed: boolean

    // 折叠回调
    onCollapse(e: React.MouseEvent<HTMLElement>): void

    style: React.CSSProperties
}

const Header: React.FC<CardHeaderProps> = ({ align, className, collapsed, onCollapse, style, children }) => {
    const newClassName = classnames(cardClass('header', align), className)
    const onClick = typeof collapsed === 'boolean' ? onCollapse : null

    return (
        <div style={style} onClick={onClick} className={newClassName}>
            {collapsed ? <span className={cardClass('indicator')}>{icons.AngleRight}</span> : null}
            {children}
        </div>
    )
}

export default React.memo(Header)
