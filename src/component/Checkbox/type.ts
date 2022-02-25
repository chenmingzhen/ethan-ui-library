import { KeyGen } from '@/type/Group'
import List from '@/utils/Datum/List'
import React from 'react'

export type CheckType = 'radio' | 'switch' | 'checkbox'

export interface CheckHandlerContext {
    onGroupCallback?: (value: any, checked: boolean) => void

    checked?: (htmlValue) => boolean
}

export interface CheckItemProps extends Omit<CheckHandlerContext, 'checked'> {
    checked?: boolean | 'indeterminate' | CheckHandlerContext['checked']
    /** 选中时返回值 */
    htmlValue?: any

    onChange?: (value: any, checked?: boolean, index?: number) => void

    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
    size?: 'small' | 'default' | 'large'
    /** Switch中用到 */
    content?: React.ReactNode[]
    disabled?: boolean
    style?: React.CSSProperties
    className?: string
}

export interface ICheckedItemProps extends CheckItemProps {
    value?: any

    index?: number
}

export interface CheckItemState {
    checked: boolean
}

export interface CheckboxGroupProps<T = any> {
    /** 垂直布局 */
    block?: boolean
    data?: T[]
    renderItem?: (item: T) => React.ReactNode | keyof T
    className?: string
    keygen?: KeyGen<T>
}

export interface ICheckboxGroupProps<T = any> extends CheckboxGroupProps<T> {
    datum: List
}
