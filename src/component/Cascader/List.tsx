import React from 'react'
import { getLocale } from '@/locale'
import { cascaderClass } from '@/styles'
import Node from './Node'
import { CascaderListProps } from './type'

const CascaderList: React.FC<CascaderListProps> = (props) => {
    const { data, currentPathActiveId, keygen, parentId, ...other } = props

    return (
        <div className={cascaderClass('list')}>
            {data.map((d, index) => {
                const id = keygen({ data: d, parentKey: parentId, index })

                return <Node {...other} key={id} active={currentPathActiveId === id} id={id} data={d} />
            })}
        </div>
    )
}

CascaderList.defaultProps = {
    currentPathActiveId: '',
    parentId: '',
}

export default React.memo(CascaderList)
