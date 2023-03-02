import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { tooltipClass } from '@/styles'
import { getPosition, getPositionStr } from '@/utils/dom/popover'
import { styles } from '@/utils/style/styles'
import classnames from 'classnames'
import React, { cloneElement, useEffect, useMemo, useRef } from 'react'
import { useUpdate } from 'react-use'
import Portal from '../Portal'
import { TooltipProps } from './type'

const Tooltip: React.FC<TooltipProps> = function (props) {
    const {
        children,
        tip,
        trigger = 'hover',
        delay = 0,
        priorityDirection,
        visible,
        onVisibleChange,
        className,
        animation = true,
        color,
        getContainer,
    } = props
    const update = useUpdate()
    const timer = useRef<NodeJS.Timeout>()
    const nsRef = useRef<HTMLElement>()
    const tooltipElement = useRef<HTMLDivElement>()
    const portalRootRef = useRef<HTMLDivElement>()
    const [show, updateShow] = useMergedValue({
        defaultStateValue: false,
        options: {
            value: visible,
            onChange(nextVisible) {
                if (onVisibleChange) {
                    onVisibleChange(nextVisible)
                }
            },
        },
    })
    const handleClickAway = useRefMethod(() => {
        updateShow(false)
    })
    const handleMouseEnter = useRefMethod((e: React.MouseEvent) => {
        if (children && children.props && children.props.onMouseEnter) {
            children.props.onMouseEnter(e)
        }

        if (timer.current) {
            clearTimeout(timer.current)

            timer.current = null
        }

        if (delay) {
            timer.current = setTimeout(() => {
                updateShow(true)
            }, delay)
        } else {
            updateShow(true)
        }
    })

    const handleMouseLeave = useRefMethod((e: React.MouseEvent) => {
        if (timer.current) {
            clearTimeout(timer.current)

            timer.current = null
        }

        if (children && children.props && children.props.onMouseLeave) {
            children.props.onMouseLeave(e)
        }

        updateShow(false)
    })

    const handleMousedown = useRefMethod((e: React.MouseEvent) => {
        if (children && children.props && children.props.onMouseDown) {
            children.props.onMouseDown(e)
        }

        /** 避免mousedown动作之后，马上触发document的mousedown，添加延迟设置show，待document mousedown完成后再显示 */
        setTimeout(() => {
            updateShow(!show)
        })
    })

    useEffect(() => {
        if (trigger === 'mousedown') {
            if (show) {
                document.addEventListener('mousedown', handleClickAway)

                return () => {
                    document.addEventListener('mousedown', handleClickAway)
                }
            }

            /** 统一处理受控模式和mousedown模式 */
            document.removeEventListener('mousedown', handleClickAway)
        }
    }, [show])

    /** 样式注入 */
    useEffect(() => {
        const el = tooltipElement.current

        if (!el) return

        el.style.setProperty('--var-trigger-color', color || null)
    }, [color, show])

    /** 当受控时，需要强制刷新一次，计算tooltip的位置 */
    useEffect(() => {
        if (show) {
            update()
        }
    }, [])

    const onRealMounted = useRefMethod((portalRoot: HTMLDivElement) => {
        portalRootRef.current = portalRoot

        /** 当使用指定的container时，Portal渲染到DOM上时需要强制刷新一下，计算tooltip的位置 */
        update()
    })

    /** pointerEvents: 'none' 禁止触发事件 */
    const extraProps = useMemo(
        () => ({
            onMouseEnter: trigger === 'hover' ? handleMouseEnter : undefined,
            onMouseLeave: trigger === 'hover' ? handleMouseLeave : undefined,
            onMouseDown: trigger === 'mousedown' ? handleMousedown : undefined,
        }),
        []
    )

    const [position, style] = useMemo(() => {
        const el = nsRef.current?.nextSibling

        if (!el || !show) return [props.position ?? 'top', undefined]

        const portalRoot = portalRootRef.current
        const innerPosition = getPositionStr(props.position, priorityDirection, portalRoot)
        const formatPosition = innerPosition.split('-')?.[0]

        return [formatPosition, getPosition(innerPosition, el, portalRoot)]
    }, undefined)

    return (
        <>
            <Portal show={show} getContainer={getContainer} onRealMounted={onRealMounted} portal>
                <div
                    ref={tooltipElement}
                    style={styles(props.style, style)}
                    className={classnames(
                        tooltipClass('_', position, animation && 'animation', show && 'show'),
                        className
                    )}
                >
                    <div className={tooltipClass('arrow')} />
                    <div className={tooltipClass('inner')}>{tip}</div>
                </div>
            </Portal>

            <noscript ref={nsRef} />

            {cloneElement(children, extraProps)}
        </>
    )
}

export default React.memo(Tooltip)
