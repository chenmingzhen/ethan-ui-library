import React from 'react'

export type Align = 'left' | 'right' | 'vertical-left' | 'vertical-right' | 'bottom'

export type Shape = 'card' | 'line' | 'button' | 'bordered' | 'dash'

export interface Tab {
    id: string | number

    isActive: boolean

    tab

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
}
