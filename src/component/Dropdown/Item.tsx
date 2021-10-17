import React, { isValidElement, cloneElement } from 'react'
import { ItemProps } from './type'

const Item: React.FC<ItemProps> = ({ onClick, data, itemClassName, renderItem, width, columns }) => {
    function handleClick() {
        onClick?.(data)
    }

    const aWidth = width && columns ? (width - 2) / columns : undefined

    const props = {
        disabled: data.disabled,
        onClick: handleClick,
        className: itemClassName,
        target: data.target,
        style: aWidth ? { display: 'inline-block', width: aWidth } : null,
        href: data.url ?? undefined,
    }

    let content

    if (isValidElement(data)) {
        content = data
    } else {
        content = typeof renderItem === 'string' ? data[renderItem] : renderItem(data)
    }

    if (isValidElement(content)) {
        return cloneElement(content, Object.assign(props, content.props))
    }

    return <a {...props}>{content}</a>
}

Item.defaultProps = {
    data: {},
    renderItem: 'content',
}

export default React.memo(Item)
