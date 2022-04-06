import React, { Key } from 'react'
import immer from 'immer'
import { PureComponent } from '@/utils/component'
import DatumTree from '@/utils/Datum/Tree'
import Root from './Root'
import { NodeBind, TreeProps, TreeState } from './type'

class Tree extends PureComponent<TreeProps, TreeState> {
    nodes = new Map<Key, NodeBind>()

    datum: DatumTree

    static defaultProps = {
        data: [],
        defaultExpanded: [],
        defaultValue: [],
        mode: 0,
        childrenKey: 'children',
        dragImageStyle: {},
        dragImageSelector() {},
        childrenClass() {},
        leafClass() {},
    }

    constructor(props) {
        super(props)

        this.state = { active: null }

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
        if (prevProps.active !== this.props.active) {
            this.handleActive(this.props.active)
        }

        if (this.props.onChange || this.props.onDrop) {
            this.datum.mode = this.props.mode

            if (prevProps.data !== this.props.data) this.datum.setData(this.props.data)
            if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || [])
        }
    }

    bindNode = (id: Key, update: NodeBind) => {
        this.nodes.set(id, update)

        const active = this.props.active === id

        const expanded = this.props.expanded || this.props.defaultExpanded

        if (this.props.defaultExpandAll) {
            return { active, expanded: true }
        }

        return { active, expanded: expanded && expanded.indexOf(id) >= 0 }
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

    handleActive = (active: Key) => {
        for (const [id, update] of this.nodes) {
            update('active', id === active)
        }
    }

    handleNodeClick = (node, id: Key) => {
        const { active, onClick } = this.props

        /** 不处理受控 */
        if (active === undefined) {
            this.setState({ active: id }, () => {
                this.handleActive(id)
            })
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
        const data = immer(this.props.data, draft => {
            let node = draft
            let temp
            let removeNode
            current.indexPath.forEach((p, i) => {
                if (i < current.indexPath.length - 1) {
                    node = node[p][childrenKey]
                } else {
                    temp = node
                    removeNode = () => temp.splice(p, 1)[0]
                    node = node[p]
                }
            })

            let tnode = draft
            target.indexPath.forEach((p, i) => {
                if (i < target.indexPath.length - 1) {
                    tnode = tnode[p][childrenKey]
                } else if (tnode === temp) {
                    // same parent
                    removeNode()
                    removeNode = () => {}
                }
            })

            if (position === -1) {
                tnode = tnode[target.index]
                if (!Array.isArray(tnode[childrenKey])) tnode[childrenKey] = []
                tnode[childrenKey].push(node)
                position = tnode[childrenKey].length - 1
                const update = this.nodes.get(targetId)
                if (update) update('expanded', true)
            } else {
                tnode.splice(position, 0, node)
                targetId = target.path[target.path.length - 1]
            }

            removeNode()
        })
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
            dragImageSelector,
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
                dragImageSelector={dragImageSelector}
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
