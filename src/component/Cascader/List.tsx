import React from 'react'
import { cascaderClass } from '@/styles'
import Node from './Node'
import { CascaderListProps } from './type'

const CascaderList: React.FC<CascaderListProps> = (props) => {
    const { currentData, currentPathActiveId = '', getCheckboxStateByDataItem, getKey, ...other } = props

    return (
        <div className={cascaderClass('list')}>
            {currentData.map((dataItem) => {
                const key = getKey(dataItem)
                const { checked, indeterminate } = getCheckboxStateByDataItem(dataItem) || {}
                return (
                    <Node
                        {...other}
                        checked={checked}
                        indeterminate={indeterminate}
                        key={key}
                        active={currentPathActiveId === key}
                        id={key}
                        dataItem={dataItem}
                    />
                )
            })}
        </div>
    )
}

export default CascaderList
