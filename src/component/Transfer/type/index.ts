import { KeyGen } from '@/type/Group'
import List, { DatumListProps } from '@/utils/Datum/List'
import React, { ReactNode } from 'react'

export type TransferDefaultData = { id: number; content: React.ReactNode }

export type TransferBaseData = TransferDefaultData | Record<string | number, any> | string | number | React.Key

export interface CustomRenderParams<Data> {
    onSelected: (data: Data) => void
    direction: 'left' | 'right'
    selectedKeys: React.Key[]
    value: Data[]
}

export interface TransferContextProps {
    selecteds: any[]
    setSelecteds
}

export interface TransferProps<
    Data extends TransferBaseData = TransferDefaultData,
    FormatData extends TransferBaseData = Data
> extends Pick<DatumListProps<Data, FormatData>, 'format' | 'prediction' | 'disabled'> {
    titles?: [React.ReactNode, React.ReactNode]
    data: Data[]
    keygen: KeyGen<Data>
    renderItem?: keyof Data | ((item: Data) => React.ReactNode)
    footers?: [React.ReactNode, React.ReactNode]
    operations?: [React.ReactNode, React.ReactNode]
    operationIcon?: boolean
    value?: FormatData[]
    className?: string
    style?: React.CSSProperties
    listClassName?: React.CSSProperties
    listStyle?: React.CSSProperties
    selectedKeys?: FormatData[]
    defaultSelectedKeys?: FormatData[]
    onSelectChange?: (sourceKeys: FormatData[], targetKeys: FormatData[]) => void
    empty?: React.ReactNode
    onFilter?: (text: string, value: FormatData, isSource: boolean) => boolean
    onSearch?: (text: string, isSource: boolean) => boolean
    itemClass?: string
    loading?: boolean | [boolean, boolean]
    rowsInView?: number
    lineHeight?: number
    listHeight?: number
    renderFilter?: any
    filterText?: string
    children?: (params: CustomRenderParams<FormatData>) => React.ReactNode
    datum?: List<Data>
}

export interface TransferState<FormatData> {
    selecteds: FormatData[][]
}

export interface TransferCardProps
    extends Pick<
        TransferProps<any>,
        | 'renderItem'
        | 'listStyle'
        | 'disabled'
        | 'empty'
        | 'onSearch'
        | 'rowsInView'
        | 'lineHeight'
        | 'listHeight'
        | 'renderFilter'
        | 'filterText'
        | 'listClassName'
        | 'itemClass'
        | 'onFilter'
    > {
    title: React.ReactNode
    data: any[]
    selecteds: any[]
    footer: React.ReactNode
    setSelecteds(index: number, selected: any[]): void
    loading: boolean
    index: number
    customRender: TransferProps<any>['children']
    getKey(item, i: number): React.Key
    values: any[]
}

export interface TransferItemProps extends Pick<TransferCardProps, 'lineHeight'> {
    index: number
    checkKey: React.Key
    content: ReactNode
    disabled: boolean
    itemClass: string
}

export interface TransferOperationButtonProps
    extends Pick<TransferProps<any>, 'disabled' | 'data' | 'operationIcon' | 'operations'> {
    datum: List<any>
    getKey(item, i: number): React.Key
}
