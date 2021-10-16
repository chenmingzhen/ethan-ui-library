import React, { useRef, useEffect, memo } from 'react'
import { useUpdateEffect } from 'react-use'
import { hidableClass } from '@/styles'
import classnames from 'classnames'
import { listClass } from '@/styles'

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

export default function buildList(type: AnimationType[], rawDuration: string | number, display = 'block') {
    const duration = transformDuration(rawDuration)
    const hasCollapse = type.indexOf('collapse') >= 0
    const needTransform = type.indexOf('scale-y') >= 0

    const HideHander: React.FC<ListProps> = ({ show, getRef, style, ...props }) => {
        const height = useRef<number>(0)
        const isShowing = useRef<boolean>(false)
        const elRef = useRef<HTMLDivElement>()

        let animation = `animation-${duration}`

        if (!needTransform) {
            animation = `fade-${animation}`
        }

        const className = classnames(hidableClass('_', ...type, animation), props.className)

        const doShow = () => {
            const el = elRef.current
            const es = el.style

            es.display = display
            // 由于先将display none转为可见形态 设置延时 将div添加show的属性 进而有transform
            setTimeout(() => {
                el.classList.add(hidableClass('show'))

                isShowing.current = true

                if (!hasCollapse) {
                    setTimeout(() => {
                        isShowing.current = false
                    }, duration)
                }
            }, 20)

            if (hasCollapse) {
                setTimeout(() => {
                    es.height = `${height.current}px`
                    isShowing.current = true

                    setTimeout(() => {
                        isShowing.current = false
                        es.height = 'auto'
                        es.overflow = ''
                    }, duration)
                }, 30)
            }
        }

        const doHide = () => {
            const el = elRef.current

            // 移除show
            el.classList.remove(hidableClass('show'))

            if (hasCollapse) {
                el.style.overflow = 'hidden'
                el.style.height = `${el.offsetHeight}px`
                height.current = el.offsetHeight

                setTimeout(() => {
                    el.style.height = '0'
                }, 30)
            }

            setTimeout(() => {
                if (isShowing.current) return

                el.style.display = 'none'
            }, duration)
        }

        useEffect(() => {
            const el = elRef.current

            // 已经是显示状态 不执行
            if (show) {
                el.classList.add(hidableClass('show'))
                return
            }

            // 获取当前容器的高度
            if (hasCollapse) height.current = el.offsetHeight

            // 隐藏
            el.style.display = 'none'

            if (hasCollapse) {
                el.style.overflow = 'hidden'
                el.style.height = '0'
            }
        }, [])

        useUpdateEffect(() => {
            if (show) doShow()
            else doHide()
        }, [show])

        return (
            <div
                {...props}
                ref={e => {
                    getRef?.(e)
                    elRef.current = e
                }}
                className={classnames(listClass('_'), className)}
                style={style}
            />
        )
    }

    return memo(HideHander)
}
