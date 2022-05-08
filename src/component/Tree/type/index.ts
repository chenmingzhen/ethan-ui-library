import TreeDatum, { NodeInfo, TreeDatumOptions } from '@/utils/Datum/Tree'
import React, { ReactNode } from 'react'

export interface TreeCheckboxProps {
    disabled?: boolean

    id: React.Key

    onChange(values: React.Key[], id: React.Key): void

    datum: TreeDatum
}

export interface TreeContentProps {
    active: boolean
    data: any[]
    expanded: boolean
    loader: TreeProps['loader']
    id: React.Key
    onChange(values: React.Key[], id: React.Key): void
    onToggle: () => void
    onDragOver: React.DragEventHandler<HTMLDivElement>
    onNodeClick: TreeProps['onNodeClick']
    renderItem: TreeProps['renderItem']
    parentClickExpand: TreeProps['parentClickExpand']
    childrenKey: TreeProps['childrenKey']
    expandIcons: TreeProps['expandIcons']
    setFetching: (fetch: boolean) => void
    fetching: boolean
    doubleClickExpand: TreeProps['doubleClickExpand']
    iconClass: TreeProps['iconClass']
    datum: TreeDatum
    nodeContentTextTag: ITreeProps['nodeContentTextTag']
}

export interface TreeNodeProps {
    id: React.Key
    expanded: boolean
    hoverElementRef: React.RefObject<HTMLDivElement>
    onDragStateChange: (isDragging: boolean) => void
    bindNode: TreeBranchProps['bindNode']
    unbindNode: TreeBranchProps['unbindNode']
    data: TreeProps['data']
    index: number
    keygen: TreeDatumOptions['keygen']
    onDrop: TreeBranchProps['onDrop']
    childrenClass: TreeProps['childrenClass']
    leafClass: TreeProps['leafClass']
    childrenKey: TreeProps['childrenKey']
    dragImageStyle: React.CSSProperties
    dragHoverExpand: TreeProps['dragHoverExpand']
    onToggle: () => void
    loader: TreeProps['loader']
    datum: TreeDatum
    onChange: TreeProps['onChange']
    onNodeClick: TreeProps['onNodeClick']
    renderItem: TreeProps['renderItem']
    parentClickExpand: TreeProps['parentClickExpand']
    expandIcons: TreeProps['expandIcons']
    doubleClickExpand: TreeProps['doubleClickExpand']
    iconClass: TreeProps['iconClass']
    nodeContentTextTag: ITreeProps['nodeContentTextTag']
    directory: ITreeProps['directory']
    dragImageSelector: TreeProps['dragImageSelector']
}

export interface TreeNodeState {
    fetching: boolean

    active: boolean
}

export interface TreeBranchState {
    expanded: boolean

    isDragging: boolean
}

export interface TreeBranchProps {
    className?: string
    data: any[]
    expanded: boolean
    parentKey?: React.Key
    isRoot?: boolean
    keygen: TreeDatumOptions['keygen']
    line?: boolean
    style?: React.CSSProperties
    disabled: TreeProps['disabled']
    mode: TreeProps['mode']
    /**  */
    bindNode: (id: React.Key, update: UpdateEvent) => Pick<TreeNodeState, 'active'>
    bindList: (id: React.Key, update: UpdateEvent) => Pick<TreeBranchState, 'expanded'>
    unbindNode: (id: React.Key) => void
    unbindList: (id: React.Key) => void
    onDrop: (id: React.Key, targetId: React.Key | undefined, position: number) => void
    childrenClass: TreeProps['childrenClass']
    leafClass: TreeProps['leafClass']
    childrenKey: TreeProps['childrenKey']
    dragImageStyle: TreeProps['dragImageStyle']
    dragHoverExpand: TreeProps['dragHoverExpand']
    onToggle: (id: React.Key, expanded: boolean) => void
    loader: TreeProps['loader']
    datum: TreeDatum
    onChange: TreeProps['onChange']
    onNodeClick: TreeProps['onNodeClick']
    renderItem: TreeProps['renderItem']
    parentClickExpand: TreeProps['parentClickExpand']
    expandIcons: TreeProps['expandIcons']
    doubleClickExpand: TreeProps['doubleClickExpand']
    iconClass: TreeProps['iconClass']
    nodeContentTextTag: ITreeProps['nodeContentTextTag']
    directory: ITreeProps['directory']
    dragImageSelector: TreeProps['dragImageSelector']
}

export interface TreeListProps extends Omit<TreeBranchProps, 'parentKey' | 'expanded'> {
    index: number
    id: React.Key
}

export interface TreeListState {
    isDragging: boolean
    expanded: boolean
}

export interface TreeProps<T = any> {
    active?: React.Key
    data: T[]
    defaultExpanded?: React.Key[]
    defaultValue?: React.Key[]
    disabled?: boolean | ((data: T) => boolean)
    expanded?: React.Key[]
    line?: boolean
    loader?: (id: React.Key, data: T, pathValue: NodeInfo) => void
    mode?: number
    onChange?: (values: React.Key[]) => void
    onClick?: (data: T, id: React.Key, pathMap: NodeInfo) => void
    onExpand?: (values: React.Key[]) => void
    onDrop?: (data: T, id: React.Key, targetId: React.Key | undefined, position: number) => void
    value?: React.Key[]
    parentClickExpand?: boolean
    defaultExpandAll?: boolean
    childrenKey?: string
    expandIcons?: [ReactNode, ReactNode] | ((id: React.Key, expanded: boolean, data: T) => React.ReactNode)
    dragImageStyle?: React.CSSProperties
    doubleClickExpand?: boolean
    className?: string
    style?: React.CSSProperties
    keygen: keyof T | ((data: T, id: React.Key) => string)
    renderItem?: ((data: T, isExpanded: boolean, id: React.Key) => React.ReactNode) | keyof T
    childrenClass?: (data: T) => string
    leafClass?: (data: T) => string
    dragHoverExpand?: boolean
    iconClass?: string
    onNodeClick?: (node: T, id: React.Key) => void
    dragImageSelector?: (data: T) => string
}

export interface ITreeProps<T = any> extends TreeProps<T> {
    directory?: boolean

    nodeContentTextTag?: keyof HTMLElementTagNameMap
}

export type DirectoryProps<T = any> = Omit<TreeProps<T>, 'onDrop' | 'mode' | 'onChange' | 'dragImageSelector'>

export type UpdateEvent = (value: boolean) => void
