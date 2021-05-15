// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { imageClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import Spin from '../Spin'

/**
 * 放大镜
 * 通过改变status的值来显示是否放大
 * 正常情况status=0 img里面的宽高会受到max的限制 status=1时 img的max style被清除 显示一个完整的图形
 * 由于父级容器存在溢出隐藏 所有出现活动条 这时候mousemove的作用就来了 status为1时 计算父级容器div的scrollTop与scrollLeft
 */
class Magnify extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            // 1 放大 0 正常
            status: 0,
            style: {
                maxHeight: props.maxHeight,
                maxWidth: props.maxWidth,
            },
        }

        this.handleMove = this.handleMove.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.handleLoaded = this.handleLoaded.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.src !== this.props.src && this.state.status === 1) {
            // eslint-disable-next-line
      this.setState({
                loading: true,
                status: 0,
                style: {
                    maxHeight: this.props.maxHeight,
                    maxWidth: this.props.maxWidth,
                },
            })
            this.props.lockScroll(false)
        }
    }

    move(clientX, clientY) {
        const rect = this.element.getBoundingClientRect()
        const image = this.element.querySelector('img')

        // 浏览器滚动条宽度
        const browserBarWidth = window.innerWidth - document.body.clientWidth

        const { width, height } = rect

        const x = (clientX - rect.left) / (width - browserBarWidth)
        const y = (clientY - rect.top) / (height - browserBarWidth)
        // 20为this.element的上下Padding总和
        this.element.scrollTop = (image.offsetHeight - height + 20) * y
        this.element.scrollLeft = (image.offsetWidth - width + 20) * x
    }

    handleLoaded() {
        this.setState({ loading: false })
    }

    handleMove(e) {
        this.move(e.clientX, e.clientY)
    }

    handleResize(e) {
        const { maxHeight, maxWidth, position } = this.props
        if (position !== 'center') return
        const status = this.state.status === 1 ? 0 : 1
        const { clientX, clientY } = e

        this.setState(
            immer(state => {
                state.status = status
                state.style = status === 0 ? { maxHeight, maxWidth } : undefined
            }),
            () => {
                if (status === 0) return
                this.move(clientX, clientY)
            }
        )
        this.props.lockScroll(status === 1)
    }

    render() {
        const { maxHeight, maxWidth, src } = this.props
        const { status, loading } = this.state
        // eslint-disable-next-line
    const cursor = this.props.position === 'center' ? (status === 1 ? 'zoom-out' : 'zoom-in') : 'pointer'
        const style = { maxHeight, maxWidth, cursor }
        if (status === 1) {
            style.overflow = 'scroll'
            style.borderRightWidth = 0
            style.borderBottomWidth = 0
        }

        const onMouseMove = status === 1 ? this.handleMove : undefined

        return (
            <div
                onClick={this.handleResize}
                onMouseMove={onMouseMove}
                ref={el => {
                    this.element = el
                }}
                style={style}
                className={imageClass('magnify')}
            >
                <img onLoad={this.handleLoaded} src={src} alt="" style={this.state.style} />
                {loading && (
                    <div className={imageClass('magnify-loading')}>
                        <Spin size={30} />
                    </div>
                )}
            </div>
        )
    }
}

Magnify.propTypes = {
    lockScroll: PropTypes.func,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    position: PropTypes.string,
    src: PropTypes.string,
}

export default Magnify
