import React, { RefObject, useMemo, useRef } from 'react'
import { isEmpty } from '@/utils/is'
import classnames from 'classnames'
import { hidableClass } from '@/styles'
import { TransitionProps } from './type'
import Motion from './Motion'

export const FAST_TRANSITION_DURATION = 240
export const MEDIUM_TRANSITION_DURATION = 360
export const SLOW_TRANSITION_DURATION = 480

function Transition<Tag extends HTMLElement = HTMLDivElement>(props: TransitionProps<Tag>, ref?: RefObject<Tag>) {
    const {
        display = 'block',
        tag = 'div',
        height,
        visible,
        transitionTypes,
        className,
        hideDisplayAfterLeave,
        destroyAfterLeave,
        duration: rawDuration,
        ...other
    } = props

    const duration = useMemo(() => {
        switch (rawDuration) {
            case 'fast':
                return FAST_TRANSITION_DURATION
            case 'slow':
                return SLOW_TRANSITION_DURATION
            default:
                return MEDIUM_TRANSITION_DURATION
        }
    }, [rawDuration])

    const hasAnimation = !isEmpty(transitionTypes)
    const hasCollapse = hasAnimation && transitionTypes.includes('collapse')
    const hasTransform = hasAnimation && transitionTypes.includes('scale-y')
    const hasFade = hasAnimation && transitionTypes.includes('fade')
    const isMount = useRef(false)
    const cacheFullElementHeight = useRef<number>()

    function computedFullElementHeight(element: HTMLElement) {
        if (!isEmpty(height)) return height

        if (!hasCollapse) return 0

        const prevHeight = element.offsetHeight
        element.style.height = 'auto'
        const newHeight = element.offsetHeight
        element.style.height = `${prevHeight}px`

        return newHeight
    }

    let transitionCls = `animation-${duration}`
    if (!hasTransform) {
        transitionCls = `fade-${transitionCls}`
    }
    if (!hasAnimation) {
        transitionCls = ''
    }

    const cls = classnames(hidableClass('_', transitionCls), className)

    const Element = tag as React.ElementType

    return (
        <Motion
            destroyAfterLeave={destroyAfterLeave}
            visible={visible}
            onEnterPrepare={(element) => {
                if (!hasAnimation) return
                /** 此逻辑相当于在onAppearPrepare周期执行,考虑在Motion中新增Appear的处理 */
                if (isMount.current) return
                isMount.current = true

                element.style.display = 'none'

                if (hasCollapse) {
                    element.style.overflow = 'hidden'
                    element.style.height = '0'
                }
                if (hasFade) {
                    element.style.opacity = '0'
                }
                if (hasTransform) {
                    element.style.transform = 'scaleY(0)'
                }
            }}
            onEnterStart={(element) => {
                element.style.display = display

                cacheFullElementHeight.current = computedFullElementHeight(element)
            }}
            onEnterActive={(element) => {
                if (!hasAnimation) return

                if (hasFade) {
                    element.style.opacity = '1'
                }

                if (hasTransform) {
                    element.style.transform = 'scaleY(1)'
                }

                if (hasCollapse) {
                    element.style.height = `${cacheFullElementHeight.current}px`
                }
            }}
            onEnterEnd={(element) => {
                if (!hasAnimation) return

                if (isEmpty(props.height)) {
                    element.style.height = 'auto'
                } else {
                    element.style.height = `${props.height}px`
                }

                element.style.overflow = ''
            }}
            onLeavePrepare={(element) => {
                if (hasCollapse) {
                    const newHeight = element.offsetHeight

                    element.style.height = `${newHeight}px`
                }
            }}
            onLeaveActive={(element) => {
                if (!hasAnimation) return

                if (hasCollapse) {
                    element.style.height = '0'
                    element.style.overflow = 'hidden'
                }

                if (hasFade) {
                    element.style.opacity = '0'
                }

                if (hasTransform) {
                    element.style.transform = 'scaleY(0)'
                }
            }}
            onLeaveEnd={(element) => {
                if (destroyAfterLeave) {
                    isMount.current = false
                } else if (hideDisplayAfterLeave) {
                    element.style.display = 'none'
                }
            }}
        >
            <Element {...other} className={cls} ref={ref} />
        </Motion>
    )
}

export default React.memo(React.forwardRef(Transition)) as typeof Transition
