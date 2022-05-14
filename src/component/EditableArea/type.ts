import { PopoverProps } from '../Popover'

export interface EditableProps extends Pick<PopoverProps, 'getPopupContainer'> {
    width?: number | string
    style?: React.CSSProperties
    onBlur?: (e: React.FocusEventHandler<HTMLTextAreaElement>) => void
    onChange?: (value: string) => void
    value?: string
    className?: string
    bordered?: boolean
    placeholder?: string
    onFocus?: () => void
    disabled?: boolean
    clearable?: boolean
    maxHeight?: number | string
}
