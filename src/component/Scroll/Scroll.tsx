import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { getParent } from '@/utils/dom/element'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { scrollClass } from '@/styles'
import { throttleWrapper } from '@/utils/lazyload'
import Bar from './Bar'
import { Provider } from './context'
import { ScrollProps } from './type'

export const BAR_WIDTH = 16

class Scroll extends PureComponent<ScrollProps> {
    static defaultProps = {
        scrollHeight: 0,
        scrollWidth: 0,
        innerScrollAttr: [],
    }

    touchStartX = 0

    touchStartY = 0

    /** 需要x滚动 */
    wheelX = true

    /** 需要y滚动 */
    wheelY = true

    /** 像素x 实际值 */
    pixelX = 0

    /** 像素y 实际值 */
    pixelY = 0

    wheelElement: HTMLDivElement

    innerElement: HTMLDivElement

    componentDidMount = () => {
        super.componentDidMount()

        this.wheelElement.addEventListener('wheel', this.handleWheel, { passive: false })
        /** 移动端事件 */
        this.wheelElement.addEventListener('touchstart', this.handleTouchStart, { passive: true })
        this.wheelElement.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    }

    componentWillUnmount = () => {
        super.componentWillUnmount()

        this.wheelElement.removeEventListener('wheel', this.handleWheel)
        this.wheelElement.removeEventListener('touchstart', this.handleTouchStart)
        this.wheelElement.removeEventListener('touchmove', this.handleTouchMove)
    }

    bindWheelElement = wheelElement => {
        this.wheelElement = wheelElement
    }

    getWheelRect = () => {
        if (!this.wheelElement) return { width: 0, height: 0 }

        let { width, height } = this.wheelElement.getBoundingClientRect()

        const { scrollX, scrollY, style } = this.props

        width = ((style.width as number) || width) - (scrollY ? BAR_WIDTH : 0)
        height = ((style.height as number) || height) - (scrollX ? BAR_WIDTH : 0)

        return { width, height }
    }

    /** 设置scroll的滚动位置 */
    recomputedScrollRect = () => {
        this.handleScroll(this.props.left, this.props.top)

        this.forceUpdate()
    }

    // 设置点击的起始点
    resetStartPoint = position => {
        this.touchStartX = position.clientX
        this.touchStartY = position.clientY
    }

    /** contentDocument 属性能够以 HTML 对象来返回 iframe 中的文档。 */
    /** @see https://www.runoob.com/jsref/prop-frame-contentwindow.html  */
    handleIframeResize = el => {
        if (el && el.contentWindow) {
            el.contentWindow.onresize = throttleWrapper(this.recomputedScrollRect)
        }
    }

    wheelOrTouchDispatchScroll = () => {
        const { left, top } = this.props

        const { scrollWidth, scrollHeight } = this.props

        const { height, width } = this.getWheelRect()

        /** 只能一个方向滚动 一个方向滚动 另外一个方向设置为0 */
        if (Math.abs(this.pixelX) > Math.abs(this.pixelY)) {
            this.pixelY = 0
        } else {
            this.pixelX = 0
        }

        const contentHeight = scrollHeight - height

        const contentWidth = scrollWidth - width

        let x = scrollWidth === 0 ? 0 : left + this.pixelX / contentWidth
        if (x < 0) x = 0
        if (x > 1) x = 1

        let y = scrollHeight === 0 ? 0 : top + this.pixelY / contentHeight
        if (y < 0) y = 0
        if (y > 1) y = 1

        if (x !== left || y !== top) {
            this.handleScroll(x, y, this.pixelX, this.pixelY)
        }

        /** 滚动完毕之后重置鼠标滚动xy */
        this.pixelX = 0
        this.pixelY = 0
    }

