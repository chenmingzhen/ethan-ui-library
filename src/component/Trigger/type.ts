import React from 'react'
import { MotionProps, TransitionProps } from '../Motion/type'

export type TriggerAction = 'mousedown' | 'hover' | 'focus' | 'click'

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

    /**
     * 判断triggerAction时,鼠标响应点是否在PopupElement或者TriggerElement上。
     * 如果传入该属性:
     *  1.将会自动注入的TriggerElement中。
     *  2.如果使用transitionPopupProps或者motionPopupProps,将会自动注入的PopupElement中，如果使用customPopupRender，需要手动将componentKey注入到PopupElement的data-ck
     */
    componentKey?: string
    /**
     * 是否为链式的componentKey
     * 如组件A的componentKey为KEY_A,鼠标响应点为KEY_A_NEXT。这种情况仍然可判断为处于KEY_A的作用域中,点击KEY_B时，不处于KEY_A的作用域中
     */
    isChainComponentKey?: boolean

    chainKey?: string

    mouseEnterDelay?: number
    mouseLeaveDelay?: number
    onTriggerElementResize?: (popupElement: HTMLElement) => void
    onWindowResize?: (popupElement: HTMLElement) => void
    resizeDebounce?: number
    /** 点击ComponentKey内的内容回调 */
    onDescClick?: (evt: MouseEvent) => void
    /** 点击非ComponentKey内的内容回调 */
    onClickAway?: (evt: MouseEvent) => void
    allowClickTriggerClose?: boolean
}
