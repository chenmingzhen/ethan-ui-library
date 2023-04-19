import { AlertProps } from '../Alert/type'
import { ButtonProps } from '../Button/type'
import { TriggerAction } from '../Trigger/type'

export interface PopoverProps {
    /** @private  */
    isConfirmLoading?: boolean

    placement?: string
    title?: React.ReactNode
    content?: React.ReactNode | ((hide: (e?: number) => void) => React.ReactNode)
    okText?: string
    cancelText?: string
    onVisibleChange?: (visible: boolean) => void
    trigger?: TriggerAction | TriggerAction[]
    visible?: boolean
    children: JSX.Element
    style?: React.CSSProperties
    mouseEnterDelay?: number
    mouseLeaveDelay?: number
    defaultVisible?: boolean
    getPopupContainer?: () => HTMLElement
    className?: string
    /** @deprecated */
    arrowProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    /** @deprecated */
    innerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    popupProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    showArrow?: boolean
    autoAdjustOverflow?: boolean
    animation?: boolean
    destroyOnClose?: boolean
}

interface Text {
    ok: string

    cancel: string
}

export interface ConfirmProps extends PopoverProps {
    buttonProps?: { ok?: Omit<ButtonProps, 'ref'>; cancel: Omit<ButtonProps, 'ref'> }
    /** 按钮文字 */
    text?: Text
    onOk?(): void | Promise<void>
    onCancel?(): void | Promise<void>
    /** icon类型 */
    type?: AlertProps['type']
    /** 确认框的描述 */
    description?: React.ReactNode
}
