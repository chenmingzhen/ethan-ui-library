import React, { RefObject } from 'react'
import { SpinProps } from '../Spin'

export type CascaderDataValueType = string | number
export type CascaderData = { label: React.ReactNode; value: CascaderDataValueType; children?: CascaderData[] } | {}
export type ShowResultMode = 'parent' | 'child' | 'full'

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
    loader?: (dataItem: Data, node: CascaderNode) => void
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
    onChange?: (value: CascaderDataValueType[] | CascaderDataValueType[][], selected?: Data[]) => void
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
    placeholder?: string
    position?: 'drop-up' | 'drop-down'
    renderItem?: (data: Data) => React.ReactNode
    spinProps?: SpinProps
    style?: React.CSSProperties
    value?: CascaderDataValueType[] | CascaderDataValueType[][]
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
    showResultMode?: ShowResultMode
    onFilter?: boolean | ((text: string, node: CascaderNode) => boolean)
    loading?: boolean
    getPopupContainer?: () => HTMLElement
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
    getNodeInfoByDataItem(dataItem: CascaderData): CascaderNode
    getCheckboxStateByDataItem(dataItem: CascaderData): CascaderNodeValue
    addValue(dataItem: CascaderData): void
    removeValue(dataItem: CascaderData): void
    getDisabledByDataItem(dataItem: CascaderData): boolean
    replaceValue(dataItem: CascaderData): void
}

export interface CascaderNodeProps {
    active: boolean
    dataItem: CascaderData
    expandTrigger: CascaderProps['expandTrigger']
    loader: CascaderProps['loader']
    multiple: CascaderProps['multiple']
    onPathChange: (data: CascaderData, change: boolean, dismiss: boolean) => void
    childrenKey: CascaderProps['childrenKey']
    onItemClick: CascaderProps['onItemClick']
    changeOnSelect: CascaderProps['changeOnSelect']
    getContent(dataItem: CascaderData): React.ReactNode
    getNodeInfoByDataItem(dataItem: CascaderData): CascaderNode
    checked: boolean
    indeterminate: boolean
    addValue(dataItem: CascaderData): void
    removeValue(dataItem: CascaderData): void
    disabled: boolean
    replaceValue(dataItem: CascaderData): void
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
    getDataItemByKey(key: CascaderDataValueType): CascaderData
    getNodeInfoByDataItem(dataItem: CascaderData): CascaderNode
    showResultMode: ShowResultMode
    getCheckboxStateByDataItem(dataItem: CascaderData): CascaderNodeValue
    onInput?: (text: string) => void
    filterText?: string
    size?: CascaderProps['size']
    forwardedInputRef: RefObject<HTMLInputElement>
    valueKey: CascaderProps['valueKey']
}

export interface CascaderMoreProps {
    showNum: number
    itemNodes: React.ReactNode[]
}

export interface CascaderNode {
    children: CascaderDataValueType[]
    keyPath: CascaderDataValueType[]
    isDisabled: boolean
    indexPath: number[]
    key: CascaderDataValueType
}

export interface CascaderNodeValue {
    checked: boolean
    indeterminate: boolean
}

export interface FilterListProps {
    cascaderId: string
    filterText: string
    listStyle: React.CSSProperties
    nodeMapping: Map<CascaderDataValueType, CascaderNode>
    onFilter?: ((text: string, node: CascaderNode) => boolean) | boolean
    getDataItemByKey(key: CascaderDataValueType): CascaderData
    getContent(dataItem: CascaderData): React.ReactNode
    getKey: (data: CascaderData) => CascaderDataValueType
    onPathChange: (data: CascaderData, change: boolean, dismiss: boolean) => void
    onFilterTextChange: (text: string) => void
    multiple: boolean
    getCheckboxStateByDataItem(dataItem: CascaderData): CascaderNodeValue
    addValue(dataItem: CascaderData): void
    removeValue(dataItem: CascaderData): void
    text: CascaderProps['text']
}

export interface FilterListOptionProps {
    dataItem: CascaderData
    onPathChange: (data: CascaderData, change: boolean, dismiss: boolean) => void
    onFilterTextChange: (text: string) => void
    multiple: boolean
    getCheckboxStateByDataItem(dataItem: CascaderData): CascaderNodeValue
    addValue(dataItem: CascaderData): void
    removeValue(dataItem: CascaderData): void
    getDataItemByKey(key: CascaderDataValueType): CascaderData
    nodeMapping: Map<CascaderDataValueType, CascaderNode>
    node: CascaderNode
    getContent(dataItem: CascaderData): React.ReactNode
    filterText: string
}

export interface FilterListOptionItemProps {
    pathNode: CascaderNode
    pathDataItem: CascaderData
    addValue(dataItem: CascaderData): void
    removeValue(dataItem: CascaderData): void
    isPathHeader: boolean
    onPathChange: (data: CascaderData, change: boolean, dismiss: boolean) => void
    onFilterTextChange: (text: string) => void
    getContent(dataItem: CascaderData): React.ReactNode
    multiple: boolean
    isDisabledOption: boolean
    checked: boolean
    filterText: string
}
