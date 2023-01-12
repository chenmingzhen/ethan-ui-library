export interface SwitchProps {
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (checked?: boolean) => void
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
    size?: 'small' | 'default' | 'large'
    content?: React.ReactNode[]
    disabled?: boolean
    style?: React.CSSProperties
    className?: string
    /** internal use */
    value?: boolean
}
