import { MotionProps, TransitionProps } from '../Motion/type'

export type TriggerAction = 'mousedown' | 'hover'

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
    componentKey?: string
    mouseEnterDelay?: number
    mouseLeaveDelay?: number
    onTriggerElementResize?: () => void
    onWindowResize?: () => void
    resizeDebounce?: number
}
