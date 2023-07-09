import React from 'react'
import { ListProps } from '../List'
import { SpinProps } from '../Spin'

export type SelectDataValueType = string | number | {}

export type SelectData = string | number | { label: React.ReactNode; value: SelectDataValueType } | {}

export interface SelectProps<Data = SelectData> {
    labelKey?: string
    valueKey?: string
    border?: boolean
    width?: number
    placeholder?: string
    style?: React.CSSProperties
    clearable?: boolean
    columns?: number
    data?: Data[]
    disabled?: boolean | ((data: Data, values: SelectDataValueType[]) => boolean)
    filterText?: string
    height?: number
    loading?: boolean
    multiple?: boolean
    onBlur?: (evt: React.FocusEvent<HTMLDivElement>) => void
    onCreate?: ((text: string) => Data) | boolean
    onFilter?: (text: string, data: Data) => boolean
    onFocus?(evt: React.FocusEvent<HTMLDivElement>): void
    onChange?: (values: SelectDataValueType | SelectDataValueType[]) => void
    position?: 'drop-down' | 'drop-up'
    renderItem?: (data: Data, index: number) => React.ReactNode
    result?: Data[]
    size?: 'large' | 'default' | 'small'
    compressed?: boolean
    autoAdapt?: boolean
    showArrow?: boolean
    compressedClassName?: string
    onCollapse?(focus: boolean): string
    resultClassName?: string | ((dataItem: SelectData) => string)
    renderResult?: (data: Data, index: number) => React.ReactNode
    lineHeight?: number
    value?: SelectDataValueType | SelectDataValueType[]
    defaultValue?: SelectDataValueType | SelectDataValueType[]
    groupBy?: (item: Data, index: number, items: SelectData[]) => string | number
    spinProps?: Omit<SpinProps, 'children' | 'loading'>
    onScrollRatioChange?: (scrollTopRatio: number) => void
    columnWidth?: number
    className?: string
    createOption?: {
        onCreate: (text: string) => Data
        onCreateEnd?: (data: Data) => void
    }
    customRender?: {
        header?: React.ReactNode
        footer?: React.ReactNode
    }
    text?: {
        selectAll?: string
        noData?: string
    }
    getPopupContainer?: (triggerElement: HTMLElement) => HTMLElement
}

export interface OptionListProps extends Pick<ListProps, 'onTransitionEnd'> {
    height: SelectProps['height']
    lineHeight: SelectProps['lineHeight']
    text: SelectProps['text']
    loading: SelectProps['loading']
    position: SelectProps['position']
    spinProps: SelectProps['spinProps']
    size: SelectProps['size']
    onScrollRatioChange: SelectProps['onScrollRatioChange']
    filterText: SelectProps['filterText']
    customRender: SelectProps['customRender']
    control: 'mouse' | 'keyboard'
    componentKey: string
    onControlChange(control: OptionListProps['control']): void
    onChange(data: SelectData, fromInput?: boolean): void
    getOptionContent(data: SelectData, index: number): React.ReactNode
    parentElement?: HTMLDivElement
    groupKey: string
    data: SelectData[]
    show: boolean
    style: React.CSSProperties
    className: string
    selectedData: SelectData[]
    getCheckedStateByDataItem(dataItem: SelectData): boolean
    disabled(dataItem: SelectData): boolean
    getKey: (dataItem: SelectData, index: number) => string | number
    getDataItemValue: (dataItem: SelectData) => SelectDataValueType
}

export interface BoxListProps extends Pick<SelectProps, 'multiple' | 'columnWidth' | 'columns'> {
    style: React.CSSProperties
    show: boolean
    componentKey: string
    customRender: SelectProps['customRender']
    loading: boolean
    data: SelectData[]
    text: SelectProps['text']
    onChange(data: SelectData): void
    getOptionContent(data: SelectData, index: number): React.ReactNode
    groupKey: string
    height: SelectProps['height']
    lineHeight: SelectProps['lineHeight']
    spinProps: SpinProps
    selectedData: SelectData[]
    disabled(dataItem: SelectData): boolean
    setValuesByDataItems: (dataItems: SelectData[]) => void
    getCheckedStateByDataItem: (dataItem: SelectData) => boolean
    getKey: (dataItem: SelectData, index: number) => string | number
    getDataItemValue: (dataItem: SelectData) => SelectDataValueType
}

export interface OptionProps {
    data: SelectData
    disabled: boolean
    index: number
    isActive: boolean
    isHover: boolean
    onHover: (index: number) => void
    groupKey: string
    onClick(data: SelectData): void
    getOptionContent(data: SelectData, index: number): React.ReactNode
}

export interface SelectResultProps {
    onClear(e: React.MouseEvent): void
    onRemove(data: SelectData): void
    compressed: boolean
    onInput(text: string): void
    isDisabled: boolean
    disabledFunc: (data: SelectData) => boolean
    filterText: string
    size: SelectProps['size']
    showArrow: SelectProps['showArrow']
    resultClassName: SelectProps['resultClassName']
    compressedClassName: SelectProps['compressedClassName']
    multiple: SelectProps['multiple']
    placeholder: SelectProps['placeholder']
    selectedData: SelectData[]
    getResultContent(dataItem: SelectData, index: number): React.ReactNode
    forwardedInputRef: React.MutableRefObject<HTMLInputElement>
}

export interface SingleResultProps {
    selectedData: SelectData[]
    getResultContent(dataItem: SelectData, index: number): React.ReactNode
    filterText: string
    size: SelectProps['size']
    onInput(text: string): void
    forwardedInputRef: React.MutableRefObject<HTMLInputElement>
    placeholder: SelectProps['placeholder']
    isDisabled: boolean
}

export interface MultipleResultProps {
    selectedData: SelectData[]
    getResultContent(dataItem: SelectData, index: number): React.ReactNode
    filterText: string
    size: SelectProps['size']
    onInput(text: string): void
    forwardedInputRef: React.MutableRefObject<HTMLInputElement>
    placeholder: SelectProps['placeholder']
    compressed: SelectProps['compressed']
    disabledFunc: (data: SelectData) => boolean
    onRemove(data: SelectData): void
    resultClassName: SelectProps['resultClassName']
    compressedClassName: SelectProps['compressedClassName']
    isDisabled: boolean
}

export interface MultipleResultItemProps extends Pick<SelectResultProps, 'resultClassName'> {
    selectedDataItem: SelectData
    disabled: boolean
    onRemove: SelectResultProps['onRemove']
    title?: boolean
    getResultContent(dataItem: SelectData, index: number): React.ReactNode
    index: number
}

export interface SelectBoxOptionProps {
    data: SelectData
    disabled: boolean
    index: number
    isActive: boolean
    multiple: boolean
    onClick(data: SelectData): void
    columns: number
    getOptionContent(data: SelectData, index: number): React.ReactNode
}

export interface BoxListTitleProps {
    title: React.ReactNode
    style?: React.CSSProperties
}
