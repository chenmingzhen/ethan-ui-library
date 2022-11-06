import React, { useState } from 'react'
import classnames from 'classnames'
import { dispatchEvent } from '@/utils/dom/element'
import { cardClass } from '@/styles'
import { compose } from '@/utils/func'
import resizable from '@/hoc/resizable'
import moveable from '@/hoc/moveable'
import { Provider } from './context'
import { CardContext, CardProps } from './type'

const Card: React.FC<CardProps> = ({ collapsible = false, forwardedRef, ...props }) => {
    const [collapsed, setCollapsed] = useState<boolean>(props.defaultCollapsed || true)
    const [formStatus, setStatus] = useState<string>('')
    const elRef = React.useRef<HTMLDivElement>()

    // 判断是否为折叠状态
    const computedCollapsed = React.useMemo(() => {
        if (!collapsible) return undefined

        // es2020特性
        return props.collapsed ?? collapsed
    }, [collapsed, props.collapsed, collapsible])

    const setFormStatus = React.useCallback(
        (status: string) => {
            if (status !== formStatus) setStatus(status)
        },
        [formStatus]
    )

    const handleCollapse = React.useCallback(() => {
        if (props.onCollapse) props.onCollapse(!computedCollapsed)
        else setCollapsed(!computedCollapsed)
    }, [computedCollapsed, props.onCollapse])

    const handleSubmit = React.useCallback((target) => {
        const form = elRef.current.querySelector('form')

        if (form) dispatchEvent(form, 'submit', target)
        else console.error(new Error('No form found.'))
    }, [])

    const { shadow, className } = props
    const newShadow = shadow === true ? 'shadow' : shadow
    const newClasName = classnames(
        cardClass('_', newShadow, collapsible && 'collapsible', collapsed && 'collapsed'),
        className
    )

    const providerValue: CardContext = {
        onCollapse: handleCollapse,
        collapsible,
        collapsed: computedCollapsed,
        formStatus,
        onSubmit: handleSubmit,
        setFormStatus,
    }

    return (
        <div className={newClasName} ref={forwardedRef} style={props.style}>
            <Provider value={providerValue}>{props.children}</Provider>
        </div>
    )
}

export default compose(moveable(`.${cardClass('header')}`), resizable)(React.memo(Card))
