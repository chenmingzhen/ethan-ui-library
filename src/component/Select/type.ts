import React, { ReactNode } from 'react'
import { ListProps } from '../List'
import { SpinProps } from '../Spin'

export type SelectBaseData = Record<string, any> | string | number

export type DefaultSelectDefaultDataRecord = { label: React.ReactNode; value: any }

export interface SelectProps<D extends SelectBaseData = DefaultSelectDefaultDataRecord, FormatData = D> {
    border?: boolean
    placeholder?: ReactNode
    style?: React.CSSProperties
    keygen?: ((data: D) => string) | keyof D | boolean
    portal?: boolean
    clearable?: boolean
    // columns 大于 1 时，选项展示为多列布局模式
    columns?: number
    data?: D[]
    disabled?: boolean | ((data: D) => boolean)
    filterText?: string
    height?: number
    loading?: boolean
    multiple?: boolean
    onBlur?: (evt: React.FocusEvent<HTMLDivElement>) => void
    onCreate?: ((text: string) => D) | boolean
    onFilter?: (text: string, data: D) => boolean
    onFocus?(evt: React.FocusEvent<HTMLDivElement>): void
    onChange?: (values: any, value: FormatData, selected: boolean) => void
    position?: 'drop-down' | 'drop-up'
    renderItem?: keyof D | ((data: D, index?: number) => ReactNode)
    result?: D[]
    size?: 'large' | 'default' | 'small'
    text?
    compressed?: boolean
    autoAdapt?: boolean
    showArrow?: boolean
    compressedClassName?: string
    onCollapse?(focus: boolean): string
    resultClassName?: string
    prediction?: (formatValue: FormatData, value: D) => boolean
    renderResult?: keyof D | ((data: D) => ReactNode)
    lineHeight?: number
    value?: any
    defaultValue?: any
    groupBy?: (item: any, index: number, items: any) => string | number
    cacheAble?: boolean
    spinProps?: Omit<SpinProps, 'children' | 'loading'>
    onScrollRatioChange?: (scrollTopRatio: number, lastScrollTop: number) => void
    customRender?: {
        header?: React.ReactNode
        footer?: React.ReactNode
    }
    columnWidth?: number
    format?: keyof D
    className?: string
    width?: number
    createOption?: {
        onCreate: (text: string) => D
        onCreateEnd?: (data: D) => void
    }
}

export interface OptionListProps extends Pick<ListProps, 'onTransitionEnd'> {
    height: SelectProps['height']
    lineHeight: SelectProps['lineHeight']
    text: SelectProps['text']
    loading: SelectProps['loading']
    keygen: SelectProps['keygen']
    position: SelectProps['position']
    spinProps: SelectProps['spinProps']
    size: SelectProps['size']
    onScrollRatioChange: SelectProps['onScrollRatioChange']
    filterText: SelectProps['filterText']
    customRender: SelectProps['customRender']
    control: 'mouse' | 'keyboard'
    selectId: string
    onControlChange(control: OptionListProps['control']): void
    onChange(data, fromInput?: boolean): void
    renderItem(data, index: number): React.ReactNode
    parentElement?: HTMLDivElement
    groupKey?: string
    data: any[]
    show: boolean
    style?: React.CSSProperties
    className?: string
    values?: any[]
    getDataByValue
    check
    disabled
    set
}

export interface BoxListProps extends Pick<SelectProps, 'multiple' | 'columnWidth' | 'columns'> {
    style: React.CSSProperties
    show: boolean
    selectId: string
    customRender: SelectProps['customRender']
    loading: boolean
    data: any
    text: SelectProps['text']
    onChange(data): void
    renderItem(data, index: number): React.ReactNode
    keygen: SelectProps['keygen']
    groupKey: string
    height: SelectProps['height']
    lineHeight: SelectProps['lineHeight']
    spinProps: SpinProps
    values: any
    getDataByValue
    disabled
    check
    set
}

export interface OptionProps {
    data: any
    disabled: boolean
    index: number
    isActive: boolean
    isHover: boolean
    onHover: (index: number) => void
    groupKey: string
    onClick(data): void
    renderItem(data, index: number): React.ReactNode
}

export interface SelectResultProps {
    onClear(e: React.MouseEvent): void
    onRemove(data: any): void
    compressed: boolean
    onInput(text: string): void
    isDisabled: boolean
    disabledFunc: (data) => boolean
    filterText: string
    size: SelectProps['size']
    showArrow: SelectProps['showArrow']
    resultClassName: SelectProps['resultClassName']
    compressedClassName: SelectProps['compressedClassName']
    multiple: SelectProps['multiple']
    placeholder: SelectProps['placeholder']
    result: any[]
    renderResult: SelectProps['renderResult']
    show: boolean
    forwardedInputRef: ((instance: HTMLInputElement) => void) | React.MutableRefObject<HTMLInputElement>
}

export interface SelectResultItemProps extends Pick<SelectResultProps, 'resultClassName'> {
    result: any
    disabled: boolean
    onRemove: SelectResultProps['onRemove']
    title?: boolean
    renderResult: (data) => React.ReactNode
}

export interface SelectBoxOptionProps {
    data: any
    disabled: boolean
    index: number
    isActive: boolean
    multiple: boolean
    onClick(data): void
    columns: number
    renderItem(data, index: number): React.ReactNode
}

export interface BoxListTitleProps {
    title: React.ReactNode
    style?: React.CSSProperties
}
