import React, { useRef, useEffect } from 'react'
import { getParent } from '@/utils/dom/element'
import { docSize } from '@/utils/dom/document'
import { throttleWrapper } from '@/utils/func'
import useRefMethod from '@/hooks/useRefMethod'
import useSetState from '@/hooks/useSetState'
import { styles } from '@/utils/style/styles'

const events = ['scroll', 'resize', 'pageshow', 'load']

export interface StickyProps {
    top?: number
    bottom?: number
    children: React.ReactNode
    target?: string | HTMLElement
    className?: string
    style?: React.CSSProperties
}

enum Position {
    top = 'top',
    bottom = 'bottom',
    none = '',
}

interface StickyState {
    position: Position
    placeholder: React.CSSProperties
    style: React.CSSProperties
    scrollWidth: number
}

const Sticky: React.FC<StickyProps> = (props) => {
    const { top, bottom, children, className, target, style: propStyle = {} } = props
    const elementRef = useRef<HTMLDivElement>(null)
    /** 记录原始顶层div的宽度 因后面会对element的position进行操作，脱离文档流，当resize浏览器时，element无法获取最新的顶层容器宽度 */
    const originRef = useRef<HTMLDivElement>(null)
    /** 当element悬浮时 占住原本element的位置 */
    const placeholderRef = useRef<HTMLDivElement>(null)
    const [state, setState] = useSetState<StickyState>({
        position: Position.none,
        placeholder: null,
        style: {},
        scrollWidth: 0,
    })
    const { position, placeholder, style, scrollWidth } = state

    useEffect(() => {
        const targetElement = getParent(elementRef.current, target) as HTMLDivElement
        handlePositionChange(targetElement)

        if (targetElement) {
            targetElement.addEventListener('scroll', handlePositionChange, { passive: true })
        } else {
            events.forEach((e) => {
                window.addEventListener(e, handlePositionChange)
            })
        }

        return () => {
            if (targetElement) {
                targetElement.removeEventListener('scroll', handlePositionChange)
            } else {
                events.forEach((e) => {
                    window.removeEventListener(e, handlePositionChange)
                })
            }
        }
    }, [target])

    const handlePositionChange = useRefMethod(
        throttleWrapper(() => {
            const targetElement = getParent(elementRef.current, target) as HTMLDivElement
            const selfRect = elementRef.current.getBoundingClientRect().toJSON()
            const scrollElement = targetElement || document.body
            const scrollRect = scrollElement.getBoundingClientRect()
            const placeholderRect = placeholderRef.current
                ? placeholderRef.current.getBoundingClientRect().toJSON()
                : null
            const viewHeight = docSize.height

            if (originRef.current) {
                const { width } = originRef.current.getBoundingClientRect()
                selfRect.width = width
                if (placeholderRect) placeholderRect.width = width
            }

            const placeholderStyle = {
                width: selfRect.width,
                height: target ? 0 : selfRect.height,
            }

            let newStyle: React.CSSProperties
            let newPlaceholder: React.CSSProperties
            let limitTop = top
            let limitBottom = viewHeight - bottom

            if (targetElement) {
                limitTop += scrollRect.top
                limitBottom = scrollRect.bottom - bottom
            }

            if (top !== undefined && position !== Position.bottom) {
                if (selfRect.top < limitTop) {
                    /** 元素的Top到达限制的Top */

                    setState({ scrollWidth: scrollRect.width, position: Position.top })
                    newStyle = getStyle(Position.top, top, selfRect.left, selfRect.width)
                    newPlaceholder = placeholderStyle
                } else if (placeholderRect && selfRect.top < placeholderRect.top) {
                    /** 处于漂浮状态 */

                    if (!target || selfRect.top !== limitTop) {
                        setState({ position: Position.none })
                        newStyle = {}
                        newPlaceholder = null
                    }
                } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
                    /** 处理页面resize的情况 */
                    setState({
                        scrollWidth: scrollRect.width,
                        position: Position.top,
                    })
                    newStyle = getStyle(Position.top, top, placeholderRect.left, placeholderRect.width)
                    newPlaceholder = placeholderStyle
                }
            }

            if (bottom !== undefined && position !== Position.top) {
                if (selfRect.bottom > limitBottom) {
                    setState({
                        scrollWidth: scrollRect.width,
                        position: Position.bottom,
                    })
                    newStyle = getStyle(Position.bottom, bottom, selfRect.left, selfRect.width)
                    newPlaceholder = placeholderStyle
                } else if (
                    placeholderRect &&
                    (targetElement ? scrollRect.bottom : selfRect.bottom) > placeholderRect.bottom
                ) {
                    setState({
                        position: Position.none,
                    })
                    newStyle = {}
                    newPlaceholder = null
                } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
                    setState({ scrollWidth: scrollRect.width, position: Position.bottom })
                    newStyle = getStyle(Position.bottom, bottom, placeholderRect.left, placeholderRect.width)
                    newPlaceholder = placeholderStyle
                }
            }

            if (newPlaceholder !== undefined) {
                setState({ placeholder: newPlaceholder })
            }

            if (newStyle) {
                setState({ style: newStyle })
            }
        }, 5)
    )

    const getStyle = (mode: Position, offset: number, left: number, width: number) => {
        const { zIndex = 900 } = propStyle

        return styles({
            position: getParent(elementRef.current, target) ? 'sticky' : 'fixed',
            left,
            width,
            [mode]: offset,
            zIndex,
        })
    }

    let outerStyle = propStyle
    let innerStyle = style

    if (target) {
        outerStyle = Object.assign({}, outerStyle, innerStyle)
        innerStyle = {}
    }

    return (
        <div style={outerStyle} className={className}>
            <div ref={elementRef} style={innerStyle}>
                {children}
            </div>
            <div ref={originRef} />
            {placeholder && <div ref={placeholderRef} style={placeholder} />}
        </div>
    )
}

export default Sticky
