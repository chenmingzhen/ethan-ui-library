import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '@/utils/component'
import { alertClass } from '@/styles'
import { getRenderChildrenFromProps, cloneChildren } from './util'
import Alert from './alert'

const DefaultState = {
  items: [],
  renderItems: [],
  transitionDuration: 0,
  containerHeight: 0,
  activeIndex: 0,
}

class ScrollAlert extends PureComponent {
  constructor(props) {
    super(props)

    this.timeoutId = null

    // 第一个子节点的高度
    this.firstChildHeight = 0

    this.state = {
      ...DefaultState,
      ...getRenderChildrenFromProps(props.children),
    }
  }

  onFirstChildRef = itemInstance => {
    this.firstChildHeight = itemInstance?.clientHeight() || 0
  }

  /**
   * 重置节点为0
   */
  resetChildren = () => {
    this.setState({
      transitionDuration: 0,
      activeIndex: 0,
    })
  }

  onCloseItemHandler = index => {
    const { onClose } = this.props
    const { items } = this.state

    if (index === items.length) {
      index = 0
      this.resetChildren()
    }
    // 删除items元素
    const afterDeleteItems = items.filter((_, i) => index !== i)

    // 删除所有节点时，清除timeout并触发close回调
    if (afterDeleteItems.length === 0) {
      onClose?.()
    }
    // items只有一个元素时, 删除最后一项
    else if (afterDeleteItems.length === 1 || index === afterDeleteItems.length) {
      this.resetChildren()
    }

    this.setState({
      items: afterDeleteItems,
      renderItems: cloneChildren(afterDeleteItems),
    })
  }

  /**
   * 清除timeout
   */
  clearTimer = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  /**
   * 节点滚动事件
   */
  scrollHandler = () => {
    const { scrollInterval } = this.props

    this.timeoutId = setTimeout(() => {
      const { renderItems, activeIndex } = this.state
      const { length } = renderItems
      // 空节点、一个节点均不产生动画
      if (length <= 1) return

      const index = activeIndex + 1
      this.setState({
        transitionDuration: 600,
        activeIndex: index,
      })

      // 滚动到最后一个节点时，重置为初始位置
      if (index === length - 1) {
        setTimeout(this.resetChildren, 600)
      }

      this.scrollHandler()
    }, scrollInterval)
  }

  // 鼠标移入，动画暂停
  stopScroll = () => {
    this.clearTimer()
  }

  // 鼠标移出，动画继续
  continueScroll = () => {
    this.scrollHandler()
  }

  get renderItem() {
    const { children, onClose, ...rest } = this.props
    const { renderItems, activeIndex } = this.state
    const { length } = renderItems

    return React.Children.map(renderItems, (item, index) => {
      const props = Object.assign({}, { ...item.props }, rest)

      return (
        <Alert
          {...props}
          className={alertClass({
            'scroll-active-item': index === activeIndex,
            'scroll-virtual-item': !index && activeIndex === length - 1,
          })}
          key={index}
          onClose={() => this.onCloseItemHandler(index)}
          ref={!index ? this.onFirstChildRef : undefined}
        />
      )
    })
  }

  componentDidMount() {
    super.componentDidMount()
    this.setState({ containerHeight: this.firstChildHeight }, this.scrollHandler)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.clearTimer()
  }

  render() {
    const { className } = this.props

    const { transitionDuration, containerHeight, activeIndex } = this.state
    const { renderItem } = this

    const scrollCls = alertClass('scroll', className)

    return renderItem.length > 0 ? (
      <div className={scrollCls}>
        <div
          className={alertClass('scroll-container')}
          style={{
            height: containerHeight,
            transform: `translateY(-${(containerHeight + 22) * activeIndex}px)`,
            transitionDuration: `${transitionDuration}ms`,
            transitionProperty: 'transform',
          }}
          onMouseEnter={this.stopScroll}
          onMouseLeave={this.continueScroll}
        >
          {renderItem}
        </div>
      </div>
    ) : null
  }
}

ScrollAlert.defaultProps = {
  scrollInterval: 5000,
}

ScrollAlert.propTypes = {
  scrollInterval: PropTypes.number,
  // 关闭所有节点时触发的回调
  onClose: PropTypes.func,
  // 用于统一设置Alert的样式 勿添加Margin 影响计算值
  style: PropTypes.object,
}

export default ScrollAlert
