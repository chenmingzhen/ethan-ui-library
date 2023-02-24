import React from 'react'

export interface QuickSelect<Value extends Date | Date[]> {
    name: string
    value: Value
}

export type ChangeMode = DatePickerProps['type'] | 'time'

export interface DatePickerProps {
    clearable?: boolean
    disabled?: boolean | ((date: Date) => boolean)
    format?: string
    inputAble?: boolean
    placeholder?: React.ReactNode
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void
    onChange?: (date: Date, dateStr: string) => void
    onFocus?: (evt: React.FocusEvent<HTMLElement>) => void
    position?: string
    size?: 'small' | 'default' | 'large'
    type?: 'date' | 'date-time' | 'month' | 'week' | 'year'
    value?: Date
    portal?: boolean
    zIndex?: number
    quickSelects?: QuickSelect<Date>[]
    min?: Date
    max?: Date
    defaultPickerValue?: Date
    defaultValue?: Date
    border?: boolean
    className?: string
    style?: React.CSSProperties
}

export interface DatePickerTextProps {
    disabled: boolean
    className: string
    index?: number
    inputAble: boolean
    onTextBlur: (date: Date, index: number) => void
    placeholder: React.ReactNode
    value: string
    size: 'small' | 'default' | 'large'
    format: string
}

export interface PickerProps extends Pick<DatePickerProps, 'type'> {
    panelDate: Date
    disabled?: (date: Date) => boolean
    format?: string
    max?: Date
    min?: Date
    onChange: (date: Date, mode: ChangeMode) => void
    value: Date
}

export interface DatePickerDayProps {
    panelDate: Date
    disabled: (date: Date) => boolean
    onChange: (date: Date, mode: ChangeMode) => void
    format: string
    max: Date
    min: Date
    onChangeSync: () => void
    onModeChange: (mode: string) => void
    range: number
    rangeDate: Date[]
    value: Date
    type: ChangeMode
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
    onChange: (date: Date, mode: ChangeMode) => void
    onModeChange: (mode: string) => void
    value: Date
    type: ChangeMode
    min: Date
    max: Date
    disabled: (date: Date) => boolean
}

export interface DatePickerMonthProps extends Pick<DatePickerProps, 'min'> {
    panelDate: Date
    disabled: boolean | ((date: Date) => boolean)
    onChange: (date: Date, mode: ChangeMode) => void
    onModeChange: (mode: string) => void
    value: Date
    range: number
    type: string
    max: Date
}

export interface DatePickerTimeProps extends Pick<DatePickerProps, 'format'> {
    disabled: (date: Date) => boolean
    onChange: (date: Date, mode: ChangeMode) => void
    value: Date
    min: Date
    max: Date
    panelDate: Date
    type: ChangeMode
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

export interface ContainerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    disabled: boolean
    border: boolean
    size: DatePickerProps['size']
    type: DatePickerProps['type']
    toggleOpen: (open: boolean) => void
    containerClassName: string
    innerClassName: string
    containerStyle: React.CSSProperties
}

export interface RangePickerProps {
    clearable?: boolean
    disabled?: boolean | ((date: Date, pos: string, panelDates: Date[]) => boolean)
    format?: string
    inputAble?: boolean
    placeholder?: React.ReactNode | [React.ReactNode, React.ReactNode]
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void
    onFocus?: (evt: React.FocusEvent<HTMLElement>) => void
    onChange?: (dates: Date[], str: string[]) => void
    position?: string
    size?: 'small' | 'default' | 'large'
    type?: 'date' | 'date-time' | 'month' | 'week' | 'year'
    value?: Date[]
    portal?: boolean
    zIndex?: number
    quickSelects?: QuickSelect<Date[]>[]
    min?: Date
    max?: Date
    defaultPickerValue?: Date[]
    defaultValue?: Date[]
    border?: boolean
    className?: string
    style?: React.CSSProperties
}

export interface RangePickerContextProps {
    panelDates?: Date[]
    index?: number
    onDayHover: (date: Date) => void
    selectedPanelDates: Date[]
    onHoverPanel: (index: number) => void
}
