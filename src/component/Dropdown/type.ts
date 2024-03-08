import React, { ReactNode } from 'react'
import { MenuProps } from '../Menu/type'

export interface DropDownData {
    content: ReactNode
    key: React.Key
    disabled?: boolean
    children?: DropDownData[]
    [customKey: string]: string | boolean | ReactNode | Array<DropDownData>[]
}

type DropdownPosition =
    | 'right-top'
    | 'bottom-left'
    | 'bottom-right'
    | 'left-top'
    | 'right-bottom'
    | 'top-left'
    | 'top-right'
    | 'left-bottom'
    | 'auto'

interface OverlayRenderParams {
    menu: React.ReactNode
}
type OverlayRender = (params: OverlayRenderParams) => React.ReactNode
export interface DropdownProps {
    className?: string
    visible?: boolean
    onVisibleChange?(visible: boolean): void
    getPopupContainer?: (triggerElement: HTMLElement) => HTMLElement
    menu?: MenuProps
    disabled?: boolean
    trigger?: 'hover' | 'click'
    position?: DropdownPosition
    style?: React.CSSProperties
    children: JSX.Element

    overlay?: OverlayRender
}
