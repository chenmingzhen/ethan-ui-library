import React from 'react'
import { ButtonProps } from '../Button/type'

export interface ModalProps {
    /* ModalBody拓展样式 */
    bodyStyle?: React.CSSProperties
    /* 渲染的目标节点 */
    getPopupContainer?: () => HTMLElement
    /* 关闭时是否销毁元素 */
    destroyOnClose?: boolean
    /* 是否支持esc关闭 */
    esc?: boolean
    /* 底部内容 */
    footer?: React.ReactNode
    /* 是否隐藏关闭按钮 */
    hideClose?: boolean
    /* 遮罩背景色，设置后透明度将失效 */
    maskBackground?: string
    /* 点击遮罩层是否关闭对话框 */
    maskCloseAble?: boolean
    /* 遮罩层透明度 */
    maskOpacity?: number
    /* 是否可移动 */
    moveable?: boolean
    /* 模态框关闭回调 */
    onClose?(): void
    /* 内容内边距 */
    padding?: number
    /* 弹出位置 */
    position?: 'top' | 'right' | 'bottom' | 'left'
    /* 是否可调整大小 */
    resizable?: boolean
    /* Modal 的根元素类名, 为遮罩层的父元素 */
    rootClassName?: string
    /** 遮罩样式 */
    maskStyle?: React.CSSProperties
    /** 遮罩类名 */
    maskClassName?: string
    /* 最外层扩展样式 */
    style?: React.CSSProperties
    /* 弹出层的标题 */
    title?: string
    /* Modal距离顶部的位置 */
    top?: string
    /* 是否显示 */
    visible?: boolean
    /* 对话框宽度 */
    width?: number
    /* 对话框高度 */
    height?: number
    /* 层级 */
    zIndex?: number
    /** 图标类型 */
    type?: 'info' | 'success' | 'warning' | 'error' | 'normal' | 'default' | 'confirm'

    /** @private */
    from?: string
    content?: React.ReactNode
}

export interface ModalPanelProps extends Omit<ModalProps, 'getPopupContainer'> {
    className?: string
}

export interface MethodModalProps
    extends Omit<ModalProps, 'onClose' | 'type' | 'visible' | 'children' | 'destroyOnClose'> {
    text?: { ok?: React.ReactNode; cancel?: React.ReactNode }
    onOk?: () => void
    onCancel?: () => void
    okButtonProps?: ButtonProps
    cancelButtonProps?: ButtonProps
}
