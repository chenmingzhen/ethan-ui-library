export type AlertType = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'loading'

export interface AlertProps {
    className?: string
    style?: React.CSSProperties
    type?: AlertType
    icon?: boolean | Element
    iconSize?: number
    onClose?: ((duration?: number, height?: number) => void) | boolean
    closeItem?: React.ReactNode
    children?: React.ReactNode

    /** @private */
    onDismiss: (duration?: number, height?: number) => void
    /** @private */
    dismiss?: boolean
    /** @private */
    duration?: number
}

export interface AlertInstance {
    offsetHeight(): number
}

export interface ScrollAlertProps extends AlertProps {
    scrollInterval?: number
    /** 关闭所有节点时触发的回调 */
    onClose?(): void
    /** 用于统一设置Alert的样式 勿添加Margin 影响计算值 */
    style?: React.CSSProperties
    className?: string
}
