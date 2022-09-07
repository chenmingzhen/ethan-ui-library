import React from 'react'

export interface QuickSelect {
    name: string
    value: [string, string]
}

export interface DatePickerProps {
    clearable?: boolean
    disabled?: boolean | (() => boolean)
    format?: string
    inputAble?: boolean
    placeholder?: React.ReactNode
    onBlur?: () => void
    onChange?: (value: string) => void
    onFocus?: (evt: React.FocusEvent<HTMLElement>) => void
    position?: string
    range?: boolean | number
    size?: 'small' | 'default' | 'large'
    type?: 'date' | 'time' | 'date-time' | 'month' | 'week'
    allowSingle?: boolean
    defaultTime?: string | string[]
    value?: any
    absolute?: boolean
    zIndex?: number
    children?: React.ReactNode
    onValueBlur?: () => void
    quickSelect?: QuickSelect[]
    min?: any
    max?: any
    defaultPickerValue?: number | number[] | Date | Date[]
    hourStep?: number
    minuteStep?: number
    secondStep?: number
    defaultValue?: number | Date | number[] | Date[]
}

export interface DatePickerContainerProps extends Omit<DatePickerProps, 'onChange'> {
    onChange?: (value: string | string[], callback?: () => void) => void
}

export type WithValueProps = DatePickerProps

export interface DatePickerTextProps {
    disabled: boolean
    className: string
    index: number
    inputAble: boolean
    onTextBlur: (date: Date, index: number) => void
    placeholder: React.ReactNode
    value: string
    size: 'small' | 'default' | 'large'
    format: string
}

export interface PickerProps extends Pick<DatePickerProps, 'type'> {
    current: Date
    disabled: () => boolean
    format: string
    max: Date
    min: Date
    onChange: () => void
    value: any
    index: number
    handleHover: () => void
    defaultTime: any
}

export interface DayProps extends Pick<PickerProps, 'type'> {
    current: Date
    disabled: (disabled: Date) => boolean
    format: string
    index: number
    max: Date
    min: Date
    onChange: (newDate: Date) => void
    onChangeSync: () => void
    onDayHover: () => void
    onModeChange: (mode: string) => void
    range: number
    rangeDate: Date[]
    showTimePicker: boolean
    value: any
    defaultTime: any[]
    allowSingle: boolean
    rangeTemp: Date
}

export interface DatePickerIconProps {
    className?: string
    name: string
    onClick?: (e) => void
    tag?: keyof HTMLElementTagNameMap
    disabled?: boolean
}
