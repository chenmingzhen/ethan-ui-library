import React, { ReactNode } from 'react'
import { ButtonProps } from '../Button/type'

export interface DropDownData {
    content: ReactNode
    key: React.Key
    disabled?: boolean
    children?: DropDownData[]
    [customKey: string]: string | boolean | ReactNode | Array<DropDownData>[]
}

export interface DropDownProps {
    portal?: boolean
    placeholder?: React.ReactNode
    className?: string
    visible?: boolean
    onVisibleChange?(visible: boolean): void
    type?:
        | 'primary'
        | 'default'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'error'
        | 'danger'
        | 'link'
        | 'loading'
    data: DropDownData[]
    disabled?: boolean
    trigger?: 'hover' | 'click'
    width?: number
    animation?: boolean
    listClassName?: string
    size?: ButtonProps['size']
    outline?: ButtonProps['outline']
    onClick?(data): void
    position?:
        | 'right-top'
        | 'bottom-left'
        | 'bottom-right'
        | 'left-top'
        | 'right-bottom'
        | 'top-left'
        | 'top-right'
        | 'left-bottom'
        | 'auto'
    style?: React.CSSProperties
    renderItem?(data: DropDownData): React.ReactNode | string
    columns?: number
    buttonProps?: Omit<ButtonProps, 'children' | 'ref'>
    showCaret?: boolean
}

export interface IDropDownProps extends DropDownProps {
    isSub?: boolean
    clickHoverItemDismiss?(): void
}
