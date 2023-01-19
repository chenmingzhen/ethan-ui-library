import React, { ReactNode } from 'react'

type KeyGen<T> = T extends string | number ? true : keyof T | true | ((data: T) => string | number)

type TransferInferFormat<Data> = Data extends string | number ? never : keyof Data | ((data: Data) => string | number)

type TransferInferRenderItem<Data> =
    | (Data extends string | number ? React.ReactNode : keyof Data)
    | ((item: Data) => React.ReactNode)

export type TransferBaseData = Record<string, any> | string | number

export interface CustomRenderParams<Data, FormatData> {
    onSelected: (data: FormatData) => void
    direction: 'left' | 'right'
    selectedKeys: React.Key[]
    value: FormatData[]
    data: Data[]
    text: string
}

export interface TransferContextProps {
    selectedKeys: any[]
    setSelectedKeys(index: number, selectedKeys: any[]): void
}

export interface TransferProps<Data extends TransferBaseData, FormatData extends TransferBaseData = Data> {
    titles?: [React.ReactNode, React.ReactNode]
    data: Data[]
    keygen: KeyGen<Data>
    renderItem?: TransferInferRenderItem<Data>
    footers?: [React.ReactNode, React.ReactNode]
    operations?: [React.ReactNode, React.ReactNode]
    operationIcon?: boolean
    value?: FormatData[]
    defaultValue?: FormatData[]
    className?: string
    style?: React.CSSProperties
    listClassName?: string
    listStyle?: React.CSSProperties
    selectedKeys?: FormatData[]
    defaultSelectedKeys?: FormatData[]
    onSelectChange?: (sourceKeys: FormatData[], targetKeys: FormatData[]) => void
    empty?: React.ReactNode
    onFilter?: (text: string, value: FormatData, isSource: boolean) => boolean
    onSearch?: (text: string, isSource: boolean) => boolean
    itemClass?: string
    loading?: boolean | [boolean, boolean]
    lineHeight?: number
    listHeight?: number
    renderFilter?: any
    filterText?: string
    children?: (params: CustomRenderParams<Data, FormatData>) => React.ReactNode
    format?: TransferInferFormat<Data>
    prediction?(formatValue: FormatData, data: Data): boolean
    disabled?: boolean | ((data: Data) => boolean)
    onChange?(value: FormatData[], data: Data, checked: boolean)
}

export interface TransferCardProps
    extends Pick<
        TransferProps<any>,
        | 'renderItem'
        | 'listStyle'
        | 'disabled'
        | 'empty'
        | 'onSearch'
        | 'lineHeight'
        | 'listHeight'
        | 'renderFilter'
        | 'filterText'
        | 'listClassName'
        | 'itemClass'
        | 'onFilter'
        | 'keygen'
    > {
    title: React.ReactNode
    data: any[]
    selectedKeys: any[]
    footer: React.ReactNode
    onSelectedKeysChange(index: number, selected: any[]): void
    loading: boolean
    index: number
    customRender: TransferProps<any>['children']
    values: any[]
}

export interface TransferItemProps {
    index: number
    checkKey: React.Key
    content: ReactNode
    disabled: boolean
    itemClass: string
    lineHeight: TransferCardProps['lineHeight']
}

export interface TransferOperationButtonProps
    extends Pick<TransferProps<any>, 'disabled' | 'data' | 'operationIcon' | 'operations' | 'keygen'> {
    add(value, unshift: boolean)
    remove(value)
}
