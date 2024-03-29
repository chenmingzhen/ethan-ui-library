import React from 'react'

export interface ScrollChangeEvent {
    /** x轴滚动的比例值 */
    scrollLeftRatio: number
    /** y轴滚动的比例值 */
    scrollTopRatio: number
    /** 滚动容器的宽度 */
    wheelWidth: number
    /** 滚动容器的高度 */
    wheelHeight: number
    /** x轴可滚动的长度 */
    contentWidth: number
    /** y轴可滚动的长度 */
    contentHeight: number
    /** x轴滚轮单次滚动的距离 */
    pixelX?: number
    /** y轴滚轮单次滚动的距离 */
    pixelY?: number
    /** x轴滚动的值 */
    scrollLeft: number
    /** y轴滚动的值 */
    scrollTop: number
}

export interface ScrollProps {
    scroll?: 'x' | 'y' | 'both'
    /** Left偏差比例值 */
    scrollLeftRatio?: number
    /** Top偏差比例值 */
    scrollTopRatio?: number
    /** 滚动y的总长度 */
    scrollHeight?: number
    /** 滚动x的总长度 */
    scrollWidth?: number
    className?: string
    onScroll?: (evt: ScrollChangeEvent) => void
    children: React.ReactNode
    style?: React.CSSProperties
    /** 如果存在动画使高度延迟展开，需要指明最终的高度 */
    containerHeight?: number
    containerWidth?: number

    /** 最大长度限制 */
    maxHeight?: number
    maxWidth?: number

    symbol?: any
}

export interface ScrollBarProps {
    direction?: 'x' | 'y'
    className?: string
    /** 容器长度 */
    length: number
    scrollRatio: number
    onScroll(offset: number): void
    /** 滚动容器长度 */
    scrollLength: number
}
