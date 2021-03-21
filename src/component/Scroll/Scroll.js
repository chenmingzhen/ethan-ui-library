import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { getProps, defaultProps } from '@/utils/proptypes'
import { getParent } from '@/utils/dom/element'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { scrollClass } from '@/styles'
import config from '@/config'
import { throttleWrapper } from '@/utils/lazyload'
import Bar from './Bar'
import { Provider } from './context'

export const BAR_WIDTH = 16

class Scroll extends PureComponent {
  constructor(props) {
    super(props)

    this.touchStartX = 0
    this.touchStartY = 0

    this.wheelX = true
    this.wheelY = true

    // 像素x 实际值
    this.pixelX = 0
    // 像素y 实际值
    this.pixelY = 0

    this.cacheWidth = 0
    this.cacheHeight = 0

    this.bindInner = this.bindInner.bind(this)
    this.bindWheel = this.bindWheel.bind(this)
    this.setRect = this.setRect.bind(this)
    this.handleScrollX = this.handleScrollX.bind(this)
    this.handleScrollY = this.handleScrollY.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
    this.bindIframe = this.bindIframe.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.setStartPoint = this.setStartPoint.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    setTimeout(this.setRect)
    this.wheelElement.addEventListener('wheel', this.handleWheel, { passive: false })
    // 移动端事件
    this.wheelElement.addEventListener('touchstart', this.handleTouchStart, { passive: true })
    this.wheelElement.addEventListener('touchmove', this.handleTouchMove, { passive: false })
  }

  componentDidUpdate(prevProps) {
    const { stable, scrollWidth, scrollHeight } = this.props
    if (scrollWidth !== prevProps.scrollWidth) this.setRect()
    else if (stable && scrollHeight !== prevProps.scrollHeight) this.setRect()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.wheelElement.removeEventListener('wheel', this.handleWheel)
    this.wheelElement.removeEventListener('touchstart', this.handleTouchStart)
    this.wheelElement.removeEventListener('touchmove', this.handleTouchMove)
  }

  // 获取wheel容器的宽度和高度
  getWheelRect() {
    if (!this.wheelElement) return { width: 0, height: 0 }
    // let width = this.wheelElement.clientWidth
    // let height = this.wheelElement.clientHeight
    let { width, height } = this.wheelElement.getBoundingClientRect()

    // display none
    if (width === 0 && height === 0) {
      width = this.cacheWidth
      height = this.cacheHeight
    } else {
      this.cacheWidth = width
      this.cacheHeight = height
    }

    const { scrollX, scrollY, style } = this.props
    width = (style.width || width) - (scrollY ? BAR_WIDTH : 0)
    height = (style.height || height) - (scrollX ? BAR_WIDTH : 0)
    return { width, height }
  }

  // 设置scroll的滚动位置
  setRect() {
    this.handleScroll(this.props.left, this.props.top)
    this.forceUpdate()
  }

  /**
   * 设置滚动比例
   * @param height
   */
  setBaseScrollHeightRatio(height) {
    if (this.baseScrollRatio) return
    this.baseScrollRatio = 1

    const ratio = config.scrollRatio
    // windows scroll
    if (Math.abs(height) > 10) {
      this.baseScrollRatio = ratio / Math.abs(height)
    }
  }

  // 设置点击的起始点
  setStartPoint(position) {
    this.touchStartX = position.clientX
    this.touchStartY = position.clientY
  }

  bindInner(el) {
    // 实际渲染内容的容器(children的父容器)
    // 无实际意义 返回给调用者 调用者展无使用 可以去掉此容器
    this.inner = el
  }

  // contentDocument 属性能够以 HTML 对象来返回 iframe 中的文档。
  // https://www.runoob.com/jsref/prop-frame-contentwindow.html
  bindIframe(el) {
    if (el && el.contentWindow) {
      el.contentWindow.onresize = throttleWrapper(this.setRect)
    }
  }

  bindWheel(el) {
    this.wheelElement = el
  }

  // wheel滚动处理 移动端滚动处理
  boundleScroll() {
    // 只能一个方向滚动 一个方向滚动 另外一个方向设置为0
    if (Math.abs(this.pixelX) > Math.abs(this.pixelY)) {
      this.pixelY = 0
    } else {
      this.pixelX = 0
    }

    const { left, top } = this.props
    const { scrollWidth, scrollHeight } = this.props

    // 计算left 偏差比例 0.1 0.2
    let x = left + this.pixelX / scrollWidth
    if (x < 0) x = 0
    if (x > 1) x = 1

    // 计算top 偏差比例 0.1 0.2
    let y = top + this.pixelY / scrollHeight
    if (y < 0) y = 0
    if (y > 1) y = 1

    if (x !== left || y !== top) {
      this.handleScroll(x, y, this.pixelX, this.pixelY)
    }

    // 滚动完毕之后重置鼠标滚动xy
    this.pixelX = 0
    this.pixelY = 0
  }

