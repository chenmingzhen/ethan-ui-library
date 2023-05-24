import React from 'react'
import { TriggerAction } from '../Trigger/type'

export type Mode = 'inline' | 'vertical' | 'horizontal' | 'vertical-auto'

export interface MenuBaseData {
    key: React.Key
    title?: React.ReactNode
    disabled?: boolean
    children?: MenuBaseData[]
    type?: string
}

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
    theme?: 'light' | 'dark'
    subMenuTriggerActions?: Exclude<TriggerAction, 'focus' | 'mousedown'>[]
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
    dataItem: MenuBaseData
    children: React.ReactNode
}

export interface MenuItemTriggerActions {
    updateActive: (activePath: string) => void
    updateOpen: () => void
    updateInPath: () => void
}

export interface MenuPathRegisterContextProps {
    registerPath(key: React.Key, trigger: MenuItemTriggerActions): void
    unregisterPath(key: React.Key): void
}

export interface MenuEventRegisterContextProps {
    registerEvents(key: React.Key): void
    unregisterEvents(key: React.Key): void
}

export interface MenuContextProps {
    registerMenuItem(key: React.Key, options: RegisterMenuItemOptions): void
    unregisterMenuItem(key: React.Key): void
    registerSubMenu(key: React.Key, options: RegisterSubMenuOptions): void
    unregisterSubMenu(key: React.Key): void
    registerMenuItemGroup(key: React.Key, options: RegisterMenuItemGroupOptions): void
    unregisterMenuItemGroup(key: React.Key): void

    mode: MenuProps['mode']
    inlineIndent: MenuProps['inlineIndent']

    onMenuItemClick(dataItem: MenuBaseData): void

    subMenuTriggerActions: MenuProps['subMenuTriggerActions']

    onInlineSubMenuClick: (dataItem: MenuBaseData, open: boolean) => void
    onDirectionalToggleOpenKeys: (dataItem: MenuBaseData, open: boolean) => void
}

export interface PathContextProps {
    path: React.Key[]
}

export interface MenuItemActions {
    updateActive(active: boolean): void
}

export interface SubMenuActions {
    updateOpen(open: boolean): void
    updateInPath(inPath: boolean): void
}

export interface RegisterMenuItemOptions extends MenuItemActions {
    path: React.Key[]
}

export interface RegisterSubMenuOptions extends SubMenuActions {
    path: React.Key[]
}

export interface RegisterMenuItemGroupOptions {
    path: React.Key[]
}

export interface SubMenuProps {
    dataItem: MenuBaseData
    children: React.ReactNode
}

export interface InlineTriggerProps {
    visible: boolean
    path: React.Key[]
    popupContent: React.ReactNode
    children: React.ReactNode
    dataItem: MenuBaseData
    className: string
}

export interface VerticalTriggerProps {
    visible: boolean
    path: React.Key[]
    popupContent: React.ReactNode
    children: React.ReactNode
    dataItem: MenuBaseData
    className: string
}

export interface MenuItemGroupProps {
    dataItem: MenuBaseData
}
