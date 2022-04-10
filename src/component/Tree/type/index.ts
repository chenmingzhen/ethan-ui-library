import Tree from '@/utils/Datum/Tree'
import React, { ReactNode } from 'react'

export interface TreeContext {
    datum: Tree
}

export interface TreeCheckboxProps {
    disabled?: boolean

    id: React.Key

    onChange(values: React.Key[], id: React.Key): void

    datum
}

export interface TreeContentProps {
    active: boolean
    data: any[]
    draggable: boolean
    expanded: boolean
    loader: Function
    id: React.Key
    onChange(values: React.Key[], id: React.Key): void
    onToggle: Function
    onDragOver: React.DragEventHandler<HTMLDivElement>
    onDrop: Function
    onNodeClick: Function
    renderItem: string | Function
    parentClickExpand: boolean
    childrenKey: string
    expandIcons: React.ReactNode[]
    setFetching: (fetch: boolean) => void
    fetching: boolean
    doubleClickExpand: boolean
    iconClass: string
}

export interface TreeNodeProps {
    id: React.Key
    bindNode: Function
    unbindNode: Function
    data: any[]
    index: number
    listComponent: React.ComponentClass<TreeListProps>
    keygen
    onDrop: Function
    expandedMap: Map<React.Key, boolean>
    childrenClass: (data: any) => string
    leafClass: string
    childrenKey: string
    dragImageSelector
    dragImageStyle: React.CSSProperties
    dragHoverExpand: boolean
    onToggle: Function
    loader
}

export interface TreeNodeState {
    expanded: boolean

    fetching: boolean
}

export interface TreeListProps {
    className: string
    data: any[]
    expanded: boolean
    id: React.Key
    isRoot: boolean
    keygen
    line: boolean
    setLine: Function
    style: React.CSSProperties
    childrenClassName: string
}

export interface TreeRootProps {
    keygen: any
    data: any[]
    line: boolean
}

export interface TreeProps {
    data: any[]
    defaultExpanded: React.Key[]
    defaultValue: React.Key[]
    disabled: boolean
    expanded: React.Key[]
    line: boolean
    loader: (id: React.Key, data: any) => void
    mode: number
    onChange: Function
    onClick: Function
    onExpand: Function
    onDrop: Function
    value: React.Key[]
    parentClickExpand: boolean
    defaultExpandAll: boolean
    childrenKey: string
    expandIcons: [ReactNode, ReactNode]
    dragImageStyle: React.CSSProperties
    doubleClickExpand: boolean
}

export interface TreeState {
    active: React.Key
}

export type NodeBind = (state: keyof TreeNodeState & string, value: boolean) => void
