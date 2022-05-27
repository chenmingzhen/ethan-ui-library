import React from 'react'
import { hidableClass } from '@/styles'
import classnames from 'classnames'
import { runInNextFrame } from '@/utils/nextFrame'

export interface ListProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    show: boolean

    height?: number

    className?: string

    getRef?(e: HTMLDivElement): void

    animationTypes: AnimationType[]

    display?: React.CSSProperties['display']

    duration?: 'fast' | 'slow' | number

    /** AnimationList是否一开始就存在于DOM中,懒加载的需要设置该值(Cascader)  */
    lazyDom?: boolean
}

const transformDuration = (duration: string | number) => {
    switch (duration) {
        case 'fast':
            duration = 240
            break
        case 'slow':
            duration = 480
            break
        default:
            if (typeof duration !== 'number') duration = 360
            break
    }

    return duration
}

type AnimationType = 'fade' | 'collapse' | 'scale-y'

export default class AnimationList extends React.PureComponent<ListProps> {
    element: HTMLDivElement

    timer: NodeJS.Timer

    static defaultProps = {
        display: 'block',
    }

    get hasCollapse() {
        const { animationTypes } = this.props

        return animationTypes.indexOf('collapse') >= 0
    }

    get hasTransform() {
        const { animationTypes } = this.props

        return animationTypes.indexOf('scale-y') >= 0
    }

    get hasFade() {
        const { animationTypes } = this.props

        return animationTypes.indexOf('fade') >= 0
    }

    get duration() {
        const { duration } = this.props

        return transformDuration(duration)
    }

    componentDidMount() {
        const { show, lazyDom } = this.props

        if (show) {
            if (lazyDom) {
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

                /** 最终版，各个浏览器都能执行动画的版本 */
                if (this.hasTransform) {
                    this.element.style.display = 'none'
                    this.element.style.transform = 'scaleY(0)'

                    runInNextFrame(() => {
                        this.element.style.display = this.props.display

                        runInNextFrame(() => {
                            this.element.style.transform = 'scaleY(1)'
                        })
                    })
                }

                if (this.hasFade) {
                    this.element.style.display = 'none'
                    this.element.style.opacity = '0'

                    runInNextFrame(() => {
                        this.element.style.display = this.props.display

                        runInNextFrame(() => {
                            this.element.style.opacity = '1'
                        })
                    })
                }

                if (this.hasCollapse) {
                    const fullHeight = this.getFullElementHeight()

                    this.element.style.display = this.props.display

                    this.element.style.height = '0'

                    this.element.style.overflow = 'hidden'

                    runInNextFrame(() => {
                        this.element.style.height = `${fullHeight}px`

                        this.timer = setTimeout(() => {
                            this.element.style.height = 'auto'
                            this.element.style.overflow = ''
                        }, this.duration)
                    })
                }

                // or

                // if (this.hasCollapse) {
                //     const fullHeight = this.getFullElementHeight()

                //     runInNextFrame(() => {
                //         this.element.style.display = 'none'

                //         this.element.style.height = '0'

                //         this.element.style.overflow = 'hidden'

                //         runInNextFrame(() => {
                //             this.element.style.display = this.props.display

                //             runInNextFrame(() => {
                //                 this.element.style.height = `${fullHeight}px`

                //                 this.timer = setTimeout(() => {
                //                     this.element.style.height = 'auto'
                //                     this.element.style.overflow = ''
                //                 }, this.duration)
                //             })
                //         })
                //     })
                // }
            }

            return
        }

        runInNextFrame(() => {
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
        if (prevProps.show === this.props.show) return

        if (this.timer) {
            clearTimeout(this.timer)

            this.timer = null
        }

        const { show, display } = this.props

        if (show) {
            runInNextFrame(() => {
                /** 第一帧先将display从none显示出来 */
                this.element.style.display = display

                /** 在第一帧时获取元素的原始完整高度 */
                const fullHeight = this.getFullElementHeight()

                runInNextFrame(() => {
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
                                this.element.style.height = 'auto'
                                this.element.style.overflow = ''
                            })
                        }, this.duration)
                    }
                })
            })
        } else {
            runInNextFrame(() => {
                if (this.hasCollapse) {
                    const newHeight = this.element.offsetHeight

                    this.element.style.height = `${newHeight}px`

                    runInNextFrame(() => {
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
                        this.element.style.display = 'none'
                    })
                }, this.duration)
            })
        }
    }

    getFullElementHeight = () => {
        if (!this.element) return 0

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
        const { show, getRef, style = {}, animationTypes, duration, lazyDom, ...other } = this.props

        let animation = `animation-${this.duration}`

        if (!this.hasTransform) {
            animation = `fade-${animation}`
        }

        const className = classnames(hidableClass('_', animation), other.className)

        const ms = Object.assign({}, style)

        return <div {...other} ref={this.bindListElement} className={className} style={ms} />
    }
}
