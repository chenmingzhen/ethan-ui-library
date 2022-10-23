import React from 'react'

export interface ColorPickerProps {
    value?: string
    disabled?: boolean
    showMode?: boolean
    size?: 'small' | 'large' | 'default'
    mode?: 'rgba' | 'hex' | 'hsla'
    defaultColors?: string[]
    style?: React.CSSProperties
    className?: string
    absolute?: boolean
    position?: 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top'
    defaultValue?: string
    onChange?: (color: string) => void
}

export interface ColorPickerState {
    r: number
    g: number
    b: number
    a: number
    h: number
    l: number
    s: number
    hex: string
    /** true:不允许props的value改变currentValue */
    locaking: boolean
    currentValue: string
    focus: boolean
}

export interface RgbPanelProps {
    onMouseMove(color: Uint8ClampedArray)

    onMouseUp(): void

    onInit(): void
}

export interface HuePanelProps {
    onMouseMove(hue: number): void

    onMouseUp(): void
}

export interface AlphaPanelProps {
    onMouseMove(alpha: number): void

    onMouseUp(): void
}
