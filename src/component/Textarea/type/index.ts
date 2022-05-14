import { InputAbleProps } from '@/component/Form/inputable'
import { InputBorderProps } from '@/hoc/inputBorder'
import { TrimProps } from '@/hoc/trim'

export interface TextareaProps
    extends InputAbleProps,
        Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'defaultValue' | 'onChange'>,
        TrimProps,
        InputBorderProps {
    autoSize?: boolean
    showCount?: boolean
    maxHeight?: string|number
    onEnterPress?: (value: string, evt: React.KeyboardEvent<HTMLTextAreaElement>) => void
    onChange?: (string) => void
    rows?: number
    value?: string
    /** 是否可以伸缩高度 */
    resize?: boolean
}
