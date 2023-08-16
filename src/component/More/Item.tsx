import React, { useContext } from 'react'
import { MoreItemProps } from './type'
import MoreContext from './context'

const Item: React.FC<MoreItemProps> = function (props) {
    const { children } = props

    const { showCount } = useContext(MoreContext)

    return <>{React.cloneElement(children, { showCount })}</>
}

Item.displayName = 'MoreItem'

export default React.memo(Item)
