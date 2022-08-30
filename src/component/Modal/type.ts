import React from 'react'
import { ButtonProps } from '../Button'

export interface ModalProps {
    autoFocusButton?: boolean
    /* ModalBody拓展样式 */
    bodyStyle?: React.CSSProperties
    okButtonProps?: ButtonProps
    cancelButtonProps?: ButtonProps
    className?: string
    /* 渲染的目标节点 */
    container?: HTMLElement | (() => HTMLElement)
    /* 关闭时是否销毁元素 */
    destroyOnUnmounted?: boolean
    /* 是否支持esc关闭 */
    esc?: boolean
    /* 外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡 */
    events?: any
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
    /* 最外层扩展样式 */
    style?: React.CSSProperties
    /* 弹出层的标题 */
    title?: string
    /* Modal距离顶部的位置 */
    top?: string
    /* Modal title 显示状态icon */
    type?: 'info' | 'success' | 'warning' | 'error' | 'normal' | 'default' | 'confirm'
    /* 为 true 时，使用 ReactDOM.createPortal 创建弹出层，为 false 时，使用 ReactDOM.render */
    usePortal?: boolean
    /* 是否显示 */
    visible?: boolean
    /* 对话框宽度 */
    width?: number
    /* 对话框高度 */
    height?: number
    /* 层级 */
    zIndex?: number
    /* 是否开启 zoom 动画效果 */
    zoom?: boolean
    /** 等价于children */
    content?: React.ReactNode
}

export interface IModalProps extends ModalProps {
    /* 内部使用 */
    from?: string
}

export interface MethodModalProps extends IModalProps {
    onOk?: () => void
    onCancel?: () => void
    text?: { ok?: React.ReactNode; cancel?: React.ReactNode }
}
