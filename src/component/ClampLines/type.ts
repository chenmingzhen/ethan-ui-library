import React from 'react'

export interface ClampLinesProps {
    text: string
    lines?: number
    ellipsis?: string
    showButton?: boolean
    moreText?: string
    lessText?: string
    className?: string
    style?: React.CSSProperties
    pop?: boolean
}
