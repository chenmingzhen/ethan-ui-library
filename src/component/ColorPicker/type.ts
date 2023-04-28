import React from 'react'

export interface ColorPickerProps {
    value?: string
    disabled?: boolean
    size?: 'small' | 'large' | 'default'
    format?: 'rgba' | 'hex' | 'hsla'
    defaultColors?: string[]
    style?: React.CSSProperties
    className?: string
    position?: 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top'
    defaultValue?: string
    onChange?: (color: string) => void
    mode?: 'rgba' | 'hex' | 'hsla' | boolean
    showIcon?: boolean
    dropdownClassName?: string
    dropdownStyle?: React.CSSProperties
    getPopupContainer?: (triggerElement: HTMLElement) => HTMLElement
}

export interface ColorBoardProps
    extends Omit<ColorPickerProps, 'position' | 'size' | 'showIcon' | 'dropdownClassName' | 'dropdownStyle'> {
    /** @private */
    componentKey?: string
}

export interface ColorBoardState {
    r: number
    g: number
    b: number
    a: number
    h: number
    l: number
    s: number
    mode: 'rgba' | 'hex' | 'hsla'
    isRgbPanelMoving: boolean
}

export interface ColorPickerState {
    focus: boolean
}

export interface RgbPanelProps {
    rgb: [number, number, number]
    hue: number
    isRgbPanelMoving: boolean
    onRgbPanelMoveChange(moving: boolean): void
    onChange(color: Uint8ClampedArray): void
    disabled: boolean
}

export interface HuePanelProps {
    hue: number
    isRgbPanelMoving: boolean
    onChange(hue: number): void
    disabled: boolean
}

export interface AlphaPanelProps {
    alpha: number
    onChange(alpha: number): void
    h: number
    s: number
    l: number
    disabled: boolean
}

export type OnModalPanelInputValueChangeParams = Omit<ColorBoardState, 'mode' | 'isRgbPanelMoving'>

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
    disabled: boolean
}

export enum ColorBoardEventKey {
    OnHuePanelLocalHueChange,
}

export interface ColorBoardEvent {
    [ColorBoardEventKey.OnHuePanelLocalHueChange]: number
}
