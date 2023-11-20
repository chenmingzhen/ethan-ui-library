import React, { useMemo } from 'react'
import ResizeObserver from '@/component/ResizeObserver'
import useRefMethod from '@/hooks/useRefMethod'
import { MoreItemProps } from './type'
import { MoreItemContext } from './context'

const Item: React.FC<MoreItemProps> = function (props) {
    const { children, itemKey } = props

    const handleItemResize = useRefMethod((rect: DOMRect, element: Element) => {})

    const value = useMemo(() => ({ 'data-more-item-key': itemKey }), [itemKey])

    return (
        <MoreItemContext.Provider value={value}>
            <ResizeObserver watch options={{ direction: 'xy' }} onResize={handleItemResize}>
                {React.cloneElement(children, { 'data-more-item-key': itemKey })}
            </ResizeObserver>
        </MoreItemContext.Provider>
    )
}

Item.displayName = 'MoreItem'

export default React.memo(Item)
