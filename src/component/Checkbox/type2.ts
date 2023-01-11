import React from 'react'

type KeyGen<T> = T extends string | number ? true : keyof T | true | ((data: T) => string | number)

type CheckBoxInferFormat<Data> = Data extends string | number ? never : keyof Data | ((data: Data) => string | number)

type CheckboxInferRenderItem<Data> =
    | (Data extends string | number ? React.ReactNode : keyof Data)
    | ((item: Data) => React.ReactNode)

export type CheckItemGroupBaseData = Record<string, any> | string | number

export interface CheckboxProps {
    checked?: boolean
    defaultChecked?: boolean
    value?: any
    onChange?: (checked: boolean, index: number) => void
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
    disabled?: boolean
    style?: React.CSSProperties
    className?: string
    children?: React.ReactNode
    index?: number
    indeterminate?: boolean
}

export interface CheckboxGroupContext<V = any> {
    onCheckboxGroupItemChange?: (value: V, checked: boolean) => void
    checked: (value: V) => boolean
}

export interface CheckboxGroupProps<
    Data extends CheckItemGroupBaseData,
    FormatData extends CheckItemGroupBaseData = Data
> {
    block?: boolean
    data?: Data[]
    renderItem?: CheckboxInferRenderItem<Data>
    className?: string
    keygen?: KeyGen<Data>
    children?: React.ReactNode
    defaultValue?: FormatData[]
    value?: FormatData[]
    format?: CheckBoxInferFormat<Data>
    prediction?(formatValue: FormatData, data: Data): boolean
    disabled?: boolean | ((data: Data) => boolean)
    onChange?(value: FormatData[], data: Data, checked: boolean)
}
