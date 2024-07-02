import useRefMethod from '@/hooks/useRefMethod'
import { cascaderClass } from '@/styles'
import { stopPropagation } from '@/utils/func'
import { isString } from '@/utils/is'
import React from 'react'
import Checkbox from '../Checkbox'
import { FilterListOptionItemProps, FilterListOptionProps } from './type'
import Highlight from '../Highlight'

const FilterListOptionItem = React.memo((props: FilterListOptionItemProps) => {
    const {
        pathNode,
        pathDataItem,
        addValue,
        removeValue,
        isPathHeader,
        onPathChange,
        onFilterTextChange,
        getContent,
        multiple,
        isDisabledOption,
        checked,
        filterText,
    } = props

    function handlePathItemClick(e: React.MouseEvent) {
        if (pathNode.isDisabled) return

        stopPropagation(e)
        onPathChange(pathDataItem, false, false)
        onFilterTextChange('')
    }

    const handleCheckboxChange = useRefMethod((isChecked: boolean) => {
        if (isChecked) {
            addValue(pathDataItem)
        } else {
            removeValue(pathDataItem)
        }
    })

    function buildContent() {
        const content = getContent(pathDataItem)

        return (
            <div
                className={cascaderClass('filter-list-content', pathNode.isDisabled && 'disabled')}
                onClick={handlePathItemClick}
            >
                {isString(content) ? <Highlight highlightTexts={[filterText]} text={content} /> : content}
            </div>
        )
    }

    if (isPathHeader) {
        return (
            <>
                {multiple && (
                    <Checkbox
                        checked={checked}
                        disabled={isDisabledOption}
                        onChange={handleCheckboxChange}
                        style={{ marginRight: 8, marginTop: -1, verticalAlign: 'top' }}
                        className={cascaderClass('checkbox')}
                    />
                )}

                {buildContent()}
            </>
        )
    }

    return (
        <>
            <span className={cascaderClass('filter-list-separator')}>/</span>
            {buildContent()}
        </>
    )
})

const FilterListOption: React.FC<FilterListOptionProps> = function (props) {
    const {
        multiple,
        dataItem,
        onPathChange,
        onFilterTextChange,
        node,
        nodeMapping,
        getDataItemByKey,
        getContent,
        getCheckboxStateByDataItem,
        removeValue,
        addValue,
        filterText,
    } = props
    const { keyPath, isDisabled } = node

    function handleOptionClick() {
        if (multiple) return
        if (isDisabled) return

        onPathChange(dataItem, true, false)
        onFilterTextChange('')
    }

    return (
        <div className={cascaderClass('node')} onClick={handleOptionClick}>
            {keyPath.map((pathKey, i) => {
                const pathNode = nodeMapping.get(pathKey)
                const pathDataItem = getDataItemByKey(pathKey)
                if (!pathNode) return null
                const { checked } = getCheckboxStateByDataItem(dataItem)
                return (
                    <FilterListOptionItem
                        key={pathKey}
                        pathNode={pathNode}
                        pathDataItem={pathDataItem}
                        addValue={addValue}
                        removeValue={removeValue}
                        isPathHeader={i === 0}
                        onPathChange={onPathChange}
                        onFilterTextChange={onFilterTextChange}
                        getContent={getContent}
                        multiple={multiple}
                        isDisabledOption={isDisabled}
                        checked={checked}
                        filterText={filterText}
                    />
                )
            })}
        </div>
    )
}

export default FilterListOption
