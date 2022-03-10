import React from 'react'

export interface RateProps {
    disabled?: boolean
    background?: React.ReactNode | React.ReactNode[]
    clearable?: boolean
    repeat?: boolean
    front?: React.ReactNode | React.ReactNode[]
    max?: number
    /** @todo */
    onChange?: (value: number) => void
    size?: number
    text?: React.ReactNode | React.ReactNode[]
    value?: number
    allowHalf?: boolean
    className?: string
    style?: React.CSSProperties
    defaultValue?: number
}

export interface RateState {
    hover: number

    highlight: number
}
