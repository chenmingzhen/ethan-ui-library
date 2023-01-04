import React from 'react'

export const TRANSFORMS = {
    WebkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: 'MozTransform',
    transform: 'transform',
}

export function setTranslate(el, x, y) {
    Object.values(TRANSFORMS).forEach((transform) => {
        el.style[transform] = `translate(${x},${y})`
    })
}

export function setTransformProp(transform: string): React.CSSProperties {
    return {
        WebkitTransform: transform,
        OTransform: transform,
        msTransform: transform,
        transform,
    }
}
