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

export type CheckItemGroupDefaultDataRecord = { label: React.ReactNode; value: string | number }

export type CheckItemGroupBaseData = Record<string, any> | string | number

export type Value<Data, FormatData> = FormatData extends Data ? Data[] : FormatData[]

export interface CheckboxGroupProps<
    Data extends CheckItemGroupBaseData = CheckItemGroupDefaultDataRecord,
    FormatData extends CheckItemGroupBaseData = Data
> extends Pick<DatumListProps<Data, FormatData>, 'format' | 'onChange' | 'prediction' | 'disabled'> {
    /** 垂直布局 */
    block?: boolean
    data?: Data[]
    renderItem?: keyof Data | ((item: Data) => React.ReactNode)
    className?: string
    keygen?: KeyGen<Data>
    children?: React.ReactNode
    defaultValue?: Value<Data, FormatData>
    value?: Value<Data, FormatData>
}

/** FR显式说明format生成的结果类型 */
export interface ICheckboxGroupProps<
    Data extends CheckItemGroupBaseData = CheckItemGroupDefaultDataRecord,
    FormatData extends CheckItemGroupBaseData = Data
> extends CheckboxGroupProps<Data, FormatData> {
    /** 设计缺陷:此处是内部使用必选的，不对外暴露 */
    datum?: List<Data>
}

export interface CheckboxComponent<V = any> extends React.ComponentClass<CheckItemProps<V>> {
    Group<
        Data extends CheckItemGroupBaseData = CheckItemGroupDefaultDataRecord,
        FormatResult extends CheckItemGroupBaseData = Data
    >(
        props: ICheckboxGroupProps<Data, FormatResult>
    ): React.ReactElement<ICheckboxGroupProps<Data, FormatResult>, any>
}
