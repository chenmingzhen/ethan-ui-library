import React from 'react'

export interface ColorPickerProps {
    value?: string
    disabled?: boolean
    size?: 'small' | 'large' | 'default'
    format?: 'rgba' | 'hex' | 'hsla'
    defaultColors?: string[]
    style?: React.CSSProperties
    className?: string
    absolute?: boolean
    position?: 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top'
    defaultValue?: string
    onChange?: (color: string) => void
    mode?: 'rgba' | 'hex' | 'hsla' | boolean
}

export type ColorBoardProps = Omit<ColorPickerProps, 'position' | 'size'>

export interface ColorBoardState {
    r: number
    g: number
    b: number
    a: number
    h: number
    l: number
    s: number

    mode: 'rgba' | 'hex' | 'hsla'
}

export interface ColorPickerState {
    focus: boolean
}

export interface RgbPanelProps {
    rgb: [number, number, number]

    hue: number

    onChange(color: Uint8ClampedArray): void
}

export interface HuePanelProps {
    hue: number

    onChange(hue: number): void
}

export interface AlphaPanelProps {
    alpha: number

    onChange(alpha: number): void

    h: number

    s: number

    l: number
}

export type OnModalPanelInputValueChangeParams = Omit<ColorBoardState, 'mode'>

export interface ModePanelProps {
    mode: ColorBoardState['mode']

    onModeChange: (mode: ColorBoardState['mode']) => void

    onInputValueChange(record: OnModalPanelInputValueChangeParams): void

    r: number
    g: number
    b: number
    a: number
    h: number
    s: number
    l: number
}
