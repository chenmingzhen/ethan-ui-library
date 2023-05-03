import React from 'react'
import { MotionProps, TransitionProps } from '../Motion/type'

export type TriggerAction = 'mousedown' | 'hover' | 'focus'

interface CustomPopupRenderFuncParams {
    visible: boolean
    setPopupElement(element: HTMLElement): void
}

export interface TriggerProps {
    triggerActions?: TriggerAction[]
    children: JSX.Element
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    defaultVisible?: boolean
    portalClassName?: string
    bindTriggerElement?: React.MutableRefObject<any> | React.RefCallback<any>
    bindPortalElement?: React.MutableRefObject<any> | React.RefCallback<any>
    getPopupContainer?: (triggerElement: HTMLElement) => HTMLElement
    /** 使用Motion.Transition渲染Popup */
    transitionPopupProps?: Omit<TransitionProps, 'visible'> & { popup: React.ReactNode }
    /** 使用Motion渲染Popup */
    motionPopupProps?: Omit<MotionProps, 'visible' | 'children'> & { popup: React.ReactNode }
    /** 自定义Popup渲染 */
    customPopupRender?: (params: CustomPopupRenderFuncParams) => React.ReactNode
    /** 判断点击document时,落点是否在Popup上,如果是使用MotionFC，需要在popup元素中手动添加，如果为TransitionFC，有componentKey则会自动注入 */
    componentKey?: string
    mouseEnterDelay?: number
    mouseLeaveDelay?: number
    onTriggerElementResize?: (popupElement: HTMLElement) => void
    onWindowResize?: (popupElement: HTMLElement) => void
    resizeDebounce?: number
    onDescClick?: (evt: MouseEvent) => void
}
