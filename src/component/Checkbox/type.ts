import React from 'react'

export type CheckboxDataValueType = string | number | Record<string | number, string | number>

export type CheckboxData =
    | {
          label: React.ReactNode
          value: CheckboxDataValueType
      }
    | string
    | number
    | Record<string, any>

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

export interface CheckboxGroupProps<Data = CheckboxData> {
    block?: boolean
    data?: Data[]
    className?: string
    children?: React.ReactNode
    defaultValue?: CheckboxDataValueType[]
    value?: CheckboxDataValueType[]
    disabled?: boolean | ((data: Data, values: CheckboxDataValueType[]) => boolean)
    onChange?: (value: CheckboxDataValueType[], data: Data, checked: boolean) => void
    renderItem?: (dataItem: Data, index: number) => React.ReactNode
    labelKey?: string
    valueKey?: string
}
