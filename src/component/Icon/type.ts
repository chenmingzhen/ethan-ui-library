export interface IconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    children?: React.ReactNode
    prefix?: string
    type?: 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
    name?: string
    style?: React.CSSProperties
    fontFamily?: string
    fontSize?: string
    ext?: string
}
