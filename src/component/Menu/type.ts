import React from 'react'

export type Mode = 'inline' | 'vertical' | 'horizontal' | 'vertical-auto'

export interface BaseData {
    key: string | number

    title?: React.ReactNode

    disabled?: boolean

    linkKey?: string

    target?: string

    children?: BaseData[]
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
export interface MenuProps {
    style?: React.CSSProperties

    className?: string

    data: BaseData[]

    disabled?: (data: BaseData) => boolean

    defaultActiveKey?: string | number

    defaultOpenKeys?: (string | number)[]

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

    open: boolean

    handleScrollPosUpdate?(): void
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

    handleScrollPosUpdate?(): void
}
