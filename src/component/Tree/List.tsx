import React from 'react'
import classnames from 'classnames'
import { treeClass } from '@/styles'
import { empty } from '@/utils/func'
import { PureComponent } from '@/utils/component'
import Node from './Node'
import { TreeListProps } from './type'

class List extends PureComponent<TreeListProps> {
    hasExpanded = false

    static defaultProps = {
        id: '',
        line: true,
        className: treeClass('children'),
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

    /**
     * @todo animationList
     */
    render() {
        const { data, expanded, className, style, childrenClassName } = this.props

        if (!expanded && !this.hasExpanded) return null

        this.hasExpanded = true

        const newStyle = Object.assign({}, style, { display: expanded ? 'block' : 'none' })

        return (
            <div
                className={classnames(className, childrenClassName)}
                onDrop={empty}
                onDragOver={empty}
                style={newStyle}
            >
                {data.map(this.renderNode)}
            </div>
        )
    }
}

export default List
