import { cascaderClass } from '@/styles'
import React from 'react'
import FilterListOption from './FilterListOption'
import useFilteredData from './hooks/useFilteredData'
import { FilterListProps } from './type'

const FilterList: React.FC<FilterListProps> = function (props) {
    const {
        filterText,
        nodeMapping,
        onFilter,
        getDataItemByKey,
        getContent,
        getKey,
        onPathChange,
        onFilterTextChange,
        multiple,
        getCheckboxStateByDataItem,
        addValue,
        removeValue,
    } = props
    const filteredData = useFilteredData({ filterText, nodeMapping, onFilter, getDataItemByKey, getContent })

    return (
        <div className={cascaderClass('filter-list')}>
            {filteredData.map((dataItem) => {
                const currentDataItemKey = getKey(dataItem)
                const node = nodeMapping.get(currentDataItemKey)
                if (!node) return null

                return (
                    <FilterListOption
                        key={currentDataItemKey}
                        multiple={multiple}
                        dataItem={dataItem}
                        onPathChange={onPathChange}
                        onFilterTextChange={onFilterTextChange}
                        node={node}
                        nodeMapping={nodeMapping}
                        getDataItemByKey={getDataItemByKey}
                        getContent={getContent}
                        getCheckboxStateByDataItem={getCheckboxStateByDataItem}
                        removeValue={removeValue}
                        addValue={addValue}
                        filterText={filterText}
                    />
                )
            })}
        </div>
    )
}

export default FilterList
