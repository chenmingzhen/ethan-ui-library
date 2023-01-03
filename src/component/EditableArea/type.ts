import { PopoverProps } from '../Popover'
import { TextareaProps } from '../Textarea/type'

export interface EditableProps
    extends Pick<PopoverProps, 'getPopupContainer'>,
        Pick<TextareaProps, 'onBlur' | 'onFocus'> {
    width?: number | string
    style?: React.CSSProperties
    onChange?: (value: string) => void
    defaultValue?: string
    value?: string
    className?: string
    border?: boolean
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    maxHeight?: number | string
    trim?: boolean
}
