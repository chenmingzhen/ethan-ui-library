import React, { cloneElement, useEffect, useMemo, useRef, useState } from 'react'
import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isFunc } from '@/utils/is'
import { TriggerProps } from './type'
import Portal from '../Portal'
import AnimationList from '../List'

const Trigger: React.FC<TriggerProps> = function (props) {
    const {
        triggerActions,
        children,
        portal,
        animationTypes,
        triggerContainerTag,
        defaultVisible,
        visible,
        onVisibleChange,
        popup,
        delay,
        popupClassName,
        popupStyle,
        popupExtraProps = {},
        portalClassName,
        getPopupContainer,
        bindPopupElement,
        bindTriggerElement,
    } = props
    const [showNoScript, updateShowNoScript] = useState(true)
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

    const bindPopupDOMNode = useRefMethod((dom) => {
        if (isFunc(bindPopupElement)) {
            bindPopupElement(dom)
        } else if (bindPopupElement && Object.prototype.hasOwnProperty.call(bindPopupElement, 'current')) {
            bindPopupElement.current = dom
        }
    })

    const bindNoScriptDOMNode = useRefMethod((dom: HTMLElement) => {
        if (dom) {
            const triggerDOMNode = dom.nextSibling as HTMLElement

            if (isFunc(bindTriggerElement)) {
                bindTriggerElement(triggerDOMNode)
            } else if (bindTriggerElement && Object.prototype.hasOwnProperty.call(bindTriggerElement, 'current')) {
                bindTriggerElement.current = triggerDOMNode
            }
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

    const handleClickAway = useRefMethod(() => {
        updateShow(false)
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
    }, [show])

    return (
        <>
            <Portal show={show} portal={portal} rootClass={portalClassName} getContainer={getPopupContainer}>
                <AnimationList
                    {...popupExtraProps}
                    tag={triggerContainerTag}
                    animationTypes={animationTypes}
                    show={show}
                    className={popupClassName}
                    style={popupStyle}
                    getRef={bindPopupDOMNode}
                >
                    {popup}
                </AnimationList>
            </Portal>

            {showNoScript && <noscript ref={bindNoScriptDOMNode} />}
            {cloneElement(children, triggerProps)}
        </>
    )
}

export default React.memo(Trigger)
