import React from 'react'

export function setStyle(target: HTMLElement, styles: React.CSSProperties) {
    const { style } = target

    Object.keys(styles).forEach((attribute) => {
        style[attribute] = styles[attribute]
    })
}
