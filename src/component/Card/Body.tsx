import React from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import { context } from './context'
import CollapseList from '../List/AnimationHeight'
import { CardBodyProps } from './type'

const Body: React.FC<CardBodyProps> = ({ className, ...props }) => {
    const { collapsible, collapsed, onCollapse } = React.useContext(context)

    if (!collapsible) return <div {...props} className={classnames(cardClass('body'), className)} />

    const onClick = typeof collapsed === 'boolean' ? onCollapse : undefined

    return (
        <CollapseList show={!collapsed} height={!collapsed ? 'auto' : 0} duration={240}>
            <div {...props} className={classnames(cardClass('body'), className)}>
                {props.children}
                {collapsible === 'bottom' && (
                    <div className={cardClass('foldup')} onClick={onClick}>
                        <span />
                    </div>
                )}
            </div>
        </CollapseList>
    )
}

export default React.memo(Body)
