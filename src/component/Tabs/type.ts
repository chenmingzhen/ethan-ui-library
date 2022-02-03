import React from 'react'

export type Align = 'left' | 'right' | 'vertical-left' | 'vertical-right' | 'bottom'

export type Shape = 'card' | 'line' | 'button' | 'bordered' | 'dash'

export type OverflowIcon = 'scroll' | 'more'

export type TabMoveMap = Map<Tab['id'], () => void>

export interface Tab {
    id: string | number

    isActive: boolean

    tab: React.ReactNode

    isVertical: boolean

    align: Align

    shape: Shape

    isLast: boolean

    disabled: boolean

    tabStyle?: React.CSSProperties

    activeTabStyle?: React.CSSProperties

    border?: string

    background?: string

    color?: string
}

export interface TabsHeaderProps {
    isVertical: boolean

    collapsed: boolean

    shape: Shape

    tabs: Tab[]

    tabBarExtraContent: React.ReactNode

    onChange(active: number | string): void

    onCollapse?(): void

    currentActive: string | number

    overflowIcon?: OverflowIcon

    hrBorderColor?: string
}

export interface TabsProps {
    active?: string | number

    align?: Align

    className?: string

    collapsible?: boolean

    defaultActive?: string | number

    defaultCollapsed?: boolean

    onChange?(activi: string | number): void

    shape?: Shape

    style?: React.CSSProperties

    tabBarExtraContent?: React.ReactNode

    lazy?: boolean

    overflowIcon?: OverflowIcon
}

export interface TabsState {
    active: string | number
    collapsed: boolean
}

export interface TabProps {
    children: React.ReactNode

    disabled: boolean

    isVertical: boolean

    id: string | number

    isActive: boolean

    moveToCenter(rect: DOMRect, last: boolean, first: boolean): void

    onClick(id: string | number, isActive: boolean): void

    shape: Shape

    align: Align

    isLast: boolean

    tabMoveMap: TabMoveMap

    tabStyle?: React.CSSProperties

    activeTabStyle?: React.CSSProperties

    border?: string

    background?: string

    color?: string
}

export interface TabsPanelProps {
    className?: string

    children?: React.ReactNode

    isActive?: boolean

    style?: React.CSSProperties

    id?: string | number

    tab: React.ReactNode

    disabled?: boolean

    tabStyle?: React.CSSProperties

    activeTabStyle?: React.CSSProperties

    border?: string

    background?: string
}
