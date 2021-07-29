import React, { useRef, useState, useMemo } from 'react'
import classnames from 'classnames'
import { getUidStr } from '@/utils/uid'
import ReactDOM from 'react-dom'
import AnimationHandler from './AnimationHandler'

interface PoptipProps {
    placement?: string

    title?: React.ReactNode

    content?: React.ReactNode

    confirm?: boolean

    dark?: boolean

    color?: string

    width?: number

    okText?: string

    cancelText?: string

    onVisibleChange: (e: boolean) => void

    trigger?: 'click' | 'hover'

    visible?: boolean

    children: React.ReactElement
}

const Poptip: React.FC<PoptipProps> = props => {
    const preCls = 'poptip'

    const dataId = useMemo(getUidStr, [])

    const [opened, setOpened] = useState(!!props.visible)

    const timeRef = useRef<NodeJS.Timeout>()

    const isMouseInHandler = useRef(false)

    const contentRef = useRef<HTMLElement>()

    const { children, title, content, onVisibleChange, trigger = 'click', placement, color, width } = props

    function onHandlerEnter() {
        isMouseInHandler.current = true

        timeRef.current && clearTimeout(timeRef.current)
    }

    function onHandlerMouseLeave() {
        if (trigger === 'hover') {
            timeRef.current && clearTimeout(timeRef.current)

            timeRef.current = setTimeout(() => {
                toggle(false)
            }, 150)
        }

        isMouseInHandler.current = false
    }

    function onHandlerTipClose(e) {
        const contentEl = ReactDOM.findDOMNode(contentRef.current)
        const isClickContent = contentEl?.contains(e.target)

        if (!isMouseInHandler.current && !isClickContent) {
            toggle(false)
        }
    }

    function onContentClick() {
        if (trigger === 'click' && !opened) {
            toggle(true)
        }
    }

    function onContentMouseLeave() {
        if (trigger === 'hover' && opened) {
            timeRef.current && clearTimeout(timeRef.current)

            timeRef.current = setTimeout(() => {
                toggle(false)
            }, 150)
        }
    }

    function onContentEnter() {
        timeRef.current && clearTimeout(timeRef.current)

        if (trigger === 'hover' && !opened) {
            toggle(true)
        }
    }

    function toggle(isShow) {
        setOpened(isShow)

        onVisibleChange?.(isShow)
    }

    function buildPoptip() {
        const titleNode = title ? (
            <div key="title" className={`k-${preCls}-title`}>
                {title}
            </div>
        ) : (
            ''
        )
        const contentNode = content ? (
            <div key="content" className={`k-${preCls}-inner-content`}>
                {content}
            </div>
        ) : null

        const childNode = [
            <div className={`k-${preCls}-arrow`} key="arrow">
                <div
                    className={`k-${preCls}-arrow-content`}
                    style={{ backgroundColor: /^#/.test(color) ? color : null }}
                />
            </div>,
            <div
                className={`k-${preCls}-inner`}
                key="inner"
                style={{ backgroundColor: /^#/.test(color) ? color : null }}
            >
                {[titleNode, contentNode]}
            </div>,
        ]

        const handlerProps = {
            contentRef,
            show: opened,
            className: classnames([`k-${preCls}-content`, { [`k-${preCls}-${color}`]: color && !/^#/.test(color) }]),
            width,
            placement,
            color,
            trigger,
            onMouseEnter: onHandlerEnter,
            onMouseLeave: onHandlerMouseLeave,
            onClose: onHandlerTipClose,
        }

        return (
            <AnimationHandler {...handlerProps} key="AnimationHandler">
                {childNode}
            </AnimationHandler>
        )
    }

    const poptip = buildPoptip()

    const contentProps = {
        ref: contentRef,
        onMouseEnter: onContentEnter,
        onMouseLeave: onContentMouseLeave,
        onClick: onContentClick,
        'data-id': dataId,
        ...children.props,
    }

    return React.cloneElement(children, contentProps, [children.props.children, poptip])
}

export default React.memo(Poptip)
