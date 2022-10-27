import React from 'react'

export interface ColorPickerProps {
    value?: string
    disabled?: boolean
    showMode?: boolean
    size?: 'small' | 'large' | 'default'
    format?: 'rgba' | 'hex' | 'hsla'
    defaultColors?: string[]
    style?: React.CSSProperties
    className?: string
    absolute?: boolean
    position?: 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top'
    defaultValue?: string
    onChange?: (color: string) => void
}

export type ColorBoardProps = Omit<ColorPickerProps, 'disabled' | 'position' | 'size'>

export interface ColorBoardState {
    r: number
    g: number
    b: number
    a: number
    h: number
    l: number
    s: number
    /** true:不允许props的value改变currentValue */
    locking: boolean
    currentValue: string
    mode: 'rgba' | 'hex' | 'hsla'
}

export interface ColorPickerState {
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

export type OnModalPanelInputValueChangeParams = Omit<ColorBoardState, 'locking' | 'currentValue' | 'mode'>

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
