import React, { cloneElement, useEffect, useMemo, useRef, useState } from 'react'
import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isFunc } from '@/utils/is'
import { isDescendent } from '@/utils/dom/element'
import useResizeObserver from '@/hooks/useResizeObserver'
import { TriggerProps } from './type'
import Portal from '../Portal'
import Transition from '../Motion/Transition'
import Motion from '../Motion/Motion'

const Trigger: React.FC<TriggerProps> = function (props) {
    const {
        popup,
        componentKey,
        visible,
        children,
        defaultVisible,
        resizeDebounce,
        onWindowResize,
        onVisibleChange,
        mouseEnterDelay,
        mouseLeaveDelay,
        portalClassName,
        getPopupElement,
        bindPortalElement,
        getPopupContainer,
        bindTriggerElement,
        motionComponentProps,
        onTriggerElementResize,
        transitionComponentProps,
        triggerActions = ['mousedown'],
    } = props
    const [showNoScript, updateShowNoScript] = useState(true)
    const triggerElementRef = useRef<HTMLElement>()
    const timer = useRef<NodeJS.Timeout>()
    const [show, updateShow] = useMergedValue({
        defaultStateValue: false,
        options: {
            value: visible,
            defaultValue: defaultVisible,
            onChange: onVisibleChange,
        },
    })

    const handleMouseEnter = useRefMethod((e: React.MouseEvent) => {
        if (children && children.props && children.props.onMouseEnter) {
            children.props.onMouseEnter(e)
        }
        if (timer.current) {
            clearTimeout(timer.current)
            timer.current = null
        }

        if (mouseEnterDelay) {
            timer.current = setTimeout(() => {
                updateShow(true)
            }, mouseEnterDelay * 1000)
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
        if (isDescendent(e.relatedTarget as HTMLElement, componentKey)) return
        if (mouseLeaveDelay) {
            timer.current = setTimeout(() => {
                updateShow(false)
            }, mouseLeaveDelay * 1000)
        } else {
            updateShow(false)
        }
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

    const bindNoScriptDOMNode = useRefMethod((dom: HTMLElement) => {
        if (dom) {
            const triggerDOMNode = dom.nextSibling as HTMLElement

            if (isFunc(bindTriggerElement)) {
                bindTriggerElement(triggerDOMNode)
            } else if (bindTriggerElement && Object.prototype.hasOwnProperty.call(bindTriggerElement, 'current')) {
                bindTriggerElement.current = triggerDOMNode
            }

            triggerElementRef.current = triggerDOMNode
        }

        updateShowNoScript(false)
    })

    const triggerProps = useMemo(
        () => ({
            /** 绑定Action */
            onMouseEnter: triggerActions.includes('hover') ? handleMouseEnter : undefined,
            onMouseLeave: triggerActions.includes('hover') ? handleMouseLeave : undefined,
            onMouseDown: triggerActions.includes('mousedown') ? handleMousedown : undefined,
        }),
        []
    )

    const handleClickAway = useRefMethod((evt: MouseEvent) => {
        const desc = isDescendent(evt.target as HTMLElement, componentKey)
        if (desc) return

        updateShow(false)
    })

    const handlePopupElementMouseLeave = useRefMethod((e: MouseEvent) => {
        if (e.relatedTarget === triggerElementRef.current) return

        updateShow(false)
    })

    const addPopupEventListener = useRefMethod(() => {
        const popupElement = getPopupElement()
        if (!popupElement) return

        popupElement.addEventListener('mouseleave', handlePopupElementMouseLeave)
    })

    const removePopupEventListener = useRefMethod(() => {
        const popupElement = getPopupElement()
        if (!popupElement) return

        popupElement.removeEventListener('mouseleave', handlePopupElementMouseLeave)
    })

    useEffect(() => {
        if (triggerActions.includes('mousedown')) {
            if (show) {
                document.addEventListener('mousedown', handleClickAway)
                return () => {
                    document.addEventListener('mousedown', handleClickAway)
                }
            }

            /** 统一处理受控模式和mousedown模式 */
            document.removeEventListener('mousedown', handleClickAway)
        }
        if (triggerActions.includes('hover') && getPopupElement) {
            if (show) {
                /** 等待DOM挂载后再添加事件 */
                setTimeout(addPopupEventListener)
                return removePopupEventListener
            }
        }
    }, [show])

    useResizeObserver({
        watch: !!(onTriggerElementResize && show),
        onResize: onTriggerElementResize,
        options: { direction: 'xy', callbackDebounce: resizeDebounce },
        getTargetElement: () => triggerElementRef.current,
    })

    useResizeObserver({
        watch: !!(onWindowResize && show),
        onResize: onWindowResize,
        options: { direction: 'xy', callbackDebounce: resizeDebounce },
        getTargetElement: () => document.body,
    })

    return (
        <>
            {showNoScript && <noscript ref={bindNoScriptDOMNode} />}
            {cloneElement(children, triggerProps)}

            <Portal
                show={show}
                ref={bindPortalElement}
                portalClassName={portalClassName}
                getPopupContainer={getPopupContainer}
            >
                {transitionComponentProps ? (
                    <Transition {...transitionComponentProps} visible={show}>
                        {popup}
                    </Transition>
                ) : (
                    <Motion {...motionComponentProps} visible={show}>
                        {popup}
                    </Motion>
                )}
            </Portal>
        </>
    )
}

export default React.memo(Trigger)
