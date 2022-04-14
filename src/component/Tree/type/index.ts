import TreeDatum, { PathMapValue } from '@/utils/Datum/Tree'
import React, { ReactNode } from 'react'

export interface TreeCheckboxProps {
    disabled?: boolean

    id: React.Key

    onChange(values: React.Key[], id: React.Key): void

    datum: TreeDatum
}

export interface TreeContentProps {
    data: any[]
    draggable: boolean
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
}

export interface TreeNodeProps {
    id: React.Key
    bindNode: (id: React.Key, update: NodeBind) => void
    unbindNode: (id: React.Key) => void
    data: TreeProps['data']
    index: number
    listComponent: React.ComponentClass<TreeListProps>
    keygen: TreeProps['keygen']
    onDrop: TreeListProps['onDrop']
    childrenClass: TreeProps['childrenClass']
    leafClass: TreeProps['leafClass']
    childrenKey: TreeProps['childrenKey']
    dragImageStyle: React.CSSProperties
    dragHoverExpand: TreeProps['dragHoverExpand']
    onToggle: (id: React.Key, expanded: boolean) => void
    loader: TreeProps['loader']
    datum: TreeDatum
    draggable: boolean
    onChange: TreeProps['onChange']
    onNodeClick: TreeProps['onNodeClick']
    renderItem: TreeProps['renderItem']
    parentClickExpand: TreeProps['parentClickExpand']
    expandIcons: TreeProps['expandIcons']
    doubleClickExpand: TreeProps['doubleClickExpand']
    iconClass: TreeProps['iconClass']
}

export interface TreeNodeState {
    expanded: boolean

    fetching: boolean
}

export interface TreeListProps {
    className?: string
    data: any[]
    expanded: boolean
    id: React.Key
    isRoot?: boolean
    keygen: TreeProps['keygen']
    line?: boolean
    style?: React.CSSProperties
    childrenClassName: string
    /**  */
    bindNode: (id: React.Key, update: NodeBind) => void
    unbindNode: (id: React.Key) => void
    onDrop: (id: React.Key, targetId: React.Key | undefined, position: number) => void
    childrenClass: TreeProps['childrenClass']
    leafClass: TreeProps['leafClass']
    childrenKey: TreeProps['childrenKey']
    dragImageStyle: TreeProps['dragImageStyle']
    dragHoverExpand: TreeProps['dragHoverExpand']
    onToggle: (id: React.Key, expanded: boolean) => void
    loader: TreeProps['loader']
    datum: TreeDatum
    draggable: boolean
    onChange: TreeProps['onChange']
    onNodeClick: TreeProps['onNodeClick']
    renderItem: TreeProps['renderItem']
    parentClickExpand: TreeProps['parentClickExpand']
    expandIcons: TreeProps['expandIcons']
    doubleClickExpand: TreeProps['doubleClickExpand']
    iconClass: TreeProps['iconClass']
}

export interface TreeRootProps {
    keygen: TreeProps['keygen']
    data: TreeProps['data']
    line: boolean
}

/** TODO 添加active状态 */
export interface TreeProps<T = any> {
    data: T[]
    defaultExpanded?: React.Key[]
    defaultValue?: React.Key[]
    disabled?: boolean
    expanded?: React.Key[]
    line?: boolean
    loader?: (id?: React.Key, data?: T) => void
    mode?: number
    onChange?: (values: React.Key[]) => void
    onClick?: (data: T, id: React.Key, pathMap: PathMapValue) => void
    onExpand?: (values: React.Key[]) => void
    onDrop?: (data: T, id: React.Key, targetId: React.Key | undefined, position: number) => void
    value?: React.Key[]
    parentClickExpand?: boolean
    defaultExpandAll?: boolean
    childrenKey?: string
    expandIcons?: [ReactNode, ReactNode]
    dragImageStyle?: React.CSSProperties
    doubleClickExpand?: boolean
    className?: string
    style?: React.CSSProperties
    keygen?: keyof T | ((data: T, id: React.Key) => string)
    renderItem?: ((data: T, isExpanded: boolean, id: React.Key) => React.ReactNode) | keyof T
    childrenClass?: (data: T) => string
    leafClass?: (data: T) => string
    dragHoverExpand?: boolean
    iconClass?: string
    onNodeClick?: (node: T, id: React.Key) => void
}

export type NodeBind = (state: keyof TreeNodeState & string, value: boolean) => void
