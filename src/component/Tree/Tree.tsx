import React, { Key } from 'react'
import { PureComponent } from '@/utils/component'
import DatumTree from '@/utils/Datum/Tree'
import { fastClone } from '@/utils/clone'
import Root from './Root'
import { NodeBind, TreeProps } from './type'

class Tree<T = any> extends PureComponent<TreeProps<T>> {
    nodes = new Map<Key, NodeBind>()

    datum: DatumTree

    static displayName = 'EthanTree'

    static defaultProps = {
        data: [],
        defaultExpanded: [],
        defaultValue: [],
        mode: 0,
        childrenKey: 'children',
        dragImageStyle: {},
        childrenClass() {},
        leafClass() {},
    }

    constructor(props) {
        super(props)

        this.datum = new DatumTree({
            data: props.data,
            keygen: props.keygen,
            mode: props.mode,
            value: props.value || props.defaultValue,
            disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
            childrenKey: props.childrenKey,
        })
    }

    componentDidUpdate(prevProps: TreeProps) {
        if (prevProps.expanded !== this.props.expanded) {
            this.handleExpanded(this.props.expanded)
        }

        if (this.props.onChange || this.props.onDrop) {
            this.datum.mode = this.props.mode

            if (prevProps.data !== this.props.data) this.datum.setData(this.props.data)
            if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || [])
        }
    }

    bindNode = (id: Key, update: NodeBind) => {
        this.nodes.set(id, update)

        const expanded = this.props.expanded || this.props.defaultExpanded

        if (this.props.defaultExpandAll) {
            return { expanded: true }
        }

        return { expanded: expanded && expanded.indexOf(id) >= 0 }
    }

    unbindNode = (id: Key) => {
        this.nodes.delete(id)
    }

    handleExpanded = expanded => {
        const expandedSet = new Set(expanded)

        for (const [id, update] of this.nodes) {
            update('expanded', expandedSet.has(id))
        }
    }

    handleNodeClick = (node, id: Key) => {
        const { onClick } = this.props

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

            const update = this.nodes.get(targetId)

            if (update) update('expanded', true)
        } else {
            /** 同一层中移动 */
            removeNode()
            removeNode = () => {}

            targetNode.splice(position, 0, removedNode)

            targetId = target.path[target.path.length - 1]
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
        } = this.props
        const onToggle = onExpand ? this.handleToggle : undefined

        return (
            <Root
                className={className}
                data={data}
                datum={this.datum}
                disabled={typeof disabled !== 'function' && disabled}
                bindNode={this.bindNode}
                keygen={keygen}
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
            />
        )
    }
}

export default Tree
