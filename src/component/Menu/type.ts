import React from 'react'

export type Mode = 'inline' | 'vertical' | 'horizontal' | 'vertical-auto'

export interface BaseData {
    key: string | number

    title: React.ReactNode

    disabled?: boolean

    // linkKey?: React.ReactNode | ((data: BaseData) => React.ReactNode)

    linkKey?: string

    target?: string

    onClick?(data: BaseData): void

    children?: BaseData[]
}

export type Theme = 'light' | 'dark'

export interface MenuContext {
    bindItem?: (
        id: string | number,
        updateActive: any,
        updateOpen: any,
        updateInPath: any
    ) => ((id: string | number) => boolean)[]
    unbindItem?: (id: string | number) => void
}
export interface MenuProps {
    style?: React.CSSProperties

    className?: string

    // active?: ((data: BaseData) => string | number) | string | number

    data: BaseData[]

    disabled?: (data: BaseData) => boolean

    defaultOpenKeys?: string[] | number[]

    /** 展开的菜单(受控) */
    openKeys?: string[] | number[]

    /** 每一层缩进宽度 */
    inlineIndent?: number

    mode?: Mode

    onClick?(data: BaseData): void

    renderItem?: (data: BaseData) => React.ReactNode

    onOpenChange?(keys: (string | number)[]): void

    theme: Theme
}

export interface MenuListProps {
    bottomLine?: number

    topLine?: number

    className?: string

    inlineIndent?: number

    level?: number

    data: BaseData[]

    mode?: Mode

    onClick: (id: string | number, data: BaseData) => void

    path?: string | number

    renderItem: (data: BaseData) => React.ReactNode

    style?: React.CSSProperties

    toggleOpenKeys: (id: string | number, open: boolean) => void

    toggleDuration?: number

    open: boolean
}

export interface MenuItemProps extends MenuContext {
    bottomLine?: number

    topLine?: number

    data: BaseData

    index: number

    inlineIndent?: number

    level?: number

    mode: Mode

    onClick: (id: string | number, data: BaseData) => void

    path?: string | number

    renderItem: (data: BaseData) => React.ReactNode

    toggleOpenKeys: (id: string | number, open: boolean) => void
}
