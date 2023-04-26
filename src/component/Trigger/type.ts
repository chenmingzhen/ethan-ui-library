import { MotionProps, TransitionProps } from '../Motion/type'

export type TriggerAction = 'mousedown' | 'hover' | 'focus'

export interface TriggerProps {
    triggerActions?: TriggerAction[]
    children: JSX.Element
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    defaultVisible?: boolean
    popup: React.ReactNode
    portalClassName?: string
    bindTriggerElement?: React.MutableRefObject<any> | React.RefCallback<any>
    bindPortalElement?: React.MutableRefObject<any> | React.RefCallback<any>
    getPopupContainer?: () => HTMLElement
    getPopupElement?: () => HTMLElement
    motionComponentProps?: Omit<MotionProps, 'visible' | 'children'>
    transitionComponentProps?: Omit<TransitionProps, 'visible'>
    /** 判断点击document时,落点是否在Popup上,如果是使用MotionFC，需要在popup元素中手动添加，如果为TransitionFC，有componentKey则会自动注入 */
    componentKey?: string
    mouseEnterDelay?: number
    mouseLeaveDelay?: number
    onTriggerElementResize?: () => void
    onWindowResize?: () => void
    resizeDebounce?: number
}
