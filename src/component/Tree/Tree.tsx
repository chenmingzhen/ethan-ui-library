import React, { Key } from 'react'
import { PureComponent } from '@/utils/component'
import DatumTree, { KeygenParams } from '@/utils/Datum/Tree'
import { fastClone } from '@/utils/clone'
import classnames from 'classnames'
import { treeClass } from '@/styles'
import { UpdateEvent, ITreeProps } from './type'
import Branch from './Branch'
import Directory from './Directory'

interface TreeState {
    active: React.Key
}

class Tree<T = any> extends PureComponent<ITreeProps<T>, TreeState> {
    nodes = new Map<Key, UpdateEvent>()

    lists = new Map<Key, UpdateEvent>()

    datum: DatumTree

    static displayName = 'EthanTree'

    static Directory = Directory

    static defaultProps = {
        data: [],
        nodeContentTextTag: 'span',
        line: true,
        defaultExpanded: [],
        defaultValue: [],
        mode: 0,
        childrenKey: 'children',
        dragImageStyle: {},
        childrenClass() {},
        leafClass() {},
    }

    get active() {
        const { active } = this.props

        return active === undefined ? this.state.active : active
    }

    constructor(props) {
        super(props)

        this.datum = new DatumTree({
            data: props.data,
            keygen: this.keygen,
            mode: props.mode,
            value: props.value || props.defaultValue,
            disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
            childrenKey: props.childrenKey,
        })

        this.state = {
            active: props.active,
        }
    }

    componentDidUpdate(prevProps: ITreeProps) {
        if (prevProps.expanded !== this.props.expanded) {
            this.handleExpanded(this.props.expanded)
        }

        if (prevProps.active !== this.props.active) {
            this.handleActive(this.props.active)
        }

        if (this.props.onChange || this.props.onDrop) {
            this.datum.mode = this.props.mode

            if (prevProps.data !== this.props.data) {
                this.datum.setData(this.props.data)

                /** 拖拽后需要重新触发Node的active */
                this.handleActive(this.active)
            }
            if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || [])
        }
    }

    keygen = ({ data, index, parentKey = '' }: KeygenParams) => {
        const { keygen } = this.props

        if (typeof keygen === 'function') return keygen(data, parentKey)

        if (keygen) return data[keygen]

        return parentKey + (parentKey ? ',' : '') + index
    }

    bindNode = (id: Key, update: UpdateEvent) => {
        this.nodes.set(id, update)

        const active = this.props.active === id

        return { active }
    }

    unbindNode = (id: Key) => {
        this.nodes.delete(id)
    }

    bindList = (id: Key, update: UpdateEvent) => {
        this.lists.set(id, update)

        if (this.props.defaultExpandAll) {
            return { expanded: true }
        }

        const expanded = this.props.expanded || this.props.defaultExpanded

        return { expanded: expanded && expanded.indexOf(id) >= 0 }
    }

    unbindList = (id: Key) => {
        this.lists.delete(id)
    }

    handleActive = (activeKey?: React.Key) => {
        for (const [id, updateNodeActiveState] of this.nodes) {
            updateNodeActiveState(activeKey === id)
        }
    }

    handleExpanded = expanded => {
        const expandedSet = new Set(expanded)

        for (const [id, updateNodeExpandedState] of this.lists) {
            updateNodeExpandedState(expandedSet.has(id))
        }
    }

    handleNodeClick = (node, id: Key) => {
        const { onClick, active } = this.props

        if (active === undefined) {
            if (this.state.active === id) {
                this.setState({ active: null }, () => {
                    this.handleActive(null)
                })
            } else {
                this.setState({ active: id }, () => {
                    this.handleActive(id)
                })
            }
        }

        if (onClick) {
            onClick(node, id, this.datum.getPath(id))
        }
    }

    handleToggle = (id: Key) => {
        const { expanded, onExpand } = this.props
        let newExpanded

        if (!expanded && onExpand) {
            onExpand([id])
            return
        }

        if (expanded.indexOf(id) >= 0) {
            newExpanded = expanded.filter(e => e !== id)
        } else {
            newExpanded = [...expanded, id]
        }

        if (onExpand) onExpand(newExpanded)
    }

    handleDrop = (id: Key, targetId: Key, position: number) => {
        const { childrenKey } = this.props

        const current = this.datum.getPath(id)

        const target = this.datum.getPath(targetId)

        const data = fastClone(this.props.data)

        /** 移动的节点 */
        let removedNode = data

        /** 移动节点初始所在层级的所有节点List */
        let sameRemovedNodeLevelNodeList

        let removeNode: () => any

        /** 找到移动节点的data信息 */
        current.indexPath.forEach((p, i) => {
            if (i < current.indexPath.length - 1) {
                removedNode = removedNode[p][childrenKey]
            } else {
                sameRemovedNodeLevelNodeList = removedNode

                removeNode = () => sameRemovedNodeLevelNodeList.splice(p, 1)[0]

                removedNode = removedNode[p]
            }
        })

        let targetNode = data

        target.indexPath.forEach((p, i) => {
            if (i < target.indexPath.length - 1) {
                targetNode = targetNode[p][childrenKey]
            }
        })

        if (position === -1) {
            targetNode = targetNode[target.index]

            if (!Array.isArray(targetNode[childrenKey])) targetNode[childrenKey] = []

            targetNode[childrenKey].push(removedNode)

            position = targetNode[childrenKey].length - 1

            const updateNodeActiveState = this.nodes.get(targetId)

            if (updateNodeActiveState) updateNodeActiveState(true)
        } else {
            /** 同一层中移动 */
            removeNode()
            removeNode = () => {}

            targetNode.splice(position, 0, removedNode)
        }

        removeNode()

        this.props.onDrop(data, id, targetId, position)
    }

    render() {
        const {
            className,
            style,
            data,
            disabled,
            line,
            keygen,
            onExpand,
            onChange,
            renderItem,
            mode,
            onDrop,
            loader,
            parentClickExpand,
            childrenKey,
            expandIcons,
            dragImageStyle,
            childrenClass,
            leafClass,
            dragHoverExpand,
            doubleClickExpand,
            iconClass,
            directory,
            nodeContentTextTag,
        } = this.props
        const onToggle = onExpand ? this.handleToggle : undefined

        return (
            <Branch
                nodeContentTextTag={nodeContentTextTag}
                className={classnames(
                    treeClass('_', line ? 'with-line' : 'no-line', directory && 'directory'),
                    className
                )}
                data={data}
                datum={this.datum}
                disabled={typeof disabled !== 'function' && disabled}
                bindNode={this.bindNode}
                keygen={this.keygen}
                line={line}
                loader={loader}
                mode={mode}
                unbindNode={this.unbindNode}
                onChange={onChange}
                onDrop={onDrop && this.handleDrop}
                onToggle={onToggle}
                onNodeClick={this.handleNodeClick}
                renderItem={renderItem}
                style={style}
                parentClickExpand={parentClickExpand}
                childrenKey={childrenKey}
                expandIcons={expandIcons}
                dragImageStyle={dragImageStyle}
                childrenClass={childrenClass}
                leafClass={leafClass}
                dragHoverExpand={dragHoverExpand}
                doubleClickExpand={doubleClickExpand}
                iconClass={iconClass}
                unbindList={this.unbindList}
                bindList={this.bindList}
                directory={directory}
                isRoot
                expanded
            />
        )
    }
}

export default Tree
