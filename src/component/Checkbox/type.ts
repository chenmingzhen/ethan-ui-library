import { KeyGen } from '@/type/Group'
import List, { DatumListProps } from '@/utils/Datum/List'
import React from 'react'

export type CheckType = 'radio' | 'switch' | 'checkbox'

export interface CheckHandlerContext<HV = any> {
    onGroupCallback?: (htmlValue: HV, checked: boolean) => void

    checked?: (htmlValue: HV) => boolean
}

export interface CheckItemProps<HV = any, V = HV> extends Omit<CheckHandlerContext, 'checked'> {
    checked?: boolean | 'indeterminate' | CheckHandlerContext<HV>['checked']
    /** 选中时返回值 */
    htmlValue?: HV
    value?: V
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
    index?: number
}

export interface CheckItemState {
    checked: boolean
}

export type DefaultDataRecord = { label: React.ReactNode; value: string | number }

export type Value<D, FormatResult> = FormatResult extends D ? D[] : FormatResult[]

export interface CheckboxGroupProps<
    D extends Record<string, any> | string = DefaultDataRecord,
    FormatResult extends Record<string, any> | string = D
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
    D extends Record<string, any> | string = DefaultDataRecord,
    FormatResult extends Record<string, any> | string = D
> extends CheckboxGroupProps<D, FormatResult> {
    /** 设计缺陷:此处是内部使用必选的，不对外暴露 */
    datum?: List<D>
}

export interface CheckboxComponent<HV = any, V = HV> extends React.ComponentClass<CheckItemProps<HV, V>> {
    Group<
        D extends Record<string, any> | string = DefaultDataRecord,
        FormatResult extends Record<string, any> | string = D
    >(
        props: ICheckboxGroupProps<D, FormatResult>
    ): React.ReactElement<ICheckboxGroupProps<D, FormatResult>, any>
}
