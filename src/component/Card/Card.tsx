import React, { useState } from 'react'
import classnames from 'classnames'
import { dispatchEvent } from '@/utils/dom/element'
import { cardClass } from '@/styles'
import { compose } from '@/utils/func'
import resizable from '@/hoc/resizable'
import moveable from '@/hoc/moveable'
import { Provider, CardContext } from './context'

interface CardInstance {
    el: HTMLDivElement
}

interface CardProps {
    /** 是否显示阴影 */
    shadow?: boolean | 'hover'
    /** 初始折叠状态（仅在 collapsible 为 true 时有效） */
    defaultCollapsed?: boolean
    /** 是否可折叠，'bottom' 表示从下方点击折叠 */
    collapsible?: boolean
    /** 手风琴下控制展开的值 */
    id?: string | number
    /**最外层样式名 */
    className?: string
    /** 是否折叠，用于受控状态 */
    collapsed: boolean
    /** 折叠状态改变时回调事件 */
    onCollapse(e: boolean): void
    /**最外层扩展样式 */
    style: React.CSSProperties
}

const Card = React.memo(
    React.forwardRef<CardInstance, CardProps>(({ collapsible = false, ...props }, ref) => {
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

        const handleSubmit = React.useCallback(target => {
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
            setFormStatus: setFormStatus,
        }

        React.useImperativeHandle(ref, () => ({ el: elRef.current }))

        return (
            <div className={newClasName} ref={elRef} style={props.style}>
                <Provider value={providerValue}>{props.children}</Provider>
            </div>
        )
    })
)

export default compose(moveable(`.${cardClass('header')}`), resizable)(Card)