    handleWheel = (event: WheelEvent) => {
        const scrollX = this.wheelX
        const scrollY = this.wheelY

        if (!scrollX && !scrollY) return

        const { innerScrollAttr } = this.props

        /** innerScrollAttr 包含当前e的attr 不处理 */
        /** 注意currentTarget与Target的区别 */
        /** 当前滚动组件里面还有原生滚动，应阻止当前组件的滚动 */
        if (innerScrollAttr.find(attr => (event.target as HTMLElement).hasAttribute(attr))) {
            event.stopPropagation()

            return
        }

        /** 如果子组件通过传送门创建，会触发这个事件，但是此情况并不想触发滚动，故加下判断，要求子组件一定要在当前滚动容器的DOM中 */
        const target = getParent(event.target, `.${scrollClass('_')}`)

        if (target !== this.wheelElement) return

        const wheel = normalizeWheel(event)

        /** this.pixelX=wheel.pixelX 也可行，下面写法防止极端情况 */
        if (scrollX) this.pixelX += wheel.pixelX

        if (scrollY) this.pixelY += wheel.pixelY

        event.preventDefault()

        this.wheelOrTouchDispatchScroll()
    }

    handleScroll = (x: number, y: number, pixelX?, pixelY?) => {
        const { scrollWidth } = this.props

        const { width, height } = this.getWheelRect()

        const xMax = Math.round((1 - width / scrollWidth) * scrollWidth)

        if (this.props.onScroll) {
            this.props.onScroll(x, y, xMax, this.innerElement, width, height, pixelX, pixelY)
        }
    }

    handleScrollX = (leftRadio: number) => {
        this.handleScroll(leftRadio, this.props.top)
    }

    handleScrollY = (topRadio: number) => {
        this.handleScroll(this.props.left, topRadio)
    }

    /** 移动端 开始点击 */
    handleTouchStart = e => {
        this.resetStartPoint(e.changedTouches[0])
    }

    /** 移动端 移动 */
    handleTouchMove = e => {
        const { scrollX, scrollY } = this.props

        e.preventDefault()

        /** 拿到移动的点 */
        const position = e.changedTouches[0]

        const moveX = position.clientX - this.touchStartX
        const moveY = position.clientY - this.touchStartY

        if (scrollX) this.pixelX = -moveX
        if (scrollY) this.pixelY = -moveY

        this.resetStartPoint(position)

        this.wheelOrTouchDispatchScroll()
    }

    render = () => {
        const { children, scrollWidth, scrollHeight, left, top, scrollX, scrollY, style } = this.props
        // 滚动容器的总宽与总长
        const { width, height } = this.getWheelRect()

        const className = classnames(scrollClass('_', scrollX && 'show-x', scrollY && 'show-y'), this.props.className)

        this.wheelY = Math.ceil(scrollHeight) > Math.ceil(height)

        this.wheelX = Math.ceil(scrollWidth) > Math.ceil(width)

        return (
            <div style={style} ref={this.bindWheelElement} className={className}>
                {/* iframe用于占位计算onresize */}
                <iframe tabIndex={-1} title="scroll" ref={this.handleIframeResize} className={scrollClass('iframe')} />
                <div
                    ref={innerElement => {
                        /** 实际渲染内容的容器(children的父容器) 可以去掉此容器 */
                        /** 无实际意义 返回给调用者 调用者展无使用 可以去掉此容器 */
                        this.innerElement = innerElement
                    }}
                    className={scrollClass('inner')}
                >
                    {/* left: x的滚动准确数值 top:y的滚动准确数值 element:滚动容器ref */}
                    <Provider value={{ left: left * width, top: top * height, element: this.wheelElement }}>
                        {children}
                    </Provider>
                </div>
                {scrollY && (
                    <Bar
                        direction="y"
                        length={height}
                        scrollLength={scrollHeight}
                        offset={top}
                        onScroll={this.handleScrollY}
                    />
                )}
                {scrollX && (
                    <Bar
                        direction="x"
                        length={width}
                        scrollLength={scrollWidth}
                        offset={left}
                        onScroll={this.handleScrollX}
                    />
                )}
            </div>
        )
    }
}

export default Scroll
