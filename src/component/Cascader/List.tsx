import React from 'react'
import { cascaderClass } from '@/styles'
import Node from './Node'
import { CascaderListProps } from './type'

const CascaderList: React.FC<CascaderListProps> = (props) => {
    const {
        currentData,
        currentPathActiveId = '',
        getCheckboxStateByDataItem,
        getKey,
        getDisabledByDataItem,
        ...other
    } = props

    return (
        <div className={cascaderClass('list')}>
            {currentData.map((dataItem) => {
                const key = getKey(dataItem)
                const { checked, indeterminate } = getCheckboxStateByDataItem(dataItem) || {}
                const disabled = getDisabledByDataItem(dataItem)

                return (
                    <Node
                        {...other}
                        disabled={disabled}
                        checked={checked}
                        indeterminate={indeterminate}
                        key={key}
                        active={currentPathActiveId === key}
                        dataItem={dataItem}
                    />
                )
            })}
        </div>
    )
}

/** 不需要Memo，当value改变时，需要反馈到Node中 */
export default CascaderList
