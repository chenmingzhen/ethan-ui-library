import React from 'react'
import { paginationClass } from '@/styles'
import { ItemProps } from './type'

const Item: React.FC<ItemProps> = (props) => {
    const { onClick, page, isCurrent, children, disabled } = props

    function handleClick() {
        onClick(page)
    }

    const className = paginationClass('item', props.className, isCurrent && 'current')

    return (
        // @ts-ignore
        <a className={className} disabled={disabled || isCurrent} onMouseDown={handleClick}>
            {children}
        </a>
    )
}

export default React.memo(Item)
