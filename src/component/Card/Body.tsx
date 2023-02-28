import React from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import { context } from './context'
import { CardBodyProps } from './type'
import AnimationList from '../List'

const Body: React.FC<CardBodyProps> = ({ className, ...props }) => {
    const { collapsible, collapsed, onCollapse } = React.useContext(context)

    if (!collapsible) return <div {...props} className={classnames(cardClass('body'), className)} />

    const onClick = typeof collapsed === 'boolean' ? onCollapse : undefined

    return (
        <AnimationList show={!collapsed} duration={240} animationTypes={['collapse', 'fade']}>
            <div {...props} className={classnames(cardClass('body'), className)}>
                {props.children}
                {collapsible === 'bottom' && (
                    <div className={cardClass('foldup')} onClick={onClick}>
                        <span />
                    </div>
                )}
            </div>
        </AnimationList>
    )
}

export default React.memo(Body)
