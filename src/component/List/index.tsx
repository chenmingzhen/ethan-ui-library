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
        const { show } = this.props

        if (show) return

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
                this.element.style.display = display

                const newHeight = this.getNewElementHeight()

                runInNextFrame(() => {
                    if (this.hasFade) {
                        this.element.style.opacity = '1'
                    }

                    if (this.hasTransform) {
                        this.element.style.transform = 'scaleY(1)'
                    }

                    if (this.hasCollapse) {
                        this.element.style.height = `${newHeight}px`

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

    getNewElementHeight = () => {
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
        const { show, getRef, style = {}, animationTypes, duration, ...other } = this.props

        let animation = `animation-${this.duration}`

        if (!this.hasTransform) {
            animation = `fade-${animation}`
        }

        const className = classnames(hidableClass('_', animation), other.className)

        const ms = Object.assign({}, style)

        return <div {...other} ref={this.bindListElement} className={className} style={ms} />
    }
}
