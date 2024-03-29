import React from 'react'
import classnames from 'classnames'
import { treeClass } from '@/styles'
import { preventDefault } from '@/utils/func'
import { PureComponent } from '@/utils/component'
import { TreeBranchProps } from './type'
import AnimationList from '../List'
import List from './List'
import { removePlaceElementDom } from './utils'

class Branch extends PureComponent<TreeBranchProps> {
    element: HTMLDivElement

    static defaultProps = {
        parentKey: '',
        line: true,
    }

    componentDidUpdate() {
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

    handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
        const rect = this.element.getBoundingClientRect()

        if (rect.top > e.clientY || rect.bottom < e.clientY || rect.left > e.clientX || rect.right < e.clientX) {
            removePlaceElementDom()
        }
    }

    render() {
        const { data, expanded, className, style, isRoot, parentKey, ...rest } = this.props

        return (
            <AnimationList
                className={classnames(className, treeClass(isRoot ? 'root' : 'branch', expanded && 'expanded'))}
                /** 添加empty使拖动时不会出现禁止符号 */
                onDrop={preventDefault}
                onDragOver={preventDefault}
                onDragLeave={isRoot ? this.handleDragLeave : undefined}
                style={style}
                show={expanded}
                animationTypes={['collapse', 'fade']}
                duration="fast"
                getRef={(el) => {
                    this.element = el
                }}
            >
                {data.map((child, index) => {
                    const id = this.props.keygen({ parentKey, data: child, index })

                    return <List {...rest} className={className} data={child} key={id} id={id} index={index} />
                })}
            </AnimationList>
        )
    }
}

export default Branch
