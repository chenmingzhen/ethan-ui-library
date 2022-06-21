import List from '@/utils/Datum/List'
import React, { ReactNode } from 'react'
import { ListProps } from '../List'
import { SpinProps } from '../Spin'

export type SelectBaseData = Record<string, any> | string | number

export type DefaultSelectDefaultDataRecord = { label: React.ReactNode; value: any }

export interface ISelectProps extends Omit<SelectProps<any, any>, 'filterDelay' | 'onFilter'> {
    datum: List

    groupKey?: string

    result: any[]

    onInput?: (text: string) => void
}

export interface SelectProps<
    D extends SelectBaseData = DefaultSelectDefaultDataRecord,
    FormatData extends SelectBaseData = SelectBaseData
> {
    placeholder?: ReactNode
    keygen?: (data: D) => string | keyof D | true
    absolute?: boolean
    clearable?: boolean
    // columns 大于 1 时，选项展示为多列布局模式
    columns?: number
    data?: D[]
    treeData?: D[]
    disabled?: boolean | ((data: FormatData) => boolean)
    filterText?: string
    height?: number
    loading?: boolean
    multiple?: boolean
    onBlur?: (evt: React.FocusEvent<HTMLDivElement>) => void
    onCreate?: ((text: string) => D) | boolean
    onFilter?: (text: string, data: D) => void
    onFocus?(evt: React.FocusEvent<HTMLDivElement>): void
    position?: SelectState['position']
    renderItem: keyof D | ((data: D, index: number) => ReactNode)
    result?: D[]
    size?: 'large' | 'default' | 'small'
    text?
    compressed?: boolean
    autoAdapt?: boolean
    showArrow?: boolean
    compressedClassName?: string
    onCollapse?(focus: boolean): string
    resultClassName?: string | ((data: D) => string)
    prediction?: (formatValue: FormatData, value: D) => boolean
    renderResult: keyof D | ((data: D) => ReactNode)
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
    columnWidth: number
}

export interface SelectState {
    control: 'mouse' | 'keyboard'
    focus: boolean
    position: 'drop-down' | 'drop-up'
}

export interface SelectListProps
    extends Pick<
            ISelectProps,
            | 'height'
            | 'lineHeight'
            | 'text'
            | 'loading'
            | 'keygen'
            | 'datum'
            | 'position'
            | 'spinProps'
            | 'size'
            | 'onScrollRatioChange'
            | 'filterText'
            | 'customRender'
            /* BoxList */
            | 'multiple'
            | 'columnWidth'
            | 'columns'
        >,
        Omit<ListProps, 'onScroll'> {
    control: SelectState['control']
    selectId: string
    onControlChange(control: SelectState['control']): void
    onChange(data, fromInput?: boolean): void
    renderItem(data, index: number): React.ReactNode
    parentElement?: HTMLDivElement
    onBlur(): void
    groupKey?: string
    children: React.ReactNode
    bindOptionListFunc: (func: SelectOptionListBindFuncMap) => void
    data: any[]
    focus: boolean
    style?: React.CSSProperties
    className?: string
}

export interface OptionProps extends Pick<SelectListProps, 'columns' | 'renderItem'> {
    data: any
    disabled: boolean
    index: number
    isActive: boolean
    isHover: boolean
    onHover: (index: number) => void
    groupKey: string
    onClick: SelectListProps['onChange']
}

export interface SelectOptionListBindFuncMap {
    handleHover: (index: number, force?: boolean) => void
    hoverMove: (step: number) => void
    getHoverIndex: () => number
}

export interface SelectResultProps
    extends Pick<
        ISelectProps,
        | 'datum'
        | 'disabled'
        | 'filterText'
        | 'onCreate'
        | 'onInput'
        | 'result'
        | 'multiple'
        | 'placeholder'
        | 'renderResult'
        | 'showArrow'
        | 'resultClassName'
        | 'compressedClassName'
        | 'size'
    > {
    onClear?(): void
    onRemove(data: any): void
    compressed: boolean
    focus: boolean
    onBindInputInstance(input: HTMLInputElement): void
}

export interface SelectResultItemProps extends Pick<SelectResultProps, 'resultClassName'> {
    result: any
    disabled: boolean
    onRemove: SelectResultProps['onRemove']
    title?: boolean
    renderResult: (data) => React.ReactNode
}

export interface SelectFilterHocProps extends ISelectProps, Pick<SelectProps, 'onFilter'> {}

export interface SelectInputProps extends Pick<SelectResultProps, 'multiple' | 'focus' | 'onInput'> {
    text: string
}

export interface SelectBoxOptionProps extends Pick<SelectListProps, 'columns' | 'renderItem'> {
    data: any
    disabled: boolean
    index: number
    isActive: boolean
    multiple: boolean
    onClick: SelectListProps['onChange']
}
export interface FormatBoxListDataHandlerProps
    extends Pick<SelectListProps, 'data' | 'columns' | 'results' | 'datum' | 'groupKey'> {
    children(params: { defaultIndex: number; sliceData: any[] }): React.ReactNode
}

export interface BoxListTitleProps {
    title: React.ReactNode

    style?: React.CSSProperties
}
