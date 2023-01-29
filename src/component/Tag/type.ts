export interface TagInputProps {
    value?: string
    onBlur?: (value: string, e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => void
    onChange?: (value: string) => void
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export interface TagProps {
    type?:
        | 'primary'
        | 'default'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'error'
        | 'danger'
        | 'link'
        | 'loading'

    children?: React.ReactNode
    onClick?(e: React.MouseEvent): void
    onClose?: boolean | ((e: React.MouseEvent) => void)
    backgroundColor?: string
    /** Tag编辑完成时触发该事件（children 必须为 string） */
    onCompleted?(value: string): void
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
}
