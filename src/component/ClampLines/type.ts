import React from 'react'

export interface ClampLinesProps {
    text: string
    lines?: number
    ellipsis?: string
    showButton?: boolean
    moreText?: string
    lessText?: string
    tag: keyof HTMLElementTagNameMap
    className?: string
    style?: React.CSSProperties
}
