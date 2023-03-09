import React, { ReactNode } from 'react'

export type TransferDataValueType = React.Key

export type TransferData = { label: React.ReactNode; value: TransferDataValueType } | {}

export interface TransferProps<Data = TransferData> {
    titles?: [React.ReactNode, React.ReactNode]
    data: Data[]
    renderItem?: (data: Data, index: number) => React.ReactNode
    footers?: [React.ReactNode, React.ReactNode]
    operations?: [React.ReactNode, React.ReactNode]
    operationIcon?: boolean
    value?: TransferDataValueType[]
    defaultValue?: TransferDataValueType[]
    className?: string
    style?: React.CSSProperties
    listClassName?: string
    listStyle?: React.CSSProperties
    selectedKeys?: TransferDataValueType[]
    defaultSelectedKeys?: TransferDataValueType[]
    onSelectChange?: (sourceKeys: TransferDataValueType[], targetKeys: TransferDataValueType[]) => void
    empty?: React.ReactNode
    onFilter?: (text: string, data: Data, isSource: boolean) => boolean
    onSearch?: (text: string, isSource: boolean) => boolean
    itemClass?: string
    loading?: boolean | [boolean, boolean]
    lineHeight?: number
    listHeight?: number
    disabled?: boolean | ((data: Data, values: TransferDataValueType[]) => boolean)
    onChange?(value: TransferDataValueType[], data: Data, checked: boolean)
    labelKey?: string
    valueKey?: string
    oneWay?: boolean
}

export interface TransferCardProps {
    title: React.ReactNode
    data: TransferData[]
    footer: React.ReactNode
    loading: boolean
    index: number
    getKey: (dataItem: TransferData, index: number) => TransferDataValueType
    getContent: (dataItem: TransferData, index: number) => React.ReactNode
    listStyle: TransferProps['listStyle']
    disabled: (dataItem: TransferData) => boolean
    isDisabledAll: boolean
    empty: TransferProps['empty']
    onSearch: TransferProps['onSearch']
    lineHeight: TransferProps['lineHeight']
    listHeight: TransferProps['listHeight']
    listClassName: TransferProps['listClassName']
    itemClass: TransferProps['itemClass']
    onFilter: TransferProps['onFilter']
    sideSelectedKeys: TransferDataValueType[]
    oneWay: TransferProps['oneWay']
    onSelectedKeyChange(index: number, sideSelectedKeys: TransferDataValueType[]): void
    removeByDataItems?: (dataItems: TransferData[]) => void
}

export interface TransferItemProps {
    index: number
    checkKey: React.Key
    content: ReactNode
    disabled: boolean
    itemClass: string
    lineHeight: TransferCardProps['lineHeight']
    sideSelectedKeys: TransferDataValueType[]
    oneWay: TransferProps['oneWay']
    onSelectedKeyChange(index: number, sideSelectedKeys: TransferDataValueType[]): void
    removeByDataItems?: (dataItems: TransferData[]) => void
    dataItem: TransferData
}

export interface TransferOperationButtonProps {
    addByDataItems(dataItems: TransferData[])
    removeByDataItems(dataItems: TransferData[])
    operationIcon: boolean
    operations: React.ReactNode[]
    isDisabledAll: boolean
    selectedKeys: TransferDataValueType[][]
    onSelectedKeyChange(index: number, sideSelectedKeys: TransferDataValueType[]): void
    cacheDataMapping: Map<React.Key, TransferData>
    disabled: (dataItem: TransferData) => boolean
    oneWay: TransferProps['oneWay']
}
