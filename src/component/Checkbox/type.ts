import { KeyGen } from '@/type/Group'
import List, { DatumListProps } from '@/utils/Datum/List'
import React from 'react'

export type CheckType = 'radio' | 'switch' | 'checkbox'

export interface CheckHandlerContext<V = any> {
    onGroupCallback?: (value: V, checked: boolean) => void

    checked: (value: V) => boolean
}

type Checked = boolean | 'indeterminate'

export interface CheckItemProps<V = any> extends Omit<CheckHandlerContext<V>, 'checked'> {
    checked?: Checked | CheckHandlerContext<V>['checked']
    defaultChecked?: Checked
    value?: V
    onChange?: (checked?: boolean) => void
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
    size?: 'small' | 'default' | 'large'
    /** Switch中用到 */
    content?: React.ReactNode[]
    disabled?: boolean
    style?: React.CSSProperties
    className?: string
}

export interface ICheckedItemProps extends CheckItemProps {
    index?: number

    internalOnChange?: (value, index: number) => void
}

export interface CheckItemState {
    checked: boolean
}

export type DefaultDataRecord = { label: React.ReactNode; value: string | number }

export type Value<D, FormatResult> = FormatResult extends D ? D[] : FormatResult[]

export interface CheckboxGroupProps<
    D extends Record<string, any> | string | number = DefaultDataRecord,
    FormatResult extends Record<string, any> | string | number = D
> extends Pick<DatumListProps<D, FormatResult>, 'format' | 'onChange' | 'prediction' | 'disabled'> {
    /** 垂直布局 */
    block?: boolean
    data?: D[]
    renderItem?: keyof D | ((item: D) => React.ReactNode)
    className?: string
    keygen?: KeyGen<D>
    children?: React.ReactNode
    defaultValue?: Value<D, FormatResult>
    value?: Value<D, FormatResult>
}

/** FR显式说明format生成的结果类型 */
export interface ICheckboxGroupProps<
    D extends Record<string, any> | string | number = DefaultDataRecord,
    FormatResult extends Record<string, any> | string | number = D
> extends CheckboxGroupProps<D, FormatResult> {
    /** 设计缺陷:此处是内部使用必选的，不对外暴露 */
    datum?: List<D>
}

export interface CheckboxComponent<V = any> extends React.ComponentClass<CheckItemProps<V>> {
    Group<
        D extends Record<string, any> | string | number = DefaultDataRecord,
        FormatResult extends Record<string, any> | string | number = D
    >(
        props: ICheckboxGroupProps<D, FormatResult>
    ): React.ReactElement<ICheckboxGroupProps<D, FormatResult>, any>
}
