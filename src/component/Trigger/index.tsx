import React, { cloneElement, useEffect, useMemo, useRef, useState } from 'react'
import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isFunc } from '@/utils/is'
import { isDescendent } from '@/utils/dom/element'
import useResizeObserver from '@/hooks/useResizeObserver'
import { TriggerProps } from './type'
import Portal from '../Portal'
import Motion from '../Motion'

const Trigger: React.FC<TriggerProps> = function (props) {
    const {
        visible,
        children,
        onDescClick,
        componentKey,
        defaultVisible,
        resizeDebounce,
        onWindowResize,
        onVisibleChange,
        mouseEnterDelay,
        mouseLeaveDelay,
        portalClassName,
        motionPopupProps,
        bindPortalElement,
        getPopupContainer,
        customPopupRender,
        bindTriggerElement,
        transitionPopupProps,
        onTriggerElementResize,
        triggerActions = ['mousedown'],
    } = props
    const [showNoScript, updateShowNoScript] = useState(true)
    const [triggerElement, setTriggerElement] = useState<HTMLElement>()
    const mouseTimer = useRef<NodeJS.Timeout>()
    const [popupElement, setPopupElement] = useState<HTMLElement>()
    const [show, updateShow] = useMergedValue({
        defaultStateValue: false,
        options: {
            value: visible,
            defaultValue: defaultVisible,
            onChange: onVisibleChange,
        },
    })

    const clearMouseTimer = useRefMethod(() => {
        if (mouseTimer.current) {
            clearTimeout(mouseTimer.current)
            mouseTimer.current = null
        }
    })

    const handleMouseEnter = useRefMethod((e: React.MouseEvent) => {
        if (children && children.props && children.props.onMouseEnter) {
            children.props.onMouseEnter(e)
        }

        clearMouseTimer()

        if (mouseEnterDelay) {
            mouseTimer.current = setTimeout(() => {
                updateShow(true)
            }, mouseEnterDelay * 1000)
        } else {
            updateShow(true)
        }
    })

    const handleMouseLeave = useRefMethod((e: React.MouseEvent) => {
        clearMouseTimer()

        if (children && children.props && children.props.onMouseLeave) {
            children.props.onMouseLeave(e)
        }
        if (isDescendent(e.relatedTarget as HTMLElement, componentKey)) return
        if (mouseLeaveDelay) {
            mouseTimer.current = setTimeout(() => {
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

        updateShow(!show)
    })

    const handleFocus = useRefMethod((e: React.FocusEvent) => {
        if (children && children.props && children.props.onFocus) {
            children.props.onFocus(e)
        }

        updateShow(true)
    })

    const handleBlur = useRefMethod((e: React.FocusEvent) => {
        if (children && children.props && children.props.onBlur) {
            children.props.onBlur(e)
        }

        updateShow(false)
    })

    const bindNoScriptDOMNode = useRefMethod((dom: HTMLElement) => {
        if (dom) {
            const triggerDOMNode = dom.nextSibling as HTMLElement

            if (isFunc(bindTriggerElement)) {
                bindTriggerElement(triggerDOMNode)
            } else if (bindTriggerElement && Object.prototype.hasOwnProperty.call(bindTriggerElement, 'current')) {
                bindTriggerElement.current = triggerDOMNode
            }

            setTriggerElement(triggerDOMNode)
        }

        updateShowNoScript(false)
    })

    const triggerProps = useMemo<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>(() => {
        const injectEventProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> = {}

        if (triggerActions.includes('hover')) {
            injectEventProps.onMouseEnter = handleMouseEnter
            injectEventProps.onMouseLeave = handleMouseLeave
        }

        if (triggerActions.includes('mousedown')) {
            injectEventProps.onMouseDown = handleMousedown
        }

        if (triggerActions.includes('focus')) {
            injectEventProps.onFocus = handleFocus
            injectEventProps.onBlur = handleBlur
        }

        return injectEventProps
    }, [])

    const handleClickAway = useRefMethod((evt: MouseEvent) => {
        if (!show) return

        const desc = isDescendent(evt.target as HTMLElement, componentKey)
        if (desc) {
            if (onDescClick) {
                onDescClick(evt)
            }

            return
        }

        updateShow(false)
    })

    const handlePopupElementMouseLeave = useRefMethod((e: MouseEvent) => {
        if (!show || e.relatedTarget === triggerElement) return

        updateShow(false)
    })

    useEffect(() => {
        if (!show) return

        const hasMousedownTrigger = triggerActions.includes('mousedown')
        const hasHoverTrigger = triggerActions.includes('hover')

        if (hasMousedownTrigger) {
            /* 捕获阶段执行，避免点击TriggerElement后马上执行document的mousedown */
            document.addEventListener('mousedown', handleClickAway, true)
        }

        if (hasHoverTrigger && popupElement) {
            popupElement.addEventListener('mouseleave', handlePopupElementMouseLeave)
        }

        return () => {
            if (hasMousedownTrigger) {
                document.removeEventListener('mousedown', handleClickAway)
            }

            if (hasHoverTrigger && popupElement) {
                popupElement.removeEventListener('mouseleave', handlePopupElementMouseLeave)
            }
        }
    }, [show, popupElement])

    const handleTriggerElementResize = useRefMethod(() => {
        if (onTriggerElementResize) {
            onTriggerElementResize(popupElement)
        }
    })

    const handleWindowsResize = useRefMethod(() => {
        if (onWindowResize) {
            onWindowResize(popupElement)
        }
    })

    useResizeObserver({
        watch: !!(onTriggerElementResize && show),
        onResize: handleTriggerElementResize,
        options: { direction: 'xy', callbackDebounce: resizeDebounce },
        getTargetElement: () => triggerElement,
    })

    useResizeObserver({
        watch: !!(onWindowResize && show),
        onResize: handleWindowsResize,
        options: { direction: 'xy', callbackDebounce: resizeDebounce },
        getTargetElement: () => document.body,
    })

    useEffect(() => clearMouseTimer, [])

    const wrapGetPopupContainer = useRefMethod(() => getPopupContainer?.(triggerElement))

    function buildPortalContent() {
        if (transitionPopupProps) {
            const { popup, ...other } = transitionPopupProps

            return (
                <Motion.Transition {...other} data-ck={componentKey} visible={show} bindMotionElement={setPopupElement}>
                    {popup}
                </Motion.Transition>
            )
        }

        if (motionPopupProps) {
            const { popup, ...other } = motionPopupProps

            return (
                <Motion {...other} visible={show} bindMotionElement={setPopupElement}>
                    {popup}
                </Motion>
            )
        }

        if (isFunc(customPopupRender)) {
            return customPopupRender({ visible: show, setPopupElement })
        }

        return null
    }

    return (
        <>
            {showNoScript && <noscript ref={bindNoScriptDOMNode} />}
            {cloneElement(children, triggerProps)}

            <Portal
                show={show}
                ref={bindPortalElement}
                portalClassName={portalClassName}
                getPopupContainer={getPopupContainer ? wrapGetPopupContainer : undefined}
            >
                {buildPortalContent()}
            </Portal>
        </>
    )
}

export default React.memo(Trigger)
