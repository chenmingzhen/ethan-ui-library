import React from 'react'

type KeyGen<T> = T extends string | number ? true : keyof T | true | ((data: T) => string | number)

type RadioInferFormat<Data> = Data extends string | number ? never : keyof Data | ((data: Data) => string | number)

type RadioInferRenderItem<Data> =
    | (Data extends string | number ? React.ReactNode : keyof Data)
    | ((item: Data) => React.ReactNode)

export type RadioGroupBaseData = Record<string, any> | string | number

export interface RadioProps {
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
}

export interface RadioGroupContextProps<V = any> {
    onRadioGroupItemChange?: (value: V, checked: boolean) => void
    checked: (value: V) => boolean
}

export interface RadioGroupProps<Data extends RadioGroupBaseData, FormatData extends RadioGroupBaseData = Data> {
    button?: boolean | 'outline'
    size?: 'small' | 'default' | 'large'
    defaultValue?: FormatData
    value?: FormatData
    onChange?(item: FormatData, data: Data, checked: boolean): void
    keygen?: KeyGen<Data>
    children?: React.ReactNode
    prediction?(formatValue: FormatData, data: Data): boolean
    disabled?: boolean | ((data: Data) => boolean)
    format?: RadioInferFormat<Data>
    renderItem?: RadioInferRenderItem<Data>
    data?: Data[]
    className?: string
    style?: React.CSSProperties
    block?: boolean
}
