import React from 'react'
import { PureComponent } from '@/utils/component'
import { getParent } from '@/utils/dom/element'
import { eventPassive } from '@/utils/dom/detect'
import { cssSupport } from '@/utils/dom/element'
import { docSize } from '@/utils/dom/document'
import { throttleWrapper } from '@/utils/lazyload'

const events = ['scroll', 'resize', 'pageshow', 'load']

const supportSticky = cssSupport('position', 'sticky')

export interface StickyProps {
    top?: number

    bottom?: number

    children: React.ReactNode

    target?: string | HTMLElement

    className?: string

    style?: React.CSSProperties
}

interface StickyState {
    mode?: 'top' | 'bottom' | ''

    /** 占位符 */
    placeholder?: React.CSSProperties

    style?: React.CSSProperties

    scrollWidth?: number
}

/** 因存在指定目标target的需求 所以需要占位符与fixed position */
class Sticky extends PureComponent<StickyProps, StickyState> {
    static defaultProps = {
        style: {},
    }

    element = React.createRef<HTMLDivElement>()

    /** 记录原始顶层div的宽度 因后面会对element的position进行操作，脱离文档流，当resize浏览器时，element无法获取最新的顶层容器宽度 */
    origin = React.createRef<HTMLDivElement>()

    /** 当element悬浮时 占住原本element的位置 */
    placeholder = React.createRef<HTMLDivElement>()

    targetElement: HTMLDivElement

    handlePosition

    constructor(props) {
        super(props)

        this.state = {
            placeholder: null,

            style: {},

            mode: '',

            scrollWidth: 0,
        }

        this.handlePosition = throttleWrapper(this.setPosition, 17)
    }

    componentDidMount = () => {
        super.componentDidMount()

        const { target } = this.props

        this.targetElement = getParent(this.element.current, target)

        this.handlePosition()

        this.bindScroll()
    }

    render = () => {
        const { children, className, target } = this.props

        // 占位 使漂浮的元素位置不因滚动被占
        const { placeholder } = this.state

        let outerStyle = this.props.style

        let innerStyle = this.state.style

        if (target && supportSticky) {
            outerStyle = Object.assign({}, outerStyle, innerStyle)
            innerStyle = {}
        }

        return (
            <div style={outerStyle} className={className}>
                <div ref={this.element} style={innerStyle}>
                    {children}
                </div>

                <div ref={this.origin} />

                {placeholder && <div ref={this.placeholder} style={placeholder} />}
            </div>
        )
    }

    componentWillUnmount = () => {
        super.componentWillUnmount()

        this.unbindScroll()
    }

    setPosition = () => {
        const { bottom, top, target } = this.props

        const { mode, scrollWidth } = this.state

        /** children自身的位置信息 */
        const selfRect = this.element.current.getBoundingClientRect().toJSON()

        /** 如果有设置父容器 获取父容器元素 */
        const scrollElement = this.targetElement || document.body

        /** 父容器元素的位置信息 */

        const scrollRect = scrollElement.getBoundingClientRect()

        /** placeholder的位置信息 */
        const placeholderRect = this.placeholder.current
            ? this.placeholder.current.getBoundingClientRect().toJSON()
            : null

        /** 视口高度 */
        const viewHeight = docSize.height

        if (this.origin.current) {
            const { width } = this.origin.current.getBoundingClientRect()

            selfRect.width = width

            if (placeholderRect) placeholderRect.width = width
        }

        /** 占位元素的style */
        const placeholderStyle = {
            width: selfRect.width,
            height: target && supportSticky ? 0 : selfRect.height,
        }

        let style

        let placeholder

        /** sticky的Top */
        let limitTop = top

        /** sticky的Bottom */
        let limitBottom = viewHeight - bottom

        /** 计算element在目标容器的top与bottom */
        if (this.targetElement) {
            limitTop += scrollRect.top
            limitBottom = scrollRect.bottom - bottom
        }

        if (top !== undefined && mode !== 'bottom') {
            if (selfRect.top < limitTop) {
                /** 元素的Top到达限制的Top */
                this.setState({ scrollWidth: scrollRect.width, mode: 'top' })

                style = this.getStyle('top', top, selfRect.left, selfRect.width)

                placeholder = placeholderStyle
            } else if (placeholderRect && selfRect.top < placeholderRect.top) {
                /** 处于漂浮状态 */

                /** 后面条件处理在指定容器下，因为已经是sticky，向下滚动时一定是selfRect.top === limitTop */
                if (!target || selfRect.top !== limitTop) {
                    /** 当前既不固Top 也不固Bottom */

                    /** 处于漂浮状态 不设置占位 */
                    /** 处于漂浮或复位 执行这里 */
                    this.setState({ mode: '' })

                    style = {}

                    placeholder = null
                }
            } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
                /** 处理页面resize的情况 */
                this.setState({ scrollWidth: scrollRect.width, mode: 'top' })

                style = this.getStyle('top', top, placeholderRect.left, placeholderRect.width)

                placeholder = placeholderStyle
            }
        }

        if (bottom !== undefined && mode !== 'top') {
            if (selfRect.bottom > limitBottom) {
                this.setState({ scrollWidth: scrollRect.width, mode: 'bottom' })

                style = this.getStyle('bottom', bottom, selfRect.left, selfRect.width)

                placeholder = placeholderStyle
            } else if (
                placeholderRect &&
                (this.targetElement ? scrollRect.bottom : selfRect.bottom) > placeholderRect.bottom
            ) {
                this.setState({ mode: '' })

                style = {}

                placeholder = null
            } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
                this.setState({ scrollWidth: scrollRect.width, mode: 'bottom' })

                style = this.getStyle('bottom', bottom, placeholderRect.left, placeholderRect.width)

                placeholder = placeholderStyle
            }
        }

        if (placeholder !== undefined) {
            this.setState({ placeholder })
        }

        if (style) {
            this.setState({ style })
        }
    }

    getStyle = (mode, offset, left, width) => {
        const { zIndex = 900 } = this.props.style

        const style: React.CSSProperties = {
            position: 'fixed',
            left,
            width,
            [mode]: offset,
            zIndex,
        }

        if (this.targetElement) {
            if (supportSticky) {
                style.position = 'sticky'
            } else {
                // 兼容不支持Sticky的情况
                style.position = 'absolute'
                if (mode === 'top') {
                    style.transform = `translateY(${offset}${this.targetElement.scrollTop}px)`
                } else {
                    style.transform = `translateY(${offset}${this.targetElement.scrollTop}px)`
                }
                delete style.left
            }
        }

        return style
    }

    bindScroll = () => {
        if (this.targetElement) {
            this.targetElement.addEventListener('scroll', this.handlePosition, eventPassive)
        } else {
            events.forEach(e => {
                window.addEventListener(e, this.handlePosition)
            })
        }
    }

    unbindScroll = () => {
        if (this.targetElement) {
            this.targetElement.removeEventListener('scroll', this.handlePosition)
        } else {
            events.forEach(e => {
                window.removeEventListener(e, this.handlePosition)
            })
        }
    }
}

export default Sticky
