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
        parentKey: '',
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

        if (this.props.expanded) {
            this.branchVarInject()
        }
    }

    componentDidMount() {
        this.branchVarInject()
    }

    /** directory模式下计算line的位置（伪类中使用） */
    branchVarInject = () => {
        const { datum, directory, line, parentKey, isRoot } = this.props

        if (!directory || !line || !this.element || isRoot) return

        const result = datum.getPath(parentKey)

        const { path } = result

        /**
         * @description 伪类设置css样式
         * @see https://stackoverflow.com/questions/311052/setting-css-pseudo-class-rules-from-javascript
         */

        this.element.style.setProperty('--var-branch-pl', `${20 * path.length}px`)
    }

    handleDragLeave: React.DragEventHandler<HTMLDivElement> = e => {
        const rect = this.element.getBoundingClientRect()

        if (rect.top > e.clientY || rect.bottom < e.clientY || rect.left > e.clientX || rect.right < e.clientX) {
            removePlaceElementDom()
        }
    }

    render() {
        const { data, expanded, className, style, isRoot, parentKey, ...rest } = this.props

        if (!expanded && !this.hasExpanded) return null

        this.hasExpanded = true

        const { hasDoneAnimation } = this.state

        const computedHeight = (expanded && !hasDoneAnimation) || !expanded ? 0 : 'auto'

        return (
            <AnimationHeight
                className={classnames(className, treeClass(isRoot ? 'root' : 'branch', expanded && 'expanded'))}
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
                    const id = this.props.keygen({ parentKey, data: child, index })

                    return <List {...rest} className={className} data={child} key={id} id={id} index={index} />
                })}
            </AnimationHeight>
        )
    }
}

export default Branch
