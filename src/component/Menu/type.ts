import React from 'react'
import { TriggerAction } from '../Trigger/type'
import { MoreContextProps } from '../More/type'

export type Mode = 'inline' | 'vertical' | 'horizontal'

export interface MenuBaseData {
    key: React.Key
    title?: React.ReactNode
    disabled?: boolean
    children?: MenuBaseData[]
    type?: string
    className?: string
}
type MenuWithExtraData<T extends Record<string, any>> = MenuBaseData & T
export type RecursiveMenuWithExtraData<T extends Record<string, any> = MenuBaseData> = MenuWithExtraData<T> & {
    children?: RecursiveMenuWithExtraData<T>[]
}

export type UpdateActive = (activePath: string) => void
export type UpdateOpen = () => void
export type UpdateInPath = () => void

export interface MenuContext {
    bindItem?: (
        id: string,
        key: React.Key,
        updateActive: UpdateActive,
        updateOpen: UpdateOpen,
        updateInPath: UpdateInPath
    ) => void

    unbindItem?: (id: string) => void

    checkActive?: (id: string) => boolean

    checkOpen?: (id: string) => boolean

    checkInPath?: (id: string) => boolean
}
export interface MenuProps<T extends Record<string, any> = Record<string, any>> {
    style?: React.CSSProperties
    className?: string
    data: RecursiveMenuWithExtraData<T>[]
    defaultActiveKey?: React.Key
    defaultOpenKeys?: React.Key[]
    activeKey?: React.Key
    /** 展开的菜单(受控) */
    openKeys?: string[] | number[]
    /** 每一层缩进宽度 */
    inlineIndent?: number
    mode?: Mode
    /** 当点击SubMenu或MenuItem时的回调 */
    onClick?(data: RecursiveMenuWithExtraData<T>, path: React.Key[]): void
    renderItem?: (data: RecursiveMenuWithExtraData<T>) => React.ReactNode
    onOpenChange?(keys: React.Key[]): void
    subMenuTriggerActions?: Exclude<TriggerAction, 'focus' | 'mousedown'>[]
    /** 当选中时的回调 */
    onSelect?: (dataItem: RecursiveMenuWithExtraData<T>, path: React.Key[]) => void
}

export interface MenuItemProps extends Partial<MoreContextProps> {
    dataItem: RecursiveMenuWithExtraData
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

    onLeafClick(dataItem: RecursiveMenuWithExtraData): void
    onInlineSubMenuTitleClick: (dataItem: RecursiveMenuWithExtraData, open: boolean) => void

    onMouseEnterOpen: (dataItem: RecursiveMenuWithExtraData) => void
    onMouseLeaveClose: (dataItem: RecursiveMenuWithExtraData) => void
    onMouseClickToggle: (dataItem: RecursiveMenuWithExtraData, open: boolean) => void
    subMenuTriggerActions: MenuProps['subMenuTriggerActions']

    /** 一般情况下,action由副作用触发,当从More隐藏状态到展示状态时,需要手动触发action. */
    manualExecuteAction: () => void
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
    dataItem: RecursiveMenuWithExtraData
    children: React.ReactNode
}

export interface InlineTriggerProps {
    visible: boolean
    path: React.Key[]
    popupContent: React.ReactNode
    children: React.ReactNode
    dataItem: RecursiveMenuWithExtraData
    className: string
}

export interface VerticalTriggerProps {
    visible: boolean
    path: React.Key[]
    popupContent: React.ReactNode
    children: React.ReactNode
    dataItem: RecursiveMenuWithExtraData
    className: string
}

export interface DirectionalTriggerProps {
    visible: boolean
    path: React.Key[]
    popupContent: React.ReactNode
    children: React.ReactNode
    dataItem: RecursiveMenuWithExtraData
    className: string
    direction: 'vertical' | 'horizontal'
}

export interface MenuItemGroupProps extends Partial<MoreContextProps> {
    dataItem: RecursiveMenuWithExtraData
    children: React.ReactNode
}
