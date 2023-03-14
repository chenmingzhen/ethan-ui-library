import useRefMethod from '@/hooks/useRefMethod'
import { cascaderClass, inputClass, selectClass } from '@/styles'
import { flattenArray } from '@/utils/flat'
import { preventDefault, stopPropagation } from '@/utils/func'
import classnames from 'classnames'
import React, { useMemo, useRef, useState } from 'react'
import Caret from '../icons/Caret'
import More from './More'
import { CascaderData, CascaderDataValueType, CascaderResultProps } from './type'

const CascaderResult: React.FC<CascaderResultProps> = function (props) {
    const {
        value,
        placeholder,
        compressed,
        getContent,
        getDataItemByKey,
        cascaderId,
        getNodeInfoByDataItem,
        multiple,
        clearable,
        isDisabled,
        onClear,
        onPathChange,
        showResultMode,
        getCheckboxStateByDataItem,
    } = props
    const [showNum, setShowNum] = useState(-1)

    /** 是否完全选中 */
    const getIsFullChecked = useRefMethod((key: CascaderDataValueType) => {
        const dataItem = getDataItemByKey(key)
        const { checked, indeterminate } = getCheckboxStateByDataItem(dataItem)

        return checked && !indeterminate
    })

    /** 判断当前的dataItem是否可以展示到result中 */
    const getIsShowParentModeValue = useRefMethod((key: CascaderDataValueType) => {
        /** 如果当前节点没有被完全选中，则不用添加到result的显示中 */
        if (!getIsFullChecked(key)) return false
        const dataItem = getDataItemByKey(key)
        const { keyPath, children } = getNodeInfoByDataItem(dataItem)
        const parentId = keyPath[keyPath.length - 2]

        /** 如果是根节点,当所有子节点完全选中,则将根节点添加到Result中显示 */
        if (parentId === undefined) {
            return children.every(getIsFullChecked)
        }

        /** 如果是子节点，当父节点没有完全被选中时，将本身节点添加到Result中显示 */
        return !getIsFullChecked(parentId)
    })

    const showParentModeDataItems = useMemo(() => {
        if (showResultMode !== 'parent') return []

        const flattenValue = flattenArray(value) as CascaderDataValueType[]
        const valueSet = new Set<CascaderDataValueType>()
        const dataItems: CascaderData[] = []

        flattenValue.forEach((v) => {
            if (getIsShowParentModeValue(v)) {
                valueSet.add(v)
            }
        })

        valueSet.forEach((v) => {
            dataItems.push(getDataItemByKey(v))
        })

        return dataItems
    }, [value])

    const showFullOrChildModeDataItems = useMemo(() => {
        /** 存放所有选中的路径中的最后一个dataItem */
        const dataItems: CascaderData[] = []

        value.forEach((pathValue) => {
            /** 判断当前路径的所有value是否存在对应的Data */
            const currentPathValid = pathValue.every(getDataItemByKey)
            if (!currentPathValid) return
            const pathLastValue = pathValue[pathValue.length - 1]
            const pathLastDataItem = getDataItemByKey(pathLastValue)

            if (pathLastDataItem) {
                dataItems.push(pathLastDataItem)
            }
        })

        return dataItems
    }, [value])

    function buildResult() {
        const items: React.ReactNode[] = []

        if (showResultMode === 'parent') {
            showParentModeDataItems.forEach((dataItem, index) => {
                const groupLastDataItem = getNodeInfoByDataItem(dataItem)
                if (!groupLastDataItem) return
                const { keyPath } = groupLastDataItem
                const content = getContent(getDataItemByKey(keyPath[keyPath.length - 1]))

                items.push(
                    <a key={index} tabIndex={-1} className={cascaderClass('item')}>
                        {content}
                    </a>
                )
            })
        } else {
            showFullOrChildModeDataItems.forEach((dataItem, index) => {
                const groupLastDataItem = getNodeInfoByDataItem(dataItem)
                if (!groupLastDataItem) return
                const { keyPath } = groupLastDataItem
                const content =
                    showResultMode === 'child'
                        ? getContent(getDataItemByKey(keyPath[keyPath.length - 1]))
                        : keyPath.map((key) => getContent(getDataItemByKey(key))).join('/')

                items.push(
                    <a key={index} tabIndex={-1} className={cascaderClass('item')}>
                        {content}
                    </a>
                )
            })
        }

        return items
    }

    function buildMore(nodes: React.ReactNode[]) {
        return [<More itemNodes={nodes} key="ethan-cascader-more" showNum={showNum} dataId={cascaderId} />]
    }

    function renderIndicator() {
        return !multiple ? (
            <a tabIndex={-1} className={selectClass('indicator', multiple ? 'multi' : 'caret')}>
                <Caret />
            </a>
        ) : null
    }

    function renderClear() {
        const className = classnames(selectClass('indicator', 'close'), cascaderClass('close'))

        if (clearable && value.length > 0 && !isDisabled) {
            return (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                    className={className}
                    onClick={onClear}
                    onMouseDown={(e) => {
                        stopPropagation(e)
                        preventDefault(e)
                    }}
                />
            )
        }

        return null
    }

    function renderResult() {
        let items = buildResult()

        if (compressed) {
            items = buildMore(items)
        }

        if (items.length === 0) {
            items.push(renderPlaceholder())
        }

        return items
    }

    function renderPlaceholder() {
        return (
            <span className={classnames(inputClass('placeholder'), selectClass('ellipsis'))} key="placeholder">
                {placeholder}
                &nbsp;
            </span>
        )
    }

    const result = value.length === 0 ? renderPlaceholder() : renderResult()
    const resultElementRef = useRef<HTMLDivElement>()

    return (
        <div className={cascaderClass('result')} ref={resultElementRef}>
            {result}
            {renderIndicator()}
            {renderClear()}
        </div>
    )
}

export default React.memo(CascaderResult)
