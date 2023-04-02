import { cascaderClass, selectClass } from '@/styles'
import React from 'react'
import classnames from 'classnames'
import { styles } from '@/utils/style/styles'
import { getLocale } from '@/locale'
import FilterListOption from './FilterListOption'
import useFilteredData from './hooks/useFilteredData'
import { FilterListProps } from './type'

const FilterList: React.FC<FilterListProps> = function (props) {
    const {
        cascaderId,
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
        listStyle,
        text,
    } = props
    const filteredData = useFilteredData({ filterText, nodeMapping, onFilter, getDataItemByKey, getContent })

    const ms = styles(listStyle, { display: 'inline-flex' }, !filteredData.length ? { height: undefined } : undefined)

    return (
        <div
            data-id={cascaderId}
            style={ms}
            className={classnames(
                selectClass('options'),
                cascaderClass('options', 'filter', !filteredData.length && 'no-data')
            )}
        >
            {filteredData.length ? (
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
            ) : (
                <span>{text.noData || getLocale('noData')}</span>
            )}
        </div>
    )
}

export default FilterList
