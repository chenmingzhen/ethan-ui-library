import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { scrollClass } from '@/styles'
import FixedLengthHandler from './FixedLengthHandler'

interface ScrollBarProps {
    direction?: 'x' | 'y'

    className?: string

    /** 当scrollHeight小于Wheel div的高度时 强制滚动bar容器的高度为scrollHeight的高度 */
    forceHeight?: number

    /** 容器长度 */
    length: number

    offset: number

    onScroll(offset: number): void

    /** 滚动容器长度 */
    scrollLength: number
}

interface ScrollBarState {
    dragging: boolean
}

class ScrollBar extends PureComponent<ScrollBarProps, ScrollBarState> {
    static defaultProps = {
        direction: 'y',
    }

    barLength: number

    cacheOffset: number

    mouseX: number

    mouseY: number

    handler = React.createRef<HTMLDivElement>()

    constructor(props) {
        super(props)

        this.state = {
            dragging: false,
        }
    }

    componentWillUnmount = () => {
        this.unbindEvent()
    }

    toggleClassList = (method: 'add' | 'remove') => {
        const { classList } = this.handler.current.parentNode.parentNode as HTMLElement

        classList?.[method]?.(scrollClass('dragging'))
    }

    bindEvent = () => {
        document.addEventListener('mousemove', this.handleMouseMove)

        document.addEventListener('mouseup', this.unbindEvent)
    }

    unbindEvent = () => {
        this.setState({ dragging: false })

        this.toggleClassList('remove')

        document.removeEventListener('mousemove', this.handleMouseMove)

        document.removeEventListener('mouseup', this.unbindEvent)
    }

    // 点击滚动条
    handleBarClick = (event: React.MouseEvent) => {
        const { offset } = this.props

        // 缓存offset 用于handleMouseMove
        this.cacheOffset = offset

        // 设置正在拖拽
        this.setState({ dragging: true })

        // 记录x,y
        this.mouseX = event.clientX

        this.mouseY = event.clientY

        this.toggleClassList('add')

        this.bindEvent()
    }

    // 移动过程计算移动值 推算offset 回调onScroll
    handleMouseMove = (event: MouseEvent) => {
        const x = event.clientX - this.mouseX

        const y = event.clientY - this.mouseY

        this.mouseX = event.clientX

        this.mouseY = event.clientY

        const { direction, length, onScroll } = this.props

        const value = direction === 'x' ? x : y

        let newOffset = this.cacheOffset + value / (length - this.barLength)

        if (newOffset < 0) newOffset = 0

        if (newOffset > 1) newOffset = 1

        if (newOffset === this.cacheOffset) return

        this.cacheOffset = newOffset

        onScroll(newOffset)
    }

    // 点击滚动容器 滚动条外的部分
    handleBgClick = (event: React.MouseEvent) => {
        // 点击Bar内部内容 不处理
        if (event.target === this.handler.current) return

        const { direction, length, scrollLength, offset, onScroll } = this.props
        // 获取bar的位置信息
        const rect = this.handler.current.getBoundingClientRect()

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

        onScroll(newOffset)
    }

    render = () => {
        const { direction, length, scrollLength, offset, forceHeight } = this.props

        const { dragging } = this.state

        const show = scrollLength > length

        const className = classnames(
            scrollClass('bar', direction, show && 'show', dragging && 'dragging', !forceHeight && 'padding-y'),
            this.props.className
        )

        return (
            <FixedLengthHandler length={length} scrollLength={scrollLength}>
                {({ barLength }) => {
                    this.barLength = barLength

                    const value = (length - barLength) * offset

                    const style: React.CSSProperties = {}

                    if (scrollLength > 0) {
                        if (direction === 'x') {
                            style.width = `${(length / scrollLength) * 100}%`

                            style.left = value
                        } else {
                            style.height = `${(length / scrollLength) * 100}%`

                            style.top = value
                        }
                    }

                    return (
                        <div
                            className={className}
                            style={{ height: forceHeight }}
                            onMouseDown={show ? this.handleBgClick : undefined}
                        >
                            <div
                                className={scrollClass('handle')}
                                onMouseDown={this.handleBarClick}
                                ref={this.handler}
                                style={style}
                            />
                        </div>
                    )
                }}
            </FixedLengthHandler>
        )
    }
}

export default ScrollBar
