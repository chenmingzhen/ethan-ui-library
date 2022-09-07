import { MoveableProps } from '@/hoc/moveable'
import { ResizableProps } from '@/hoc/resizable'

import React from 'react'

export interface CardProps extends MoveableProps, ResizableProps {
    /** 是否显示阴影 */
    shadow?: boolean | 'hover'
    /** 初始折叠状态（仅在 collapsible 为 true 时有效） */
    defaultCollapsed?: boolean
    /** 是否可折叠，'bottom' 表示从下方点击折叠 */
    collapsible?: boolean
    /** 手风琴下控制展开的值 */
    id?: string | number
    /** 最外层样式名 */
    className?: string
    /** 是否折叠，用于受控状态 */
    collapsed?: boolean
    /** 折叠状态改变时回调事件 */
    onCollapse?: (e: boolean) => void
    /** 最外层扩展样式 */
    style?: React.CSSProperties
    /** ref 穿透多重转发 */
    forwardedRef?: React.LegacyRef<HTMLDivElement>
}

export interface CardBodyProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string

    // 初始折叠状态（仅在 collapsible 为 true 时有效）
    defaultCollapsed?: boolean

    // 最外层扩展样式
    style?: React.CSSProperties
}

export interface CardContext {
    // 折叠回调
    onCollapse(): void
    // 是否可折叠，'bottom' 表示从下方点击折叠
    collapsible: boolean | 'bottom'
    // 是否折叠
    collapsed: boolean

    formStatus: string

    onSubmit(target: EventTarget): void

    setFormStatus(status: string): void
}

export interface CardFooterProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    // 对齐方式
    align?: 'center' | 'right'

    className?: string
}

export interface CardHeaderProps {
    align?: string

    className?: string

    style?: React.CSSProperties

    children?: React.ReactNode
}

export interface CardSubmitProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    loading?: boolean
}
