import React, { useEffect, useRef, useMemo } from 'react'
import { alertClass } from '@/styles'
import { useTimeoutFn, useUpdateEffect } from 'react-use'
import useRefMethod from '@/hooks/useRefMethod'
import useSafeState from '@/hooks/useSafeState'
import { getRenderChildrenFromProps, cloneChildren } from './util'
import Alert from './alert'
import { ScrollAlertProps } from './type'

const MARGIN_BOTTOM = 20

const ScrollAlert: React.FC<ScrollAlertProps> = ({
    scrollInterval = 3 * 1000,
    children,
    onClose,
    className,
    ...rest
}) => {
    const { items: i, renderItems: ri } = useMemo(() => getRenderChildrenFromProps(children), [])
    const [activeIndex, setActive] = useSafeState(0)
    const [containerHeight, setHeight] = useSafeState(0)
    const [transitionDuration, setDuration] = useSafeState(0)
    const [items, setItems] = useSafeState(i)
    const [renderItems, setRenderItems] = useSafeState(ri)

    const firstChildHeight = useRef<number>()
    const onFirstChildRef = useRefMethod((alertDOM: HTMLDivElement) => {
        if (!alertDOM) return

        firstChildHeight.current = alertDOM.offsetHeight || 0
    })

    // 重置节点为0
    const resetChildren = useRefMethod(() => {
        setDuration(0)
        setActive(0)
    })

    // 节点滚动事件
    const scrollIntervalFn = useRefMethod(() => {
        const { length } = renderItems
        // 空节点、一个节点均不产生动画
        if (length <= 1) return

        const index = activeIndex + 1

        setDuration(600)
        setActive(index)

        // 滚动到最后一个节点时，重置为初始位置
        if (index === length - 1) {
            setTimeout(resetChildren, 600)
        }

        reset()
    })

    const [, cancel, reset] = useTimeoutFn(scrollIntervalFn, scrollInterval)

    const handleCloseItem = useRefMethod((index) => {
        // 为克隆item的最后一项 即第一项
        if (index === items.length) {
            index = 0
            resetChildren()
        }

        // 删除items元素
        const afterDeleteItems = items.filter((_, _i) => index !== _i)

        // 删除所有节点时，清除timeout并触发close回调
        if (afterDeleteItems.length === 0) {
            onClose?.()
        } else if (afterDeleteItems.length === 1 || index === afterDeleteItems.length) {
            // items只有一个元素时, 删除最后一项
            resetChildren()
        }

        setItems(afterDeleteItems)
        setRenderItems(cloneChildren(afterDeleteItems))
    })

    useEffect(() => {
        setHeight(firstChildHeight.current)

        return cancel
    }, [])

    useUpdateEffect(reset, [containerHeight])

    const scrollCls = alertClass('scroll', className)

    if (!renderItems.length) return null

    return (
        <div className={scrollCls}>
            <div
                onMouseLeave={reset}
                onMouseEnter={cancel}
                className={alertClass('scroll-container')}
                style={{
                    height: containerHeight,
                    transition: `transform ${transitionDuration}ms`,
                    transform: `translateY(-${(containerHeight + MARGIN_BOTTOM) * activeIndex}px)`,
                }}
            >
                {React.Children.map(renderItems, (item, index) => {
                    const props = Object.assign({}, { ...item.props }, rest)

                    return (
                        <Alert
                            {...props}
                            key={index}
                            onClose={() => handleCloseItem(index)}
                            ref={!index ? onFirstChildRef : undefined}
                            className={alertClass({
                                'scroll-active-item': index === activeIndex,
                                'scroll-virtual-item': !index && activeIndex === renderItems.length - 1,
                            })}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ScrollAlert
