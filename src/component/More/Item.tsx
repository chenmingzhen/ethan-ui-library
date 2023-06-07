import React from 'react'
import { MoreItemProps } from './type'

const Item: React.FC<MoreItemProps> = function (props) {
    const { children } = props

    return <>{children}</>
}

Item.displayName = 'MoreItem'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/** @ts-ignore */
Item.IS_MORE_ITEM = true

export default React.memo(Item)
