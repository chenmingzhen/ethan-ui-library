import React, { SVGAttributes } from 'react'

export interface ColorRange {
    from: string
    to: string
}

export interface ColorPercent {
    '0%': string
    '100%': string
}

export type Color = string | ColorRange | ColorPercent

export interface BaseProgressProps {
    children?: React.ReactNode

    strokeWidth?: number

    type?: 'success' | 'info' | 'warning' | 'danger'

    background?: string

    className?: string

    color?: Color

    popup?: boolean

    size?: number

    style?: React.CSSProperties

    value?: number

    /** @see https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-linecap */
    strokeLinecap?: SVGAttributes<void>['strokeLinecap']
}

export interface ProgressProps extends BaseProgressProps {
    shape?: 'line' | 'circle'
}
