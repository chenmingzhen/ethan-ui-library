import { LiteralUnion } from '@/utils/utilityTypes'
import { ListProps } from '../List'

export type TriggerAction = LiteralUnion<'mousedown' | 'hover', string>

export interface TriggerProps {
    triggerActions: TriggerAction[]
    children: JSX.Element
    portal?: boolean
    animationTypes?: ListProps['animationTypes']
    triggerContainerTag?: keyof HTMLElementTagNameMap
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    defaultVisible?: boolean
    popup: React.ReactNode
    popupClassName?: string
    popupStyle?: React.CSSProperties
    popupExtraProps?: React.DetailedHTMLProps<React.HTMLAttributes<any>, any>
    portalClassName?: string
    bindPopupElement?: React.MutableRefObject<any> | React.RefCallback<any>
    bindTriggerElement?: React.MutableRefObject<any> | React.RefCallback<any>
    getPopupContainer?: () => HTMLElement
    delay?: number
}
