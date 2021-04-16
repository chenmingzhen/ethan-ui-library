import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '@/utils/component'
import { getParent } from '@/utils/dom/element'
import { eventPassive } from '@/utils/dom/detect'
import { getProps, defaultProps } from '@/utils/proptypes'
import { cssSupport } from '@/utils/dom/element'
import { docSize } from '@/utils/dom/document'

const events = ['scroll', 'resize', 'pageshow', 'load']
const supportSticky = cssSupport('position', 'sticky')

class Sticky extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.bindElement = this.bindElement.bind(this)
    this.bindOrigin = this.bindOrigin.bind(this)
    this.bindPlaceholder = this.bindPlaceholder.bind(this)
    this.handlePosition = this.handlePosition.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    const { target } = this.props
    // 获取目标实例的dom
    this.targetElement = getParent(this.element, target)
    this.handlePosition()
    this.bindScroll()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.unbindScroll()
    if (this.scrollTimer) clearTimeout(this.scrollTimer)
  }

  getStyle(mode, offset, left, width) {
    const { zIndex = 900 } = this.props.style

    const style = {
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

  setPosition() {
    const { bottom, top, target } = this.props
    const { mode, scrollWidth } = this.state

    // children自身的位置信息
    const selfRect = this.element.getBoundingClientRect().toJSON()
    // 如果有设置父容器 获取父容器元素
    const scrollElement = this.targetElement || document.body
    // 父容器元素的位置信息
    const scrollRect = scrollElement.getBoundingClientRect()

    // placeholder的位置信息
    const placeholderRect = this.placeholder ? this.placeholder.getBoundingClientRect().toJSON() : null
    // 视口高度
    const viewHeight = docSize.height

    if (this.origin) {
      const { width } = this.origin.getBoundingClientRect()
      selfRect.width = width
      if (placeholderRect) placeholderRect.width = width
    }

    // 占位元素的style
    const placeholderStyle = {
      width: selfRect.width,
      // if target element is not null, set height to 0
      height: target && supportSticky ? 0 : selfRect.height,
    }

    let style
    let placeholder
    // sticky的Top
    let limitTop = top
    // sticky的Bottom
    let limitBottom = viewHeight - bottom

    // 如果有目标容器 非body
    // 计算element在目标容器的top与bottom
    if (this.targetElement) {
      limitTop += scrollRect.top
      limitBottom = scrollRect.bottom - bottom
    }

    if (top !== undefined && mode !== 'bottom') {
      if (selfRect.top < limitTop) {
        // 元素的Top到达限制的Top
        this.setState({ scrollWidth: scrollRect.width, mode: 'top' })
        style = this.getStyle('top', top, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (placeholderRect && selfRect.top < placeholderRect.top) {
        // 同时设置top bottom时的处理
        // 如 top 0 bottom 0
        if (!(target && selfRect.top === limitTop)) {
          // 当前既不固Top 也不固Bottom
          // 处于漂浮状态 不设置占位
          // 处于漂浮或复位 执行这里
          this.setState({ mode: '' })
          style = {}
          placeholder = null
        }
      } else if (this.targetElement && placeholderRect) {
        // 暂无作用
        style = this.getStyle('top', top, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
        // 处理页面resize的情况
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
      } else if (this.targetElement && placeholderRect) {
        style = this.getStyle('bottom', bottom, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
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

  handlePosition() {
    // 如果锁住 不操作
    if (this.locked) {
      this.scrollCount += 1
      return
    }

    this.locked = true
    this.scrollCount = 0

    this.setPosition()
    // 因为锁住 所以不需要clearTimer
    this.scrollTimer = setTimeout(() => {
      this.locked = false
      if (this.scrollCount > 0) {
        this.handlePosition()
      }
    }, 48)
  }

  bindElement(el) {
    this.element = el
  }

  bindOrigin(el) {
    this.origin = el
  }

  bindPlaceholder(el) {
    this.placeholder = el
  }

  // 绑定滚动事件
  bindScroll() {
    if (this.targetElement) {
      this.targetElement.addEventListener('scroll', this.handlePosition, eventPassive)
    } else {
      events.forEach(e => {
        window.addEventListener(e, this.handlePosition)
      })
    }
  }

  unbindScroll() {
    if (this.targetElement) {
      this.targetElement.removeEventListener('scroll', this.handlePosition)
    } else {
      events.forEach(e => {
        window.removeEventListener(e, this.handlePosition)
      })
    }
  }

  render() {
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
        <div ref={this.bindElement} style={innerStyle}>
          {children}
        </div>
        <div ref={this.bindOrigin} />
        {placeholder && <div ref={this.bindPlaceholder} style={placeholder} id={`placeholder${Math.random()}`} />}
      </div>
    )
  }
}

Sticky.propTypes = {
  ...getProps(PropTypes),
  bottom: PropTypes.number,
  children: PropTypes.any.isRequired,
  target: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  top: PropTypes.number,
}

Sticky.defaultProps = {
  ...defaultProps,
}

Sticky.displayName = 'EthanSticky'

export default Sticky
