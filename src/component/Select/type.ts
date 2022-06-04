import List from '@/utils/Datum/List'
import React, { ReactNode } from 'react'

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
    itemsInView?: number
    loading?: React.ReactNode | boolean
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
}

export interface SelectState {
    control: 'mouse' | 'keyboard'
    focus: boolean
    position: 'drop-down' | 'drop-up'
}

export interface SelectListProps
    extends Pick<
        ISelectProps,
        'height' | 'lineHeight' | 'itemsInView' | 'text' | 'loading' | 'keygen' | 'datum' | 'position'
    > {
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
    data: any
    focus: boolean
    style?: React.CSSProperties
    className?: string
}

export interface OptionProps {
    data: any
    disabled: boolean
    index: number
    isActive: boolean
    isHover: boolean
    onHover
    renderItem
    groupKey
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
    onInputBlur(text: string | number): void
    onInputFocus(): void
    compressed: boolean
    focus: boolean
}

export interface SelectResultItemProps extends Pick<SelectResultProps, 'renderResult' | 'resultClassName'> {
    result: any
    disabled: boolean
    onRemove: SelectResultProps['onRemove']
    title?: boolean
}

export interface SelectFilterHocProps extends ISelectProps, Pick<SelectProps, 'onFilter'> {}

export interface SelectInputProps
    extends Pick<SelectResultProps, 'onInputFocus' | 'onInputBlur' | 'multiple' | 'focus' | 'onInput'> {
    text: string
}
