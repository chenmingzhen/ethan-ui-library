import React from 'react'
import classnames from 'classnames'
import { treeClass } from '@/styles'
import { empty } from '@/utils/func'
import { PureComponent } from '@/utils/component'
import { TreeBranchProps } from './type'
import AnimationHeight from '../List/AnimationHeight'
import List from './List'
import { removePlaceElementDom } from './utils'

interface ListState {
    hasDoneAnimation: boolean
}

class Branch extends PureComponent<TreeBranchProps, ListState> {
    hasExpanded = false

    element: HTMLDivElement

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

    handleDragLeave: React.DragEventHandler<HTMLDivElement> = e => {
        const rect = this.element.getBoundingClientRect()

        if (rect.top > e.clientY || rect.bottom < e.clientY || rect.left > e.clientX || rect.right < e.clientX) {
            removePlaceElementDom()
        }
    }

    render() {
        const { data, expanded, className, style, isRoot } = this.props

        if (!expanded && !this.hasExpanded) return null

        this.hasExpanded = true

        const { hasDoneAnimation } = this.state

        const computedHeight = (expanded && !hasDoneAnimation) || !expanded ? 0 : 'auto'

        return (
            <AnimationHeight
                className={classnames(className, treeClass(isRoot ? 'root' : 'branch'))}
                /** 添加empty使拖动时不会出现禁止符号 */
                onDrop={empty}
                onDragOver={empty}
                onDragLeave={isRoot ? this.handleDragLeave : undefined}
                height={computedHeight}
                duration={200}
                style={style}
                show={expanded}
                forwardedRef={el => {
                    this.element = el
                }}
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
