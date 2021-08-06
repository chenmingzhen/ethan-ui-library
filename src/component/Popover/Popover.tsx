import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { popoverClass } from '@/styles'
import { getParent } from '@/utils/dom/element'
import { getPositionStr } from '@/utils/dom/popover'
import { useFirstMountState, useUpdate } from 'react-use'
import useBindEvent from './hooks/useBindEvents'
import useContainer from './hooks/useContainer'

interface PopoverProps {
    background?: string
    border?: string
    children?: React.ReactNode | ((e: any) => React.ReactNode)
    onClose?(): void
    onOpen?(): void
    position?: string
    style?: React.CSSProperties
    trigger?: 'click' | 'hover'
    type?: string
    visible?: boolean
    onVisibleChange?(visible?: boolean): void
    mouseEnterDelay?: number
    mouseLeaveDelay?: number
    className?: string
    priorityDirection?: 'vertical' | 'horizontal'
    getPopupContainer?(): HTMLElement
    scrollDismiss?: boolean | (() => HTMLElement)
    showArrow?: boolean
    parentClose?(): void
}

const Popover: React.FC<PopoverProps> = props => {
    const {
        background,
        border,
        children,
        onClose,
        onOpen,
        trigger,
        type,
        visible,
        onVisibleChange,
        mouseEnterDelay,
        mouseLeaveDelay,
        className,
        priorityDirection,
        getPopupContainer,
        scrollDismiss,
        showArrow,
        parentClose,
    } = props

    const [show, setShow] = useState(visible)

    const elementRef = useRef<HTMLElement>(document.createElement('div'))

    const placeHolderRef = useRef<HTMLElement>()

    const parentElementRef = useRef<HTMLElement>()

    const delayTimeoutRef = useRef<NodeJS.Timeout>()

    const isMounted = useFirstMountState()

    const update = useUpdate()

    useEffect(() => {
        parentElementRef.current = placeHolderRef.current?.parentElement
    }, [])

    const [container] = useContainer()

    // 占位符Ref

    useBindEvent()

    function clickDocument(e) {
        if (parentElementRef.current.contains(e.target)) return

        if (elementRef.current.contains(e.target)) return

        if (getParent(e.target, `.${popoverClass('_')}`)) return

        // TODO
        handleHide(0)
    }

    function handleShow() {
        if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)

        if (show) return

        document.addEventListener('mousedown', clickDocument)

        setShow(true)
    }

    function handleHide(e) {}

    // -------------------------------------render------------------------------

    if (!isMounted) {
        update()

        // 初次占位 获取到parentElement
        return <noscript ref={placeHolderRef} />
    }

    const colorStyle = { background, borderColor: border }
    const innerStyle = Object.assign({}, props.style, { background })
    const position = getPositionStr(props.position, priorityDirection, parentElementRef.current)

    const { style } = elementRef.current

    const childRender = (children as any)?.() ?? children

    return ReactDOM.createPortal(
        [
            showArrow && <div key="arrow" className={popoverClass('arrow')} style={colorStyle} />,
            <div key="content" className={popoverClass('content')} style={innerStyle}>
                {childRender}
            </div>,
        ],
        elementRef.current
    )
}

Popover.defaultProps = {
    background: '',
    trigger: 'hover',
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0,
    priorityDirection: 'vertical',
    showArrow: true,
}

export default React.memo(Popover)
