import React from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import { context } from './context'
import { CardBodyProps } from './type'
import Motion from '../Motion'

const Body: React.FC<CardBodyProps> = ({ className, ...props }) => {
    const { collapsible, collapsed, onCollapse } = React.useContext(context)

    if (!collapsible) return <div {...props} className={classnames(cardClass('body'), className)} />

    const onClick = typeof collapsed === 'boolean' ? onCollapse : undefined

    return (
        <Motion.Transition visible={!collapsed} duration="fast" transitionTypes={['collapse', 'fade']}>
            <div {...props} className={classnames(cardClass('body'), className)}>
                {props.children}
                {collapsible === 'bottom' && (
                    <div className={cardClass('foldup')} onClick={onClick}>
                        <span />
                    </div>
                )}
            </div>
        </Motion.Transition>
    )
}

export default React.memo(Body)
