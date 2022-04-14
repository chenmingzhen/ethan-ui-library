import React from 'react'
import classnames from 'classnames'
import { treeClass } from '@/styles'
import { empty } from '@/utils/func'
import { PureComponent } from '@/utils/component'
import Node from './Node'
import { TreeListProps } from './type'
import AnimationHeight from '../List/AnimationHeight'

interface ListState {
    hasDoneAnimation: boolean
}

class List extends PureComponent<TreeListProps, ListState> {
    hasExpanded = false

    static defaultProps = {
        id: '',
        line: true,
        className: treeClass('children'),
    }

    constructor(props: TreeListProps) {
        super(props)
        this.state = {
            hasDoneAnimation: props.expanded,
        }
    }

    componentDidUpdate() {
        if (this.props.expanded && !this.state.hasDoneAnimation) {
            this.setState({ hasDoneAnimation: true })
        }
    }

    getKey = (data, index) => {
        const { id, keygen } = this.props

        if (typeof keygen === 'function') return keygen(data, id)

        if (keygen) return data[keygen]

        return id + (id ? ',' : '') + index
    }

    renderNode = (child, index) => {
        const { data, isRoot, expanded, keygen, line, className, style, ...other } = this.props

        const id = this.getKey(child, index)

        return <Node {...other} data={child} id={id} index={index} key={id} keygen={keygen} listComponent={List} />
    }

    render() {
        const { data, expanded, className, style, childrenClassName } = this.props

        if (!expanded && !this.hasExpanded) return null

        this.hasExpanded = true

        const { hasDoneAnimation } = this.state

        const computedHeight = (expanded && !hasDoneAnimation) || !expanded ? 0 : 'auto'

        return (
            <AnimationHeight
                className={classnames(className, childrenClassName, expanded && 'show')}
                /** 添加empty使拖动时不会出现禁止符号 */
                onDrop={empty}
                onDragOver={empty}
                height={computedHeight}
                duration={200}
                style={style}
                show={expanded}
            >
                {data.map(this.renderNode)}
            </AnimationHeight>
        )
    }
}

export default List
