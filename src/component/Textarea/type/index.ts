import { PopoverProps } from '@/component/Popover/type'
import { Rule } from '@/component/Rule/type'

export interface TextareaProps
    extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'defaultValue' | 'onChange' | 'width'> {
    rules?: Rule[]
    autoSize?: boolean
    showCount?: boolean
    maxHeight?: string | number
    onEnterPress?: (value: string, evt: React.KeyboardEvent<HTMLTextAreaElement>) => void
    onChange?: (value: string) => void
    rows?: number
    value?: string
    /** 是否可以伸缩高度 */
    resize?: boolean
    trim?: boolean
    defaultValue?: string
    clearable?: boolean
    disabled?: boolean
    tip?: React.ReactNode | ((value: string) => React.ReactNode)
    popoverProps?: Omit<PopoverProps, 'children'>
    className?: string
    style?: React.CSSProperties
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    size?: 'small' | 'default' | 'large'
    border?: boolean
    width?: React.CSSProperties['width']
    autoFocus?: boolean
}
