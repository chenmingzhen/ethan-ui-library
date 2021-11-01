/** 优化折叠List的过渡 */
import { PureComponent } from '@/utils/component'
import { runInNextFrame } from '@/utils/nextFrame'
import React from 'react'

export interface AnimationHeightProps {
    height: number | string

    show?: boolean

    duration?: number

    easing?: string

    className?: string

    style?: React.CSSProperties

    overflow: 'hidden' | 'scroll' | 'auto'
}

function applyHeight(el: HTMLDivElement, height: number | string) {
    if (typeof height === 'number') {
        el.style.height = `${height}px`
    } else {
        el.style.height = height
    }
}

class AnimationHeight extends PureComponent<AnimationHeightProps> {
    static defaultProps = {
        show: false,
        duration: 200,
        easing: 'ease',
        overflow: 'hidden',
    }

    ref = React.createRef<HTMLDivElement>()

    timer: NodeJS.Timeout

    componentDidMount = () => {
        const { show, height, duration } = this.props
        const el = this.ref.current

        if (show && height === 'auto') {
            runInNextFrame(() => {
                if (this.props.height === height) {
                    el.style.height = `${el.offsetHeight}px`

                    this.timer = setTimeout(() => {
                        if (this.props.height === height) {
                            el.style.height = 'auto'
                        }
                    }, duration)
                }
            })
        } else {
            applyHeight(el, height)
        }
    }

    componentDidUpdate = (prevProps: AnimationHeightProps) => {
        const { height, duration } = this.props

        if (prevProps.height === height) {
            return
        }

        if (this.timer !== null) {
            clearTimeout(this.timer)

            this.timer = null
        }

        const el = this.ref.current

        if (prevProps.height === 'auto') {
            el.style.height = `${el.offsetHeight}px`

            runInNextFrame(() => {
                if (this.props.height === height) {
                    applyHeight(el, height)
                }
            })
        } else if (height === 'auto') {
            // 保存当前高度
            const prevHeight = el.offsetHeight

            // 获取目标的高度
            el.style.height = 'auto'

            const newHeight = el.offsetHeight

            // 还原为当前高度
            el.style.height = `${prevHeight}px`

            runInNextFrame(() => {
                // 设置为目标的高度
                el.style.height = `${newHeight}px`

                // 在动画结束后设为auto height
                this.timer = setTimeout(() => {
                    this.timer = null

                    if (this.props.height === height) {
                        el.style.height = height
                    }
                }, duration)
            })
        } else {
            applyHeight(el, height)
        }
    }

    render = () => {
        const { duration, className, style, easing, overflow, children } = this.props

        return (
            <div
                ref={this.ref}
                className={className}
                style={{
                    ...style,
                    transition: `height ${duration}ms ${easing}`,
                    overflow,
                }}
            >
                {children}
            </div>
        )
    }
}

export default AnimationHeight
