import React, { useRef, useCallback, useEffect, memo } from 'react'
import { useUpdateEffect } from 'react-use'
import { getUidStr } from '@/utils/uid'
import { hidableClass } from '@/styles'
import classnames from 'classnames'
import { listClass } from '@/styles'

interface ListProps extends Element {
    show: boolean

    height: number

    className: string

    getRef(e: HTMLDivElement): void

    style: React.CSSProperties
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

export default function(type: string[], rawDuration: string | number, display = 'block') {
    const duration = transformDuration(rawDuration)
    const hasCollapse = type.indexOf('collapse') >= 0
    const needTransform = type.indexOf('scale-y') >= 0

    const HideHander: React.FC<ListProps> = ({ show, getRef, style, ...props }) => {
        const height = useRef<number>(0)
        const id = useRef<string>(`__hidable_${getUidStr()}__`)
        const isShowing = useRef<boolean>(false)

        let animation = `animation-${duration}`
        if (!needTransform) {
            animation = `fade-${animation}`
        }
        const className = classnames(
            // 控制动画
            hidableClass('_', ...type, animation),
            props.className,
            id.current
        )

        const getElement = () => {
            return document.querySelector(`.${id.current}`) as HTMLDivElement
        }

        const doShow = () => {
            const el = getElement()
            const es = el.style

            es.display = display

            setTimeout(() => {
                el.classList.add(hidableClass('show'))
            })

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
            const el = getElement()

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
            const el = getElement()

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

        return <div {...props} ref={getRef} className={classnames(listClass('_'), className)} style={style} />
    }

    return memo(HideHander)
}
