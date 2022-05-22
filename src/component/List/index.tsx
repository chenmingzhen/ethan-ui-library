import React, { useRef, useEffect, memo } from 'react'
import { useUpdateEffect } from 'react-use'
import { hidableClass } from '@/styles'
import classnames from 'classnames'
import { listClass } from '@/styles'
import { runInNextFrame } from '@/utils/nextFrame'

export interface ListProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    show: boolean

    height?: number

    className?: string

    getRef?(e: HTMLDivElement): void
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

/** @todo 移除高阶组件用法 */
export default function buildList(type: AnimationType[], rawDuration: string | number, display = 'block') {
    const duration = transformDuration(rawDuration)
    const hasCollapse = type.indexOf('collapse') >= 0
    const needTransform = type.indexOf('scale-y') >= 0

    return class extends React.PureComponent<ListProps, { show: boolean }> {
        element: HTMLDivElement

        timer: NodeJS.Timer

        constructor(props: ListProps) {
            super(props)

            this.state = {
                show: props.show,
            }
        }

        componentDidMount() {
            const { show } = this.state

            if (show) return

            runInNextFrame(() => {
                if (hasCollapse) {
                    this.element.style.overflow = 'hidden'
                    this.element.style.height = '0'
                }
            })
        }

        componentDidUpdate(prevProps: ListProps) {
            if (prevProps.show === this.props.show || !hasCollapse) return

            if (this.timer) {
                clearTimeout(this.timer)

                this.timer = null
            }

            const { show } = this.props

            const prevHeight = this.element.offsetHeight

            this.element.style.height = 'auto'

            const newHeight = this.element.offsetHeight

            this.element.style.height = `${prevHeight}px`

            if (show) {
                runInNextFrame(() => {
                    this.element.style.height = `${newHeight}px`

                    this.timer = setTimeout(() => {
                        this.element.style.height = 'auto'
                        this.element.style.overflow = ''
                    }, duration)
                })
            } else {
                runInNextFrame(() => {
                    this.element.style.height = `${newHeight}px`

                    this.timer = setTimeout(() => {
                        this.element.style.height = '0'
                        this.element.style.overflow = 'hidden'
                    }, duration)
                })
            }
        }

        bindListElement = (element: HTMLDivElement) => {
            const { getRef } = this.props

            getRef?.(element)

            this.element = element
        }

        render() {
            const { show, getRef, style = {}, ...other } = this.props

            let animation = `animation-${duration}`

            if (!needTransform) {
                animation = `fade-${animation}`
            }

            const className = classnames(
                hidableClass('_', ...type, animation, show && 'show'),
                listClass('_'),
                other.className
            )

            const ms = Object.assign({ display }, style)

            return <div {...other} ref={this.bindListElement} className={className} style={ms} />
        }
    }
}
