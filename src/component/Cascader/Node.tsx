import useRefMethod from '@/hooks/useRefMethod'
import { cascaderClass } from '@/styles'
import { getParent } from '@/utils/dom/element'
import React, { useState } from 'react'
import Checkbox from '../Checkbox'
import Caret from '../icons/Caret'
import Spin from '../Spin'
import { CascaderNodeProps } from './type'

const CascaderNode: React.FC<CascaderNodeProps> = function (props) {
    const {
        dataItem,
        childrenKey,
        loader,
        active,
        expandTrigger,
        onPathChange,
        disabled,
        getContent,
        onItemClick,
        changeOnSelect,
        getNodeInfoByDataItem,
        multiple,
        addValue,
        checked,
        indeterminate,
        removeValue,
    } = props
    const children = dataItem[childrenKey]
    const hasChildren = children?.length > 0
    const events: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {}
    const style: React.CSSProperties = {}
    const [loading, updateLoading] = useState(false)
    const mayChildren = loader && !loading && children === undefined
    const className = cascaderClass(
        'node',
        active && 'active',
        disabled && 'disabled',
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
        if (multiple) return [false, false]

        const isLeaf = getIsLeaf()
        const change = changeOnSelect || isLeaf || false
        const dismiss = isLeaf || false

        return [change, dismiss]
    }

    function handleClick(evt: React.MouseEvent) {
        const [change, dismiss] = getPathChangeState()

        const isClickCheckbox = getParent(evt.target, `.${cascaderClass('checkbox')}`)

        if (!isClickCheckbox) {
            onPathChange(dataItem, change, dismiss)

            if (loader && !loading && children === undefined) {
                updateLoading(true)

                const nodeInfo = getNodeInfoByDataItem(dataItem)

                loader(dataItem, nodeInfo)
            }
        }

        if (onItemClick) {
            onItemClick(dataItem)
        }
    }

    function handleMouseEnter() {
        onPathChange(dataItem, false, false)
    }

    const handleCheck = useRefMethod((isChecked: boolean) => {
        if (isChecked || indeterminate) {
            addValue(dataItem)
        } else {
            removeValue(dataItem)
        }
    })

    if (!disabled && (expandTrigger === 'click' || !children || children?.length === 0)) {
        events.onClick = handleClick
        style.cursor = 'pointer'
    }

    if (expandTrigger === 'hover') {
        events.onMouseEnter = handleMouseEnter
    }

    return (
        <div className={className} style={style} {...events}>
            {multiple && (
                <Checkbox
                    checked={checked}
                    indeterminate={indeterminate}
                    disabled={disabled}
                    onChange={handleCheck}
                    style={{ marginRight: 8, marginTop: -1, verticalAlign: 'top' }}
                    className={cascaderClass('checkbox')}
                />
            )}
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
