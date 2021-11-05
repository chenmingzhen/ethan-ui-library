import React from 'react'

export type Mode = 'inline' | 'vertical' | 'horizontal' | 'vertical-auto'

export interface MenuBaseData {
    key: string | number

    title?: React.ReactNode

    disabled?: boolean

    linkKey?: string

    target?: string

    children?: MenuBaseData[]
}

export type Theme = 'light' | 'dark'

export type UpdateActive = (activePath: string) => void

export type UpdateOpen = () => void

export type UpdateInPath = () => void

export interface MenuContext {
    bindItem?: (
        id: string,
        key: string | number,
        updateActive: UpdateActive,
        updateOpen: UpdateOpen,
        updateInPath: UpdateInPath
    ) => void

    unbindItem?: (id: string) => void

    checkActive?: (id: string) => boolean

    checkOpen?: (id: string) => boolean

    checkInPath?: (id: string) => boolean
}
export interface MenuProps<T = MenuBaseData> {
    style?: React.CSSProperties

    className?: string

    data: T[]

    disabled?: (data: T) => boolean

    defaultActiveKey?: string | number

    defaultOpenKeys?: (string | number)[]

    /** 展开的菜单(受控) */
    openKeys?: string[] | number[]

    /** 每一层缩进宽度 */
    inlineIndent?: number

    mode?: Mode

    onClick?(data: T): void

    renderItem?: (data: T) => React.ReactNode

    onOpenChange?(keys: (string | number)[]): void

    theme: Theme
}

export interface MenuListProps {
    bottomLine?: number

    topLine?: number

    className?: string

    inlineIndent?: number

    level?: number

    data: MenuBaseData[]

    mode?: Mode

    onClick: (id: string | number, data: MenuBaseData) => void

    path?: string | number

    renderItem: (data: MenuBaseData) => React.ReactNode

    style?: React.CSSProperties

    toggleOpenKeys: (id: string | number, open: boolean) => void

    open: boolean

    handleScrollPosUpdate?(): void
}

export interface MenuItemProps extends MenuContext {
    bottomLine?: number

    topLine?: number

    data: MenuBaseData

    index: number

    inlineIndent?: number

    level?: number

    mode: Mode

    onClick: (id: string | number, data: MenuBaseData) => void

    path?: string | number

    renderItem: (data: MenuBaseData) => React.ReactNode

    toggleOpenKeys: (id: string | number, open: boolean) => void

    handleScrollPosUpdate?(): void
}
