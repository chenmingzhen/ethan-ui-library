import React from 'react'
import { hidableClass } from '@/styles'
import classnames from 'classnames'
import { runInNextFrame } from '@/utils/nextFrame'
import { isEmpty } from '@/utils/is'
import cleanProps from '@/utils/cleanProps'

export interface ListProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    show: boolean

    height?: number

    className?: string

    getRef?(e: HTMLDivElement): void

    animationTypes?: AnimationType[]

    display?: React.CSSProperties['display']

    duration?: 'fast' | 'slow' | number

    tag?: keyof HTMLElementTagNameMap

    /** AnimationList是否一开始就存在于DOM中,懒加载的需要设置该值  */
    lazyDom?: boolean

    onTransitionEnd?: React.TransitionEventHandler<HTMLDivElement>
}

export const FAST_TRANSITION_DURATION = 240

export const SLOW_TRANSITION_DURATION = 480

const transformDuration = (duration: string | number) => {
    switch (duration) {
        case 'fast':
            duration = FAST_TRANSITION_DURATION
            break
        case 'slow':
            duration = SLOW_TRANSITION_DURATION
            break
        default:
            if (typeof duration !== 'number') duration = 360
            break
    }

    return duration
}

type AnimationType = 'fade' | 'collapse' | 'scale-y'

export default class AnimationList extends React.PureComponent<ListProps> {
    element: HTMLElement

    timer: NodeJS.Timer

    static defaultProps = {
        display: 'block',
        tag: 'div',
    }

    get hasAnimation() {
        const { animationTypes } = this.props

        return !isEmpty(animationTypes)
    }

    get hasCollapse() {
        const { animationTypes } = this.props

        return this.hasAnimation && animationTypes.indexOf('collapse') >= 0
    }

    get hasTransform() {
        const { animationTypes } = this.props

        return this.hasAnimation && animationTypes.indexOf('scale-y') >= 0
    }

    get hasFade() {
        const { animationTypes } = this.props

        return this.hasAnimation && animationTypes.indexOf('fade') >= 0
    }

    get duration() {
        const { duration } = this.props

        return transformDuration(duration)
    }

    componentDidMount() {
        const { show, lazyDom } = this.props

        if (!this.hasAnimation) return

        if (show) {
            if (lazyDom) {
                if (!this.element) return
                // 不起效果的写法，按常规逻辑，下面的写法是没有问题的，第一帧先将动画置为起始态，第二帧开始将动画置为最终态
                // 在Chrome中无效果，在火狐开发者版中有效果 (Dropdown是click的情况 hover的情况则相反,Chrome有效果，火狐中没有)
                // if (this.hasTransform) {
                //     runInNextFrame(() => {
                //         this.element.style.transform = 'scaleY(0)'

                //         runInNextFrame(() => {
                //             this.element.style.transform = 'scaleY(1)'
                //         })
                //     })
                // }

                /** @see https://zh-hans.reactjs.org/docs/react-component.html#componentdidmount */
                /** @see https://zhuanlan.zhihu.com/p/388636591 */

                /** 提前获取DOM的完整高度 */
                const fullHeight = this.getFullElementHeight()

                /** 最终版，各个浏览器都能执行动画的版本 */
                if (this.hasTransform) {
                    this.element.style.display = 'none'
                    this.element.style.transform = 'scaleY(0)'

                    runInNextFrame(() => {
                        if (!this.element) return

                        this.element.style.display = this.props.display

                        runInNextFrame(() => {
                            if (!this.element) return

                            this.element.style.transform = 'scaleY(1)'
                        })
                    })
                }

                if (this.hasFade) {
                    this.element.style.display = 'none'
                    this.element.style.opacity = '0'

                    runInNextFrame(() => {
                        if (!this.element) return

                        this.element.style.display = this.props.display

                        runInNextFrame(() => {
                            if (!this.element) return

                            this.element.style.opacity = '1'
                        })
                    })
                }

                if (this.hasCollapse) {
                    this.element.style.display = 'none'
                    this.element.style.height = '0'
                    this.element.style.overflow = 'hidden'

                    runInNextFrame(() => {
                        if (!this.element) return

                        this.element.style.display = this.props.display

                        runInNextFrame(() => {
                            if (!this.element) return

                            this.element.style.height = `${fullHeight}px`

                            this.timer = setTimeout(() => {
                                if (!this.element) return

                                if (isEmpty(this.props.height)) {
                                    this.element.style.height = 'auto'
                                }

                                this.element.style.overflow = ''
                            }, this.duration)
                        })
                    })
                }
            }

            return
        }

        runInNextFrame(() => {
            if (!this.element) return

            this.element.style.display = 'none'

            if (this.hasCollapse) {
                this.element.style.overflow = 'hidden'
                this.element.style.height = '0'
            }

            if (this.hasFade) {
                this.element.style.opacity = '0'
            }

            if (this.hasTransform) {
                this.element.style.transform = 'scaleY(0)'
            }
        })
    }

