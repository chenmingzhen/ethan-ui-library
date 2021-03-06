// @ts-nocheck
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { scrollClass } from '@/styles'
import fixedLength from './fixedLength'

// 滚动条
class ScrollBar extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            dragging: false,
        }

        this.bindHandle = this.bindHandle.bind(this)
        this.handleBarClick = this.handleBarClick.bind(this)
        this.handleBgClick = this.handleBgClick.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.unbindEvent = this.unbindEvent.bind(this)
    }

    componentWillUnmount() {
        this.unbindEvent()
    }

    toggleClassList(method) {
        const { classList } = this.handle.parentNode.parentNode

        // 添加class属性
        if (classList) {
            classList[method](scrollClass('dragging'))
        }
    }

    bindHandle(el) {
        this.handle = el
    }

    bindEvent() {
        document.addEventListener('mousemove', this.handleMouseMove)
        document.addEventListener('mouseup', this.unbindEvent)
    }

    unbindEvent() {
        this.setState({ dragging: false })
        this.toggleClassList('remove')
        document.removeEventListener('mousemove', this.handleMouseMove)
        document.removeEventListener('mouseup', this.unbindEvent)
    }

    // 点击滚动条
    handleBarClick(event) {
        const { offset } = this.props
        // 缓存offset 用于handleMouseMove
        this.cacheOffset = offset
        // 设置正在拖拽
        this.setState({ dragging: true })
        // 记录x,y
        this.mouseX = event.clientX
        this.mouseY = event.clientY

        // 拉动过程添加class
        this.toggleClassList('add')
        this.bindEvent()
    }

    // 移动过程计算移动值 推算offset 回调onScroll
    handleMouseMove(event) {
        const x = event.clientX - this.mouseX
        const y = event.clientY - this.mouseY
        this.mouseX = event.clientX
        this.mouseY = event.clientY

        const { direction, length, onScroll, barLength } = this.props
        const value = direction === 'x' ? x : y

        let newOffset = this.cacheOffset + value / (length - barLength)
        if (newOffset < 0) newOffset = 0
        if (newOffset > 1) newOffset = 1
        if (newOffset === this.cacheOffset) return
        this.cacheOffset = newOffset
        onScroll(newOffset)
    }

    // 点击滚动容器 滚动条外的部分
    handleBgClick(event) {
        // 点击Bar内部内容 不处理
        if (event.target === this.handle) return

        const { direction, length, scrollLength, offset, onScroll } = this.props
        // 获取bar的位置信息
        const rect = this.handle.getBoundingClientRect()

        let newOffset = offset

        // 点击后的计算值 用于下面计算
        const page = length / (scrollLength - length)

        if ((direction === 'x' && event.clientX < rect.left) || (direction === 'y' && event.clientY < rect.top)) {
            newOffset = offset - page
            if (newOffset < 0) newOffset = 0
        } else if (
            (direction === 'x' && event.clientX > rect.right) ||
            (direction === 'y' && event.clientY > rect.top)
        ) {
            newOffset = offset + page
            if (newOffset > 1) newOffset = 1
        }

        // 回调偏差值
        onScroll(newOffset)
    }

    render() {
        const { direction, length, scrollLength, offset, barLength, forceHeight } = this.props
        const { dragging } = this.state
        // 溢出显示Bar
        const show = scrollLength > length

        const className = classnames(
            scrollClass('bar', direction, show && 'show', dragging && 'dragging', !forceHeight && 'padding-y'),
            this.props.className
        )

        const value = (length - barLength) * offset

        const style = {}
        if (scrollLength > 0) {
            if (direction === 'x') {
                // bar的宽/高
                style.width = `${(length / scrollLength) * 100}%`
                // 偏移值x
                style.left = value
            } else {
                style.height = `${(length / scrollLength) * 100}%`
                // 偏移值y
                style.top = value
            }
        }

        return (
            //  滚动容器
            <div
                className={className}
                style={{ height: forceHeight }}
                onMouseDown={show ? this.handleBgClick : undefined}
            >
                {/* 滚动条 */}
                <div
                    className={scrollClass('handle')}
                    onMouseDown={this.handleBarClick}
                    ref={this.bindHandle}
                    style={style}
                />
            </div>
        )
    }
}

ScrollBar.propTypes = {
    // bar的长度
    barLength: PropTypes.number.isRequired,
    className: PropTypes.string,
    direction: PropTypes.oneOf(['x', 'y']),
    // 当scrollHeight小于Wheel div的高度时 强制滚动bar容器的高度为scrollHeight的高度
    forceHeight: PropTypes.number,
    length: PropTypes.number.isRequired, // 容器长度
    offset: PropTypes.number.isRequired, // bar 所在的位置比例 如0.1 0.2
    // 滚动过程中 回调新的offset
    onScroll: PropTypes.func.isRequired,
    scrollLength: PropTypes.number.isRequired, // 滚动的内容总长度
}

ScrollBar.defaultProps = {
    direction: 'y',
}

export default fixedLength(ScrollBar)
