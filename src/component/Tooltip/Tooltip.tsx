import React, { cloneElement, isValidElement, ReactElement, useEffect, useMemo } from 'react'
import { tooltipClass } from '@/styles'
import { getPosition, getPositionStr } from '@/utils/dom/popover'
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
    /** 弹出位置优先级 */
    priorityDirection?: 'vertical' | 'horizontal'
    /* 最外层扩展样式 */
    style?: React.CSSProperties
    /* 弹出内容 */
    tip: React.ReactNode
    /* 弹出方式 */
    trigger?: 'hover' | 'click'
    /* 延迟显示 */
    delay?: number
    /* 受控是否可见 */
    visible?: boolean
}

const Tooltip: React.FC<ToolTipProps> = props => {
    const { children, disabledChild, position, tip, trigger = 'hover', delay = 0, priorityDirection, visible } = props

    const nSRef = React.useRef<HTMLElement>()

    const showTimeoutRef = React.useRef<NodeJS.Timeout>()

    function getPos() {
        const el = nSRef.current?.nextSibling

        if (!el) return [position ?? 'top', {}]

        const newPosition = position ?? getPositionStr(position, priorityDirection, nSRef.current.parentElement)

        const formatPosition = newPosition.split('-')?.[0]

        return [formatPosition, getPosition(newPosition, el)]
    }

    function showSync() {
        const [formatPosition, pos] = getPos()

        const newProps = Object.assign({}, props, { style: pos, position: formatPosition })

        show(newProps)
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

    function handleHide() {
        hide()
    }

    if (!isValidElement(children)) {
        console.error(new Error('Tooltip children expect a single ReactElement.'))

        return null
    }

    if (!tip) {
        console.warn('Tooltip must have something,please check your props "tip"!')

        return children
    }

    function onClick(e: React.MouseEvent) {
        e?.stopPropagation()

        setTimeout(handleShow, 10)
        ;(children as ReactElement)?.props?.onClick()
    }

    // pointerEvents: 'none' 禁止触发事件
    const inner = disabledChild ? (
        <span className={tooltipClass('disabled-wrapper')} style={{ cursor: 'not-allowed' }}>
            {cloneElement(children, { style: { ...children.props.style, pointerEvents: 'none' } })}
        </span>
    ) : (
        children
    )

    const innerProps = useMemo(() => {
        const computed: any = { key: 'el' }

        if (typeof visible === 'boolean') return computed

        if (trigger === 'hover') {
            computed.onMouseEnter = handleShow
            computed.onMouseLeave = handleHide
        } else {
            computed.onClick = onClick
        }

        return computed
    }, [props])

    useEffect(() => {
        if (visible) {
            handleShow()

            return () => {
                hide()
            }
        }
    }, [visible])

    return (
        <>
            <noscript ref={nSRef} key="ns" />

            {cloneElement(inner, innerProps)}
        </>
    )
}

export default React.memo(Tooltip)
