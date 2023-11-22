import useRefMethod from '@/hooks/useRefMethod'
import { cascaderClass, selectClass } from '@/styles'
import { flattenArray } from '@/utils/flat'
import { preventDefault, stopPropagation } from '@/utils/func'
import { isEmpty } from '@/utils/is'
import classnames from 'classnames'
import React, { useMemo, useRef } from 'react'
import { getUidStr } from '@/utils/uid'
import Caret from '../icons/Caret'
import Input from '../Input'
import { CascaderData, CascaderDataValueType, CascaderResultProps } from './type'
import More from '../More'
import Popover from '../Popover'

const CascaderResult: React.FC<CascaderResultProps> = function (props) {
    const {
        value,
        placeholder,
        compressed,
        getContent,
        getDataItemByKey,
        getNodeInfoByDataItem,
        multiple,
        clearable,
        isDisabled,
        onClear,
        onPathChange,
        showResultMode,
        getCheckboxStateByDataItem,
        onInput,
        filterText,
        size,
        forwardedInputRef,
        valueKey,
    } = props
    const resultElementRef = useRef<HTMLDivElement>()
    const restId = useRef(getUidStr()).current
    /** 是否完全选中 */
    const getIsFullChecked = useRefMethod((key: CascaderDataValueType) => {
        const dataItem = getDataItemByKey(key)
        const { checked, indeterminate } = getCheckboxStateByDataItem(dataItem)

        return checked && !indeterminate
    })

    /** 当showResultMode为parent时，判断当前的dataItem是否可以展示到result中 */
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

    function handleResultItemClick(dataItem: CascaderData) {
        onPathChange(dataItem, false, false)
    }

    function buildResult() {
        const dataItems: CascaderData[] =
            showResultMode === 'parent' ? showParentModeDataItems : showFullOrChildModeDataItems

        const coverPopoverProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {
            onMouseDown(e) {
                stopPropagation(e)
                preventDefault(e)
            },
        }

        return (
            <More
                data={dataItems}
                keyName={valueKey}
                compressed={compressed}
                getContainerElement={() => resultElementRef.current}
                getMoreElement={() => document.getElementById(restId)}
                renderItem={(dataItem, index) => {
                    const node = getNodeInfoByDataItem(dataItem)
                    if (!node) return
                    const { keyPath } = node
                    const content =
                        showResultMode !== 'full'
                            ? getContent(getDataItemByKey(keyPath[keyPath.length - 1]))
                            : keyPath.map((key) => getContent(getDataItemByKey(key))).join('/')

                    return (
                        <a
                            key={index}
                            tabIndex={-1}
                            className={cascaderClass('item')}
                            onClick={() => {
                                handleResultItemClick(dataItem)
                            }}
                        >
                            {content}
                        </a>
                    )
                }}
                renderMore={(afterNumNodes) => (
                    <Popover
                        trigger="mousedown"
                        className={cascaderClass('popover')}
                        content={<div className={cascaderClass('result')}>{afterNumNodes}</div>}
                        arrowProps={{ ...coverPopoverProps }}
                        innerProps={{ ...coverPopoverProps }}
                    >
                        <a
                            id={restId}
                            className={cascaderClass('item', 'item-compressed')}
                            onMouseDown={(e) => {
                                stopPropagation(e)
                                preventDefault(e)
                            }}
                        >
                            +{afterNumNodes.length}
                        </a>
                    </Popover>
                )}
            />
        )
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
        const items = buildResult()

        return items
    }

    const showPlaceHolder = value.length === 0 && isEmpty(filterText)
    const readOnly = !onInput || isDisabled || (!multiple && value.length !== 0)

    return (
        <div className={cascaderClass('result')} ref={resultElementRef}>
            {renderResult()}
            <Input
                readOnly={readOnly}
                forwardedRef={forwardedInputRef}
                value={filterText}
                className={cascaderClass('input', !readOnly && 'search')}
                size={size}
                onChange={onInput}
                placeholder={showPlaceHolder ? placeholder : undefined}
            />

            {renderIndicator()}
            {renderClear()}
        </div>
    )
}

export default React.memo(CascaderResult)
