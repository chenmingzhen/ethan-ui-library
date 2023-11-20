import React from 'react'
import ResizeObserver from '@/component/ResizeObserver'
import useRefMethod from '@/hooks/useRefMethod'
import { MoreItemProps } from './type'

const Item: React.FC<MoreItemProps> = function (props) {
    const { children, dataKey } = props

    const handleItemResize = useRefMethod((rect: DOMRect, element: Element) => {})

    return (
        <ResizeObserver watch options={{ direction: 'xy' }} onResize={handleItemResize}>
            {React.cloneElement(children, { 'data-more-item-key': dataKey })}
        </ResizeObserver>
    )
}

Item.displayName = 'MoreItem'

export default React.memo(Item)
