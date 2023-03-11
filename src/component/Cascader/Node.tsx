import { cascaderClass } from '@/styles'
import React, { useState } from 'react'
import Caret from '../icons/Caret'
import Spin from '../Spin'
import { CascaderNodeProps } from './type'

const CascaderNode: React.FC<CascaderNodeProps> = function (props) {
    const {
        dataItem,
        childrenKey,
        id,
        loader,
        active,
        expandTrigger,
        onPathChange,
        disabled,
        getContent,
        onItemClick,
        changeOnSelect,
        getNodeInfoByDataItem,
    } = props
    const children = dataItem[childrenKey]
    const isDisabled = disabled(dataItem)
    const hasChildren = children?.length > 0
    const events: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {}
    const style: React.CSSProperties = {}
    const [loading, updateLoading] = useState(false)
    const mayChildren = loader && !loading && children === undefined
    const className = cascaderClass(
        'node',
        active && 'active',
        isDisabled && 'disabled',
        hasChildren && 'has-children',
        mayChildren && 'may-be-children'
    )

    function getIsLeaf() {
        if (children && children.length > 0) return false
        if (Array.isArray(children) || children === null) return true
        if (loading && !children) return false
        if (loader && !loading) return false
        return true
    }

    function getPathChangeState() {
        let change = false
        let dismiss = false
        const isLeaf = getIsLeaf()

        if (changeOnSelect || isLeaf) {
            change = true
        }

        if (isLeaf) {
            dismiss = true
        }

        return [change, dismiss]
    }

    function handleClick() {
        const [change, dismiss] = getPathChangeState()

        onPathChange(dataItem, change, dismiss)

        if (loader && !loading && children === undefined) {
            updateLoading(true)

            const nodeInfo = getNodeInfoByDataItem(dataItem)

            loader(dataItem, nodeInfo)
        }

        if (onItemClick) {
            onItemClick(dataItem)
        }
    }

    function handleMouseEnter() {
        onPathChange(dataItem, false, false)
    }

    if (!isDisabled && (expandTrigger === 'click' || !children || children?.length === 0)) {
        events.onClick = handleClick
        style.cursor = 'pointer'
    }

    if (expandTrigger === 'hover') {
        events.onMouseEnter = handleMouseEnter
    }

    return (
        <div className={className} style={style} {...events}>
            {getContent(dataItem)}
            {loading && children === undefined && <Spin className={cascaderClass('loading')} size={10} name="ring" />}
            {(hasChildren || mayChildren) && (
                <span className={cascaderClass('caret')}>
                    <Caret />
                </span>
            )}
        </div>
    )
}

export default React.memo(CascaderNode)
