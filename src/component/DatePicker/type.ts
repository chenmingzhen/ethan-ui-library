import React from 'react'
import { TriggerProps } from '../Trigger/type'

export interface QuickSelect<Value extends Date | Date[]> {
    name: string
    value: Value
}

export type ChangeMode = Omit<DatePickerProps['type'], 'date-time'> | 'time'

export interface DatePickerProps {
    clearable?: boolean
    disabled?: boolean | ((date: Date) => boolean)
    format?: string
    inputAble?: boolean
    placeholder?: string
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void
    onChange?: (date: Date, dateStr: string) => void
    onFocus?: (evt: React.FocusEvent<HTMLElement>) => void
    position?: string
    size?: 'small' | 'default' | 'large'
    type?: 'date' | 'date-time' | 'month' | 'week' | 'year'
    value?: Date
    zIndex?: number
    quickSelects?: QuickSelect<Date>[]
    min?: Date
    max?: Date
    defaultPickerValue?: Date
    defaultValue?: Date
    border?: boolean
    className?: string
    style?: React.CSSProperties
    getPopupContainer?: TriggerProps['getPopupContainer']
}

export interface DatePickerTextProps {
    disabled: boolean
    index?: number
    inputAble: boolean
    onTextBlur: (date: Date, index: number) => void
    placeholder?: string
    value: string
    size: 'small' | 'default' | 'large'
    format: string
    onInputValidDate(date: Date, index?: number): void
    forwardedInputRef: React.MutableRefObject<HTMLInputElement>
    hover?: number
}

export interface PickerProps extends Pick<DatePickerProps, 'type'> {
    panelDate: Date
    disabled?: (date: Date) => boolean
    format?: string
    max?: Date
    min?: Date
    onChange: (date: Date, mode: ChangeMode) => void
    selectedDate: Date
    className?: string
    pickerId?: string
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
    type: ChangeMode
    selectedDate: Date
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
    type: ChangeMode
    min: Date
    max: Date
    disabled: (date: Date) => boolean
    selectedDate: Date
}

export interface DatePickerMonthProps extends Pick<DatePickerProps, 'min'> {
    panelDate: Date
    disabled: boolean | ((date: Date) => boolean)
    onChange: (date: Date, mode: ChangeMode) => void
    onModeChange: (mode: string) => void
    range: number
    type: string
    max: Date
    selectedDate: Date
}

export interface DatePickerTimeProps extends Pick<DatePickerProps, 'format'> {
    disabled: (date: Date) => boolean
    onChange: (date: Date, mode: ChangeMode) => void
    min: Date
    max: Date
    type: ChangeMode
    selectedDate: Date
}

export interface TimeScrollProps {
    onChange: (scale: number) => void
    total: number
    currentScale: number
    disabled: (date: Date) => boolean
    min: Date
    max: Date
    selectedDate: Date
    mode: 'hour' | 'minute' | 'second'
}

export interface ContainerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    disabled: boolean
    border: boolean
    size: DatePickerProps['size']
    type: DatePickerProps['type']
    containerClassName: string
    innerClassName: string
    containerStyle: React.CSSProperties
}

export interface RangePickerProps {
    clearable?: boolean
    disabled?: boolean | ((date: Date, pos: string, selectedPanelDates: Date[]) => boolean)
    format?: string
    inputAble?: boolean
    placeholder?: string | [string, string]
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void
    onFocus?: (evt: React.FocusEvent<HTMLElement>) => void
    onChange?: (dates: Date[], str: string[]) => void
    position?: string
    size?: 'small' | 'default' | 'large'
    type?: 'date' | 'date-time' | 'month' | 'week' | 'year'
    value?: Date[]
    zIndex?: number
    quickSelects?: QuickSelect<Date[]>[]
    min?: Date
    max?: Date
    defaultPickerValue?: Date[]
    defaultValue?: Date[]
    border?: boolean
    className?: string
    style?: React.CSSProperties
    getPopupContainer?: TriggerProps['getPopupContainer']
}

export interface RangePickerContextProps {
    panelDates?: Date[]
    index?: number
    selectedPanelDates: Date[]
    onHoverPanel: (index: number) => void
}
