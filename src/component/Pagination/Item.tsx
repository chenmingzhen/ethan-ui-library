import React from 'react'
import { paginationClass } from '@/styles'
import { ItemProps } from './type'

const Item: React.FC<ItemProps> = (props) => {
    const { onClick, page, isCurrent, children, disabled } = props

    function handleClick() {
        if (disabled || isCurrent) return

        onClick(page)
    }

    const className = paginationClass(
        'item',
        props.className,
        isCurrent && 'current',
        (disabled || isCurrent) && 'disabled'
    )

    return (
        <a className={className} onMouseDown={handleClick}>
            {children}
        </a>
    )
}

export default React.memo(Item)
