import React from 'react'
import TreeDatum, { TreeDatumOptions } from '@/utils/Datum/Tree'
import { SpinProps } from '../Spin'

export interface CascaderState {
    focus: boolean
    path: React.Key[]
    position: CascaderProps['position']
    listStyle: React.CSSProperties
}

export interface CascaderProps<T = any> {
    clearable?: boolean
    data: T[]
    defaultValue?: T[]
    disabled?: boolean | ((data: T) => boolean)
    expandTrigger?: 'click' | 'hover' | 'hover-only'
    height?: number
    keygen?: keyof T | ((data: T, parentKey: React.Key) => React.Key)
    loader?: (key: React.Key, data: T) => void
    /** @todo */
    mode: number
    onBlur?: () => void
    onChange?: (value: React.Key[], selected?: T[]) => void
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
    placeholder?: React.ReactNode
    position?: 'drop-up' | 'drop-down'
    renderItem?: keyof T | ((data: T, active: boolean) => React.ReactNode)
    spinProps?: SpinProps
    style?: React.CSSProperties
    value?: T[]
    absolute?: boolean
    zIndex?: number
    childrenKey?: keyof T
    finalDismiss?: boolean
    onCollapse?: (collapse: boolean) => void
    text?: { noData?: React.ReactNode }
    multiple?: boolean
    onItemClick?: (data: T) => void
    renderResult?: keyof T | ((data: T) => React.ReactNode)
    /** @todo  */
    changeOnSelect?: boolean
    compressed?: boolean
}

export interface CascaderListProps extends Omit<CascaderNodeProps, 'active' | 'id'> {
    data: CascaderProps['data']
    currentPathActiveId: React.Key
    parentId: React.Key
    text: CascaderProps['text']
    keygen: TreeDatumOptions['keygen']
}

export interface CascaderNodeProps {
    active?: boolean
    data?: CascaderProps['data']
    datum: TreeDatum
    expandTrigger?: CascaderProps['expandTrigger']
    id: React.Key
    loader?: CascaderProps['loader']
    multiple?: CascaderProps['multiple']
    onChange?: CascaderProps['onChange']
    onPathChange: (id: React.Key, data: any, path: React.Key[]) => void
    path: React.Key[]
    renderItem?: CascaderProps['renderItem']
    childrenKey?: CascaderProps['childrenKey']
    onItemClick?: CascaderProps['onItemClick']
    changeOnSelect?: CascaderProps['changeOnSelect']
}

export interface CascaderResultProps {
    clearable?: CascaderProps['clearable']
    datum: TreeDatum
    disabled?: CascaderProps['disabled']
    multiple?: CascaderProps['multiple']
    onClear: () => void
    onPathChange: (id: React.Key, data: any, path: React.Key[]) => void
    placeholder?: CascaderProps['placeholder']
    renderItem?: CascaderProps['renderItem']
    renderResult?: CascaderProps['renderResult']
    style?: CascaderProps['style']
    value?: CascaderProps['value']
    compressed?: CascaderProps['compressed']
    cascaderId: React.Key
}

export interface CascaderMoreProps {
    showNum: number
    itemNodes: React.ReactNode[]
    dataId: React.Key
}
