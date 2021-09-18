import React from 'react'

export type Align = 'left' | 'right' | 'vertical-left' | 'vertical-right' | 'bottom'

export type Shape = 'card' | 'line' | 'button' | 'bordered' | 'dash' | 'normal'

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

    background?: React.CSSProperties['background']

    border?: React.CSSProperties['border']

    color: React.CSSProperties['color']
}

export interface TabsHeaderProps {
    isVertical: boolean

    collapsed: boolean

    shape: Shape

    tabs: Tab[]

    tabBarExtraContent: React.ReactNode

    onChange(active: number | string): void

    onCollapse?(): void

    border?: React.CSSProperties['border']

    currentActive: string | number

    overflowIcon?: OverflowIcon
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

    background?: React.CSSProperties['background']

    inactiveBackground?: React.CSSProperties['background']

    border?: React.CSSProperties['border']

    color?: React.CSSProperties['color']

    overflowIcon?: OverflowIcon
}

export interface TabsState {
    active: string | number
    collapsed: boolean
}

export interface TabProps {
    background?: React.CSSProperties['background']

    border?: React.CSSProperties['border']

    color?: React.CSSProperties['color']

    children: React.ReactElement

    disabled: boolean

    isVertical: boolean

    id: string | number

    isActive: boolean

    moveToCenter(rect: DOMRect, last: boolean, first: boolean): void

    onClick(id: string | number, isActive: boolean): void

    shape: Shape

    align: Align

    isLast: boolean

    tabMoveMap: React.RefObject<TabMoveMap>
}

export interface TabsPanelProps {
    background?: string

    className?: string

    collapsed?: boolean

    collapsible?: boolean

    color?: string

    children?: React.ReactNode

    isActive?: boolean

    style?: React.CSSProperties

    lazy?: boolean

    id?: string | number

    tab: React.ReactNode

    disabled?: boolean

    border?: React.CSSProperties['border']
}
