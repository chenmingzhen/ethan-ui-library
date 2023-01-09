import { UseDragPositionProps } from '@/hooks/useDragPosition'
import React from 'react'

export interface SliderContainerProps {
    /** 双滑块 */
    range?: boolean
    /** 自动隐藏当前值和刻度 */
    autoHide?: boolean
    /** 格式化显示刻度，为false时，不显示刻度 */
    formatScale?: false | ((value: number) => React.ReactNode)
    formatValue?: false | ((value: number) => React.ReactNode)
    height?: React.CSSProperties['height']
    onChange?: (values: number[] | number) => void
    /** 取值范围，长度 >= 2 的数组 */
    scale?: number[]
    /** 步长，必须大于等于0；为0时，只能选取 scale 指定的值 */
    step?: number
    value?: number | number[]
    vertical?: boolean
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    /** 拖动超过最大值事件 */
    onIncrease?: (value: number) => void
    defaultValue?: number | number[]
}

export interface SliderProps extends Omit<SliderContainerProps, 'value' | 'formatScale' | 'onChange'> {
    value: number
    index: number
    onChange: (index: number, value: number) => void
    min?: number
    max?: number
}

export interface SliderState {
    dragging: boolean
    lengthPercent: number
}

export interface IndicatorProps extends Pick<UseDragPositionProps, 'onDrag' | 'onDragEnd' | 'onDragStart'> {
    disabled?: SliderContainerProps['disabled']
}
