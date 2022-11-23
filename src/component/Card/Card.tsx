import React, { useState } from 'react'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import { compose } from '@/utils/func'
import resizable from '@/hoc/resizable'
import moveable from '@/hoc/moveable'
import { Provider } from './context'
import { CardContext, CardProps } from './type'

const Card: React.FC<CardProps> = ({ collapsible = false, forwardedRef, ...props }) => {
    const [collapsed, setCollapsed] = useState<boolean>(props.defaultCollapsed || true)

    const computedCollapsed = React.useMemo(() => {
        if (!collapsible) return undefined

        return props.collapsed ?? collapsed
    }, [collapsed, props.collapsed, collapsible])

    const handleCollapse = React.useCallback(() => {
        if (props.onCollapse) props.onCollapse(!computedCollapsed)
        else setCollapsed(!computedCollapsed)
    }, [computedCollapsed, props.onCollapse])

    const { shadow, className } = props
    const cls = classnames(
        cardClass('_', shadow === true ? 'shadow' : shadow, collapsible && 'collapsible', collapsed && 'collapsed'),
        className
    )

    const providerValue: CardContext = {
        onCollapse: handleCollapse,
        collapsible,
        collapsed: computedCollapsed,
    }

    return (
        <div className={cls} ref={forwardedRef} style={props.style}>
            <Provider value={providerValue}>{props.children}</Provider>
        </div>
    )
}

export default compose(moveable(`.${cardClass('header')}`), resizable)(React.memo(Card))
