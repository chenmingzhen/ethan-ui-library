import React from 'react'
import { SpinProps } from '../Spin'

export type CascaderDataValueType = string | number
export type CascaderData = { label: React.ReactNode; value: CascaderDataValueType; children?: CascaderData[] } | {}

export interface CascaderProps<Data = CascaderData> {
    labelKey?: string
    valueKey?: string
    childrenKey?: string
    clearable?: boolean
    data: Data[]
    defaultValue?: CascaderDataValueType[]
    disabled?: boolean | ((data: Data) => boolean)
    expandTrigger?: 'click' | 'hover'
    height?: number
    loader?: (key: React.Key, data: Data) => void
    mode?: number
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
    onChange?: (value: CascaderDataValueType[] | CascaderDataValueType[][], selected?: Data[]) => void
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
    placeholder?: React.ReactNode
    position?: 'drop-up' | 'drop-down'
    renderItem?: (data: Data) => React.ReactNode
    spinProps?: SpinProps
    style?: React.CSSProperties
    value?: CascaderDataValueType[] | CascaderDataValueType[][]
    portal?: boolean
    zIndex?: number
    finalDismiss?: boolean
    onCollapse?: (collapse: boolean) => void
    text?: { noData?: React.ReactNode }
    multiple?: boolean
    onItemClick?: (data: Data) => void
    changeOnSelect?: boolean
    compressed?: boolean
    size?: 'large' | 'default' | 'small'
    border?: boolean
    className?: string
}

export interface CascaderListProps {
    getKey: (data: CascaderData) => CascaderDataValueType
    currentData: CascaderProps['data']
    currentPathActiveId: React.Key
    expandTrigger: CascaderProps['expandTrigger']
    loader: CascaderProps['loader']
    multiple: CascaderProps['multiple']
    onPathChange: (data: CascaderData, change: boolean, dismiss: boolean) => void
    childrenKey: CascaderProps['childrenKey']
    onItemClick: CascaderProps['onItemClick']
    changeOnSelect: CascaderProps['changeOnSelect']
    getContent(dataItem: CascaderData): React.ReactNode
    disabled(dataItem: CascaderData): boolean
}

export interface CascaderNodeProps {
    active: boolean
    dataItem: CascaderData
    expandTrigger: CascaderProps['expandTrigger']
    id: React.Key
    loader: CascaderProps['loader']
    multiple: CascaderProps['multiple']
    onPathChange: (data: CascaderData, change: boolean, dismiss: boolean) => void
    childrenKey: CascaderProps['childrenKey']
    onItemClick: CascaderProps['onItemClick']
    changeOnSelect: CascaderProps['changeOnSelect']
    getContent(dataItem: CascaderData): React.ReactNode
    disabled(dataItem: CascaderData): boolean
}

export interface CascaderResultProps {
    clearable: CascaderProps['clearable']
    isDisabled: boolean
    multiple: CascaderProps['multiple']
    onClear: () => void
    onPathChange: (data: CascaderData, change: boolean, dismiss: boolean) => void
    placeholder: CascaderProps['placeholder']
    getContent: (dataItem: CascaderData) => React.ReactNode
    value: CascaderDataValueType[][]
    compressed: CascaderProps['compressed']
    cascaderId: React.Key
    getDataItemByKey(key: CascaderDataValueType): CascaderData
    getNodeInfoByDataItem(dataItem: CascaderData): CascaderNode
}

export interface CascaderMoreProps {
    showNum: number
    itemNodes: React.ReactNode[]
    dataId: React.Key
}

export interface CascaderNode {
    children: CascaderDataValueType[]
    keyPath: CascaderDataValueType[]
    isDisabled: boolean
    indexPath: number[]
}
