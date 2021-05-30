import React, { useContext } from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import icons from '../icons'
import { context } from './context'

export interface CardHeaderProps {
    align: string

    className: string

    style: React.CSSProperties
}

const Header: React.FC<CardHeaderProps> = ({ align, className, style, children }) => {
    const { collapsed, onCollapse } = useContext(context)

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
