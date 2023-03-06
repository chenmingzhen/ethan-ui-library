import React from 'react'

export type RadioDataValueType = string | number | Record<string | number, string | number>

export type RadioData =
    | {
          label: React.ReactNode
          value: RadioDataValueType
      }
    | string
    | number
    | Record<string, any>
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

export interface RadioGroupProps<Data = RadioData> {
    button?: boolean | 'outline'
    size?: 'small' | 'default' | 'large'
    defaultValue?: RadioDataValueType
    value?: RadioDataValueType
    onChange?(value: RadioDataValueType): void
    children?: React.ReactNode
    disabled?: boolean | ((data: Data) => boolean)
    data?: Data[]
    className?: string
    style?: React.CSSProperties
    block?: boolean
    renderItem?: (dataItem: Data, index: number) => React.ReactNode
    labelKey?: string
    valueKey?: string
}
