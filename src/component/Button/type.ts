export interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    children?: React.ReactNode
    className?: string
    disabled?: boolean
    href?: string
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
    outline?: boolean
    size?: 'large' | 'default' | 'small'
    space?: string
    style?: React.CSSProperties
    text?: boolean
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'link'
    loading?: boolean
    htmlType?: 'button' | 'submit' | 'reset'
    shape?: 'round' | 'circle'
    target?: string
    autoFocus?: boolean
}

export interface ButtonGroupProps {
    size?: 'large' | 'default' | 'small'
    outline?: boolean
    type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link'
    children: React.ReactNode
    className?: string
}
