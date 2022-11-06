import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { alertClass } from '@/styles'
import { useList, useTimeoutFn, useUpdateEffect } from 'react-use'
import { getRenderChildrenFromProps, cloneChildren } from './util'
import Alert, { AlertInstance, AlertProps } from './alert'

export interface ScrollAlertProps extends AlertProps {
    scrollInterval?: number

    /** 关闭所有节点时触发的回调 */
    onClose?(): void

    /** 用于统一设置Alert的样式 勿添加Margin 影响计算值 */
    style?: React.CSSProperties

    className?: string
}

const ScrollAlert: React.FC<ScrollAlertProps> = ({
    scrollInterval = 5 * 1000,
    children,
    onClose,
    className,
    ...rest
}) => {
    const { items: i, renderItems: ri } = useMemo(() => getRenderChildrenFromProps(children), [])
    const [activeIndex, setActive] = useState(0)
    const [containerHeight, setHeight] = useState(0)
    const [transitionDuration, setDuration] = useState(0)
    const [items, { set: setItems }] = useList(i)
    const [renderItems, { set: setRenderItems }] = useList(ri)

    const firstChildHeight = useRef<number>()
    const onFirstChildRef = useCallback((itemInstance: AlertInstance) => {
        firstChildHeight.current = itemInstance?.clientHeight() || 0
    }, [])

    // 重置节点为0
    const resetChildren = useCallback(() => {
        setDuration(0)
        setActive(0)
    }, [])

    // 节点滚动事件
    const scrollIntervalFn = useCallback(() => {
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
    }, [scrollInterval, renderItems, activeIndex])

    const [, cancel, reset] = useTimeoutFn(scrollIntervalFn, scrollInterval)

    const onCloseItemHandler = useCallback(
        (index) => {
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
        },
        [onClose, items]
    )

    useEffect(() => {
        setHeight(firstChildHeight.current)
        return cancel
    }, [])

    useUpdateEffect(() => {
        reset()
    }, [containerHeight])

    const scrollCls = alertClass('scroll', className)

    if (!renderItems.length) return null

    return (
        <div className={scrollCls}>
            <div
                className={alertClass('scroll-container')}
                style={{
                    height: containerHeight,
                    transform: `translateY(-${(containerHeight + 22) * activeIndex}px)`,
                    transitionDuration: `${transitionDuration}ms`,
                    transitionProperty: 'transform',
                }}
                onMouseEnter={cancel}
                onMouseLeave={reset}
            >
                {React.Children.map(renderItems, (item, index) => {
                    const props = Object.assign({}, { ...item.props }, rest)

                    return (
                        <Alert
                            {...props}
                            className={alertClass({
                                'scroll-active-item': index === activeIndex,
                                'scroll-virtual-item': !index && activeIndex === renderItems.length - 1,
                            })}
                            key={index}
                            onClose={() => onCloseItemHandler(index)}
                            ref={!index ? onFirstChildRef : undefined}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ScrollAlert
