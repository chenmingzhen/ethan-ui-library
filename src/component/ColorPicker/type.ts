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
    currentColor: string
    focus: boolean
    r: number
    g: number
    b: number
    a: number
    h: number
    l: number
    s: number
    /** 16进制表示的颜色 #fafafa  */
    hex: string
}

export interface RgbPanelProps {
    onMouseMove(color: Uint8ClampedArray)

    onInit(): void
}

export interface HuePanelProps {
    onMouseMove(hue: number): void
}

export interface AlphaPanelProps {
    onMouseMove(alpha: number): void
}
