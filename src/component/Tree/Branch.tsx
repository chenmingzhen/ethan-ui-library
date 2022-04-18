import React from 'react'
import classnames from 'classnames'
import { treeClass } from '@/styles'
import { empty } from '@/utils/func'
import { PureComponent } from '@/utils/component'
import { TreeBranchProps } from './type'
import AnimationHeight from '../List/AnimationHeight'
import List from './List'

interface ListState {
    hasDoneAnimation: boolean
}

class Branch extends PureComponent<TreeBranchProps, ListState> {
    hasExpanded = false

    static defaultProps = {
        id: '',
        line: true,
    }

    constructor(props: TreeBranchProps) {
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

    render() {
        const { data, expanded, className, style, isRoot } = this.props

        if (!expanded && !this.hasExpanded) return null

        this.hasExpanded = true

        const { hasDoneAnimation } = this.state

        const computedHeight = (expanded && !hasDoneAnimation) || !expanded ? 0 : 'auto'

        return (
            <AnimationHeight
                className={classnames(className, treeClass(!isRoot && 'branch'))}
                /** 添加empty使拖动时不会出现禁止符号 */
                onDrop={empty}
                onDragOver={empty}
                height={computedHeight}
                duration={200}
                style={style}
                show={expanded}
            >
                {data.map((child, index) => {
                    const id = this.getKey(child, index)

                    return <List index={index} {...this.props} data={child} key={id} id={id} />
                })}
            </AnimationHeight>
        )
    }
}

export default Branch
