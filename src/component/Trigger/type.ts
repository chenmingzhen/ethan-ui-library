import { LiteralUnion } from '@/utils/utilityTypes'
import { MotionProps, TransitionProps } from '../Motion/type'

export type TriggerAction = LiteralUnion<'mousedown' | 'hover', string>

export interface TriggerProps {
    triggerActions?: TriggerAction[]
    children: JSX.Element
    portal?: boolean
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    defaultVisible?: boolean
    popup: React.ReactNode
    portalClassName?: string
    bindTriggerElement?: React.MutableRefObject<any> | React.RefCallback<any>
    getPopupContainer?: () => HTMLElement
    delay?: number
    motionComponentProps?: Omit<MotionProps, 'visible' | 'children'>
    transitionComponentProps?: Omit<TransitionProps, 'visible'>
    dataId?: string
}
