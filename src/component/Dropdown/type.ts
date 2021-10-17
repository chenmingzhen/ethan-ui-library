import React, { ReactNode } from 'react'
import { ButtonProps } from '../Button'

export interface ComplicatedDropDownData {
    content?: ReactNode

    onClick?(): void

    target?: string

    url?: string

    disabled?: boolean

    children?: ComplicatedDropDownData[]

    [customKey: string]: string | boolean | ReactNode | Array<ComplicatedDropDownData>[]
}

export type DropDownData = React.ReactNode | ComplicatedDropDownData

export interface DropDownProps {
    absolute?: boolean

    placeholder?: React.ReactNode

    className?: string

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

    buttonProps?: Omit<ButtonProps, 'children'>
}

export interface IDropDownProps extends DropDownProps {
    /** 内部使用 */
    renderPlaceholder?(disabled: boolean, handleFocus: () => void): ReactNode

    isSub?: boolean
}

export interface ItemProps {
    itemClassName?: string

    renderItem: ((data: ComplicatedDropDownData) => React.ReactNode | string) | 'content'

    width?: number

    columns?: number

    data: ComplicatedDropDownData

    onClick?(data: ComplicatedDropDownData): void
}
