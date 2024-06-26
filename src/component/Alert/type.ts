export type AlertType = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'loading'

export interface AlertProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string
    style?: React.CSSProperties
    type?: AlertType
    icon?: boolean | Element
    iconSize?: number
    onClose?: (() => void) | boolean
    closeItem?: React.ReactNode
    children?: React.ReactNode
    duration?: number

    /**
     * @private Message使用
     */
    onInternalClose?: () => void
}

export interface ScrollAlertProps extends AlertProps {
    scrollInterval?: number
    /** 关闭所有节点时触发的回调 */
    onClose?(): void
    /** 用于统一设置Alert的样式 勿添加Margin 影响计算值 */
    style?: React.CSSProperties
    className?: string
}
