import React from 'react'
import { isObject } from '../is'

export function styles(...args) {
    let ms: React.CSSProperties = {}

    args.forEach((style) => {
        if (isObject(style)) {
            ms = Object.assign(ms, style)
        }
    })

    return ms
}