    componentDidUpdate(prevProps: ListProps) {
        if (!this.hasAnimation) return

        if (prevProps.show === this.props.show) return

        if (this.timer) {
            clearTimeout(this.timer)

            this.timer = null
        }

        const { show, display } = this.props

        if (show) {
            runInNextFrame(() => {
                if (!this.element) return

                /** 第一帧先将display从none显示出来 */
                this.element.style.display = display

                /** 在第一帧时获取元素的原始完整高度 */
                const fullHeight = this.getFullElementHeight()

                runInNextFrame(() => {
                    if (!this.element) return

                    /** 第二帧开始动画的转变 */
                    if (this.hasFade) {
                        this.element.style.opacity = '1'
                    }

                    if (this.hasTransform) {
                        this.element.style.transform = 'scaleY(1)'
                    }

                    if (this.hasCollapse) {
                        this.element.style.height = `${fullHeight}px`

                        this.timer = setTimeout(() => {
                            runInNextFrame(() => {
                                if (isEmpty(this.props.height)) {
                                    this.element.style.height = 'auto'
                                } else {
                                    this.element.style.height = `${this.props.height}px`
                                }

                                this.element.style.overflow = ''
                            })
                        }, this.duration)
                    }
                })
            })
        } else {
            runInNextFrame(() => {
                if (!this.element) return

                if (this.hasCollapse) {
                    const newHeight = this.element.offsetHeight

                    this.element.style.height = `${newHeight}px`

                    runInNextFrame(() => {
                        if (!this.element) return

                        this.element.style.height = '0'
                        this.element.style.overflow = 'hidden'
                    })
                }

                if (this.hasFade) {
                    this.element.style.opacity = '0'
                }

                if (this.hasTransform) {
                    this.element.style.transform = 'scaleY(0)'
                }

                this.timer = setTimeout(() => {
                    runInNextFrame(() => {
                        if (!this.element) return

                        this.element.style.display = 'none'
                    })
                }, this.duration)
            })
        }
    }

    /**
     *
     * @description 已做优化，如果动画的类型不包含折叠，则不从element中获取高度，因为获取高度的动作是会附一个确定的高度值,对DOM造成污染,
     * 例如优化前，Select的输入模式中，动画模式中没包含高度，输入一个值时，DOM的高度已经发生改变，但是getFullElementHeight函数赋DOM还是旧的高度，导致显示异常
     *
     */
    getFullElementHeight = () => {
        if (!isEmpty(this.props.height)) return this.props.height

        /** 返回一个没有意义的值，使DOM不会参与计算然后被赋值一个确定的高度 */
        if (!this.hasCollapse) return 0

        if (!this.element) return this.props.height ?? 0

        const prevHeight = this.element.offsetHeight

        this.element.style.height = 'auto'

        const newHeight = this.element.offsetHeight

        this.element.style.height = `${prevHeight}px`

        return newHeight
    }

    bindListElement = (element: HTMLDivElement) => {
        const { getRef } = this.props

        getRef?.(element)

        this.element = element
    }

    render() {
        const { show, getRef, style = {}, animationTypes, duration, lazyDom, tag, ...other } = this.props

        let animation = `animation-${this.duration}`

        if (!this.hasTransform) {
            animation = `fade-${animation}`
        }

        if (!this.hasAnimation) {
            animation = ''
        }

        const className = classnames(hidableClass('_', animation), other.className)

        const ms = Object.assign({}, style)

        const Tag = tag as React.ElementType

        return <Tag {...cleanProps(other)} ref={this.bindListElement} className={className} style={ms} />
    }
}