  handleWheel(event) {
    const scrollX = this.wheelX
    const scrollY = this.wheelY
    const { innerScrollAttr } = this.props

    if (!scrollX && !scrollY) return

    // innerScrollAttr 包含当前e的attr 不处理
    if (innerScrollAttr.find(attr => event.target.hasAttribute(attr))) {
      event.stopPropagation()
      return
    }

    // 非本组件鼠标滚动 子组件的滚动 不处理
    const target = getParent(event.target, `.${scrollClass('_')}`)
    if (target !== this.wheelElement) return

    const wheel = normalizeWheel(event)
    this.setBaseScrollHeightRatio(wheel.pixelY)

    // 计算 x y的鼠标滚动值
    if (scrollX) this.pixelX += wheel.pixelX
    if (scrollY) this.pixelY += wheel.pixelY * this.baseScrollRatio

    if (Math.abs(wheel.pixelX) > Math.abs(wheel.pixelY)) {
      event.preventDefault()
    } else if (scrollY) event.preventDefault()

    this.boundleScroll()
  }

  // bar的滚动回调 handleScrollX=>handleScroll=>props=>onScroll
  handleScroll(x, y, pixelX, pixelY) {
    const { scrollWidth } = this.props
    // 获取容器wheel的信息
    const { width, height } = this.getWheelRect()

    const max = Math.round((1 - width / scrollWidth) * scrollWidth)

    if (this.props.onScroll) {
      this.props.onScroll(x, y, max, this.inner, width, height, pixelX, pixelY)
    }
  }

  // left 比例值 0.1
  handleScrollX(left) {
    this.handleScroll(left, this.props.top, undefined, 0)
  }

  // top 比例值 0.1
  handleScrollY(top) {
    this.handleScroll(this.props.left, top)
  }

  // 移动端 开始点击
  handleTouchStart(e) {
    this.setStartPoint(e.changedTouches[0])
  }

  // 移动端 移动
  handleTouchMove(e) {
    const { scrollX, scrollY } = this.props
    e.preventDefault()
    // 拿到移动的点
    const position = e.changedTouches[0]
    // 计算移动值
    const moveX = position.clientX - this.touchStartX
    const moveY = position.clientY - this.touchStartY

    // 记录偏移值
    if (scrollX) this.pixelX = -moveX
    if (scrollY) this.pixelY = -moveY

    // 重置起始点
    this.setStartPoint(position)

    this.boundleScroll()
  }

  render() {
    const { children, scrollWidth, scrollHeight, left, top, scrollX, scrollY, style } = this.props
    // 滚动容器的总宽与总长
    const { width, height } = this.getWheelRect()

    const className = classnames(scrollClass('_', scrollX && 'show-x', scrollY && 'show-y'), this.props.className)

    // wheel 滚动
    // bar的容器长度
    const barLength = scrollHeight < height ? scrollHeight : height

    // 需要y滚动
    this.wheelY = Math.ceil(scrollHeight) > Math.ceil(barLength)
    // 需要x滚动
    this.wheelX = Math.ceil(scrollWidth) > Math.ceil(width)

    return (
      <div style={style} ref={this.bindWheel} className={className}>
        {/* iframe用于占位计算onresize */}
        <iframe tabIndex={-1} title="scroll" ref={this.bindIframe} className={scrollClass('iframe')} />
        <div className={scrollClass('iframe')} />
        {/* 看bindInner  可以去掉此容器 */}
        <div ref={this.bindInner} className={scrollClass('inner')}>
          {/* left: x的滚动准确数值 top:y的滚动准确数值 element:滚动容器ref */}
          <Provider value={{ left: left * width, top: top * height, element: this.wheelElement }}>{children}</Provider>
        </div>
        {scrollY && (
          <Bar
            direction="y"
            length={barLength}
            forceHeight={scrollHeight < height ? scrollHeight : undefined}
            scrollLength={scrollHeight}
            offset={top}
            onScroll={this.handleScrollY}
          />
        )}
        {scrollX && (
          <Bar direction="x" length={width} scrollLength={scrollWidth} offset={left} onScroll={this.handleScrollX} />
        )}
      </div>
    )
  }
}

Scroll.propTypes = {
  ...getProps(PropTypes),
  // x的偏差值 如0.1 0.2 与bar的offset一致
  left: PropTypes.number.isRequired,
  // y的偏差值 如0.1 0.2 与bar的offset一致
  top: PropTypes.number.isRequired,
  onScroll: PropTypes.func.isRequired,
  // 滚动y的总长度
  scrollHeight: PropTypes.number,
  // 滚动x的总长度
  scrollWidth: PropTypes.number,
  // x方向滚动
  scrollX: PropTypes.bool.isRequired,
  // y方向滚动
  scrollY: PropTypes.bool.isRequired,
  stable: PropTypes.bool,
  innerScrollAttr: PropTypes.arrayOf(PropTypes.string),
}

Scroll.defaultProps = {
  ...defaultProps,
  scrollHeight: 0,
  scrollWidth: 0,
  innerScrollAttr: [],
}

export default Scroll
