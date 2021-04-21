// @ts-nocheck 
import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '@/utils/component'
import Scroll from './Scroll'

export default class extends PureComponent {
  static propTypes = {
    onScroll: PropTypes.func,
    // 滚动方向
    scroll: PropTypes.oneOf(['x', 'y', 'both', '']),
    // left的偏差值 0.1 0.2
    scrollLeft: PropTypes.number,
    // top的偏差值 0.1 0.2
    scrollTop: PropTypes.number,
  }

  static defaultProps = {
    scroll: 'both',
  }

  constructor(props) {
    super(props)
    this.state = {
      left: props.scrollLeft || 0,
      top: props.scrollTop || 0,
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  get scrollX() {
    const { scroll } = this.props
    return scroll === 'x' || scroll === 'both'
  }

  get scrollY() {
    const { scroll } = this.props
    return scroll === 'y' || scroll === 'both'
  }

  getRect() {
    const left = this.props.scrollLeft === undefined ? this.state.left : this.props.scrollLeft
    const top = this.props.scrollTop === undefined ? this.state.top : this.props.scrollTop
    return { left, top }
  }

  handleScroll(x, y, ...others) {
    const left = this.scrollX ? x : 0
    const top = this.scrollY ? y : 0

    // 设置偏差比例
    this.setState({ left, top })

    if (this.props.onScroll) {
      this.props.onScroll(left, top, ...others)
    }
  }

  render() {
    const { left, top } = this.getRect()

    return (
      <Scroll
        {...this.props}
        left={left}
        top={top}
        scrollX={this.scrollX}
        scrollY={this.scrollY}
        onScroll={this.handleScroll}
      />
    )
  }
}
