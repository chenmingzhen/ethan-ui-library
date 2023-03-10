import React from 'react'
import { cascaderClass } from '@/styles'
import Node from './Node'
import { CascaderListProps } from './type'

const CascaderList: React.FC<CascaderListProps> = (props) => {
    const { currentData, currentPathActiveId = '', getKey, ...other } = props

    return (
        <div className={cascaderClass('list')}>
            {currentData.map((dataItem) => {
                const key = getKey(dataItem)
                return <Node {...other} key={key} active={currentPathActiveId === key} id={key} dataItem={dataItem} />
            })}
        </div>
    )
}

export default React.memo(CascaderList)
