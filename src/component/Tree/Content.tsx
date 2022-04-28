import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { treeClass } from '@/styles'
import { isArray, isFunc } from '@/utils/is'
import Spin from '../Spin'
import TreeCheckbox from './TreeCheckbox'
import { TreeContentProps } from './type'

class Content extends PureComponent<TreeContentProps> {
    get hasChildren() {
        const { data, childrenKey } = this.props

        const children = data[childrenKey]

        return children && children.length > 0
    }

    handleNodeClick = () => {
        const { data, id, parentClickExpand, onNodeClick } = this.props

        if (this.hasChildren && parentClickExpand) {
            this.handleIndicatorClick()
        } else {
            onNodeClick(data, id)
        }
    }

    handleNodeExpand = () => {
        const { doubleClickExpand } = this.props

        if (!doubleClickExpand) return

        if (this.hasChildren) this.handleIndicatorClick()
    }

    handleIndicatorClick = () => {
        const { id, data, onToggle, loader, childrenKey, setFetching, datum } = this.props

        onToggle()

        if (data[childrenKey] !== undefined) return

        const nodeInfo = datum.getPath(id)

        setFetching(true)

        loader(id, data, nodeInfo)
    }

    getIndicatorIcon = () => {
        const { expanded, data, id, expandIcons } = this.props

        if (isArray(expandIcons)) {
            return expandIcons[expanded ? 1 : 0]
        }

        if (isFunc(expandIcons)) {
            return expandIcons(id, expanded, data)
        }

        return <span className={treeClass('default-icon')} />
    }

    renderNode = () => {
        const { id, data, renderItem, expanded } = this.props

        const render = typeof renderItem === 'function' ? renderItem : d => d[renderItem]

        return render(data, expanded, id)
    }

    renderIndicator = () => {
        const { data, expanded, loader, childrenKey, fetching, iconClass } = this.props

        const children = data[childrenKey]

        const icon = this.getIndicatorIcon()

        const indicator = (
            <a
                onClick={this.handleIndicatorClick}
                className={classnames(treeClass(`icon-${expanded ? 'sub' : 'plus'}`), iconClass)}
            >
                {icon}
            </a>
        )

        if ((children && children.length > 0) || (loader && !fetching))
            return <span className={treeClass('indicator')}>{indicator}</span>

        if (fetching && !children)
            return (
                <span className={treeClass('indicator')}>
                    <Spin name="ring" size={12} />
                </span>
            )

        return <span className={treeClass('indicator')} />
    }

    render() {
        const { data, onToggle, onChange, expanded, onDragOver, nodeContentTextTag, ...other } = this.props

        const Tag = nodeContentTextTag as React.ElementType

        return (
            <div onDragOver={onDragOver} className={treeClass('item')}>
                {this.renderIndicator()}

                <div className={treeClass('content')}>
                    {onChange && <TreeCheckbox {...other} onChange={onChange} />}
                    <Tag
                        className={treeClass('text', other.active && 'active')}
                        onClick={this.handleNodeClick}
                        onDoubleClick={this.handleNodeExpand}
                    >
                        {this.renderNode()}
                    </Tag>
                </div>
            </div>
        )
    }
}

export default Content
