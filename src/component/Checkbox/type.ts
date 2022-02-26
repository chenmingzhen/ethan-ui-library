import { KeyGen } from '@/type/Group'
import List, { DatumListProps } from '@/utils/Datum/List'
import React from 'react'
import CheckboxGroup from './Group'

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

export interface CheckboxGroupProps<T = string>
    extends Pick<DatumListProps<T>, 'format' | 'onChange' | 'value' | 'prediction' | 'disabled'> {
    /** 垂直布局 */
    block?: boolean
    data?: T[]
    renderItem?: keyof T | ((item: T) => React.ReactNode)
    className?: string
    keygen?: KeyGen<T>
}

export interface ICheckboxGroupProps<T = string> extends CheckboxGroupProps<T> {
    /** 设计缺陷:此处是内部使用必选的，不对外暴露 */
    datum?: List<T>
}

export interface CheckboxComponent extends React.ComponentClass<CheckItemProps> {
    Group: typeof CheckboxGroup
}
