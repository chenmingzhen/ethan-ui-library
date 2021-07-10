import React, { cloneElement, isValidElement } from 'react'
import { tooltipClass } from '@/styles'
import { getPosition } from '@/utils/dom/popover'
import { show, hide } from './events'

export interface ToolTipProps {
    /* 弹出是否使用动画，默认为 true  */
    animation?: boolean

    children: React.ReactNode

    className?: string
    /* 使被禁用的元素正常显示提示 */
    disabledChild?: boolean
    /* 弹出层位置 */
    position?: 'left' | 'top' | 'right' | 'bottom'
    /* 最外层扩展样式 */
    style?: React.CSSProperties
    /* 弹出文字 */
    tip: string
    /* 弹出方式 */
    trigger?: 'hover' | 'click'
    /* 延迟显示 */
    delay?: number
}

const Tooltip: React.FC<ToolTipProps> = props => {
    const { children, disabledChild, position = 'top', tip, trigger = 'hover', delay = 0 } = props

    const nSRef = React.useRef<HTMLElement>()

    const showTimeoutRef = React.useRef<NodeJS.Timeout>()

    function getPos() {
        const el = nSRef.current?.nextSibling

        if (!el) return {}

        return getPosition(position, el)
    }

    function showSync() {
        const pos = getPos()

        const newStyle = Object.keys(pos).reduce((data, key) => {
            data[key] = pos[key]
            return data
        }, {})

        const newProps = Object.assign({}, props, { style: newStyle })

        show(newProps, props.style)
    }

    function handleShow() {
        if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)

        if (delay) {
            showTimeoutRef.current = setTimeout(() => {
                showSync()
            }, delay)
        } else {
            showSync()
        }
    }

    if (!isValidElement(children)) {
        console.error(new Error('Tooltip children expect a single ReactElement.'))

        return null
    }

    if (!tip) {
        console.warn('Tooltip must have a text prompt,please check your props "tip"!')

        return children
    }

    // pointerEvents: 'none' 禁止触发事件
    const inner = disabledChild ? (
        <span className={tooltipClass('disabled-wrapper')} style={{ cursor: 'not-allowed' }}>
            {cloneElement(children, { style: { ...children.props.style, pointerEvents: 'none' } })}
        </span>
    ) : (
        children
    )

    const innerProps: any = { key: 'el' }

    if (trigger === 'hover') {
        innerProps.onMouseEnter = handleShow
        innerProps.onMouseLeave = hide
    } else {
        // eslint-disable-next-line @typescript-eslint/space-before-function-paren
        innerProps.onClick = function(e: React.MouseEvent) {
            if (e) e.stopPropagation()

            setTimeout(handleShow, 10)

            if (children.props.onClick) children.props.onClick()
        }
    }
    return (
        <>
            <noscript ref={nSRef} key="ns" />

            {cloneElement(inner, innerProps)}
        </>
    )
}

export default React.memo(Tooltip)
