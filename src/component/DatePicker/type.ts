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
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void
    onChange?: (date: Date, dateStr: string) => void
    onFocus?: (evt: React.FocusEvent<HTMLElement>) => void
    position?: string
    range?: boolean | number
    size?: 'small' | 'default' | 'large'
    type?: 'date' | 'time' | 'date-time' | 'month' | 'week' | 'year'
    allowSingle?: boolean
    value?: Date
    portal?: boolean
    zIndex?: number
    children?: React.ReactNode
    onValueBlur?: () => void
    quickSelect?: QuickSelect[]
    min?: Date
    max?: Date
    defaultPickerValue?: Date
    hourStep?: number
    minuteStep?: number
    secondStep?: number
    defaultValue?: Date
    border?: boolean
    className?: string
    style?: React.CSSProperties
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
    panelDate: Date
    disabled: () => boolean
    format: string
    max: Date
    min: Date
    onChange: (date: Date, shouldChange?: boolean, shouldDismiss?: boolean) => void
    value: any
    handleHover: (index: number, isEnter: boolean) => void
}

export interface DatePickerDayProps extends Pick<PickerProps, 'type'> {
    panelDate: Date
    disabled: (date: Date) => boolean
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
    onClick?: (e: React.MouseEvent) => void
    onMouseDown?: (e: React.MouseEvent) => void
    tag?: keyof HTMLElementTagNameMap
    disabled?: boolean
}

export interface DatePickerYearProps {
    panelDate: Date
    onChange: (date: Date) => void
    onModeChange: (mode: string) => void
    value: Date
    type: string
}

export interface DatePickerMonthProps extends Pick<DatePickerProps, 'min'> {
    panelDate: Date
    disabled: boolean | ((date: Date) => boolean)
    onChange: (date: Date, change?: boolean, blur?: boolean) => void
    onModeChange: (mode: string) => void
    value: Date
    range: number
    type: string
}

export interface DatePickerTimeProps extends Pick<DatePickerProps, 'format'> {
    disabled: (date: Date) => boolean
    onChange: (date: Date, change?: boolean, blur?: boolean) => void
    value: Date
    min: Date
    max: Date
    panelDate: Date
}

export interface TimeScrollProps {
    onChange: (scale: number) => void
    total: number
    currentScale: number
    disabled: (date: Date) => boolean
    min: Date
    max: Date
    panelDate: Date
    mode: 'hour' | 'minute' | 'second'
}
