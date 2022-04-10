import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { treeClass } from '@/styles'
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
        const { id, data, onToggle, loader, childrenKey, setFetching } = this.props

        onToggle()

        if (data[childrenKey] !== undefined) return

        setFetching(true)

        loader(id, data)
    }

    renderNode = () => {
        const { id, data, renderItem, expanded } = this.props

        const render = typeof renderItem === 'function' ? renderItem : d => d[renderItem]

        return render(data, expanded, id)
    }

    renderIndicator = () => {
        const { data, expanded, expandIcons, loader, childrenKey, fetching, iconClass } = this.props

        const children = data[childrenKey]

        const icon = expandIcons ? expandIcons[expanded ? 1 : 0] : <span className={treeClass('default-icon')} />

        const indicator = (
            <a
                onClick={this.handleIndicatorClick}
                className={classnames(treeClass(`icon-${expanded ? 'sub' : 'plus'}`), iconClass)}
            >
                {icon}
            </a>
        )

        if ((children && children.length > 0) || (loader && !fetching)) return indicator

        if (fetching && !children)
            return (
                <span className={treeClass('icon-loading')}>
                    <Spin name="ring" size={12} />
                </span>
            )

        return null
    }

    render() {
        const { data, onToggle, onChange, expanded, draggable, onDragOver, onDrop, ...other } = this.props

        return (
            <div onDragOver={onDragOver}>
                {this.renderIndicator()}

                <div className={treeClass('content')}>
                    {onChange && <TreeCheckbox {...other} onChange={onChange} />}
                    <div
                        className={treeClass('text')}
                        onClick={this.handleNodeClick}
                        onDoubleClick={this.handleNodeExpand}
                    >
                        {this.renderNode()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Content
