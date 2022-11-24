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
    portal?: boolean
    zIndex?: number
    children?: React.ReactNode
    onValueBlur?: () => void
    quickSelect?: QuickSelect[]
    min?: number | Date
    max?: number | Date
    defaultPickerValue?: number | number[] | Date | Date[]
    hourStep?: number
    minuteStep?: number
    secondStep?: number
    defaultValue?: number | Date | number[] | Date[]
    formatResult?: string
}

export interface DatePickerContainerProps extends Omit<DatePickerProps, 'onChange'> {
    onChange?: (value: string | string[], callback?: () => void) => void
}

export type WithValueProps = DatePickerProps

export interface DatePickerTextProps extends Pick<DatePickerProps, 'formatResult'> {
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
    handleHover: (index: number, isEnter: boolean) => void
    defaultTime: any
}

export interface DatePickerDayProps extends Pick<PickerProps, 'type'> {
    current: Date
    disabled: boolean | ((date: Date) => boolean)
    onChange: (date: Date, change?: boolean, blur?: boolean, isEnd?: boolean) => void
    format: string
    index: number
    max: Date
    min: Date
    onChangeSync: () => void
    onDayHover: (date: Date) => void
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

export interface DatePickerYearProps {
    current: Date
    onChange: (date: Date) => void
    onModeChange: (mode: string) => void
    value: Date
}

export interface DatePickerMonthProps extends Pick<DatePickerProps, 'min'> {
    current: Date
    disabled: boolean | ((date: Date) => boolean)
    onChange: (date: Date, change?: boolean, blur?: boolean) => void
    onModeChange: (mode: string) => void
    value: Date
    range: number
    type: string
}

export interface DatePickerTimeProps extends Pick<DatePickerProps, 'format'> {
    disabled: boolean | ((date: Date) => boolean)
    onChange
    range
    value: Date
    defaultTime
    index: number
    hourStep: number
    minuteStep: number
    secondStep: number
    min
    max
}

export interface TimeScrollProps {
    ampm?: boolean
    onChange
    total?
    value
    step?
    disabled
    min
    max
    range
    current
    mode
}
