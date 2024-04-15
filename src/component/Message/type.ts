import React from 'react'
import { AlertType } from '../Alert/type'

export type MessagePositionType = 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/**
 * 对外暴露的API
 */
export interface MessageOption {
    /**
     * 关闭Message的回调
     */
    onClose?(): void

    /**
     * Message的位置
     */
    position?: MessagePositionType

    /**
     * Message标题
     */
    title?: string | number

    /**
     * Message额外className
     */
    className?: string

    /** 唯一键ID，可通过此ID更新message的内容 */
    id?: React.Key

    type?: AlertType

    closeable?: boolean

    duration?: number

    content?: React.ReactNode
}

export default interface Message extends MessageOption {
    /**
     * 是否消失
     */
    dismiss?: boolean

    /**
     * 高度 用于dismiss
     */
    h?: number
}

export interface MessageAlertProps {
    closeable: boolean
    onDismiss: (offsetHeight: number) => void
    className: string
    dismiss: boolean
    iconSize: number
    type: AlertType
    children: React.ReactNode
}
