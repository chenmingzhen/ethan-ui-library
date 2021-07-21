import { AlertType } from '../Alert/alert'

export default interface Message {
    id?: string

    /**
     * message 类型
     */
    type?: AlertType

    /**
     * message 内容
     */
    content?: React.ReactNode

    /**
     * 是否消失
     */
    dismiss?: boolean

    /**
     * 高度 用于dismiss
     */
    h?: number

    /**
     * Message 标题
     */
    title?: string | number

    className?: string

    /**
     * Message出现的位置
     */
    position?: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

    onClose?(): void

    /**
     * Message显示时长
     */
    duration?: number
}
