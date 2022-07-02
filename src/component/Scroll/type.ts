import React from 'react'

interface BaseScrollProps {
    onScroll(
        /** X方向滚动的偏差值 */
        x: number,
        /** Y方向滚动的偏差值 */
        y: number,
        /** X方向上能滚动的最大实际值 */
        xMax?: number,
        /** Inner滚动容器 */
        inner?: HTMLDivElement,
        /** 滚动容器宽度 */
        width?: number,
        /** 滚动容器长度 */
        height?: number,
        /** X方向滚动的实际值 */
        pixelX?: number,
        /** Y方向滚动的实际值 */
        pixelY?: number
    ): void
    /** 滚动y的总长度 */
    scrollHeight?: number
    /** 滚动x的总长度 */
    scrollWidth?: number
    innerScrollAttr?: string[]
    style?: React.CSSProperties
    className?: string
}

export interface ScrollHandlerProps extends BaseScrollProps {
    scroll?: 'x' | 'y' | 'both'

    /** @todo 下面的两个为比例值，应更正名称为ratio */
    /** Left偏差比例值 */
    scrollLeft?: number
    /** Top偏差比例值 */
    scrollTop?: number
}

export interface ScrollProps extends BaseScrollProps {
    left: number
    top: number
    scrollX: boolean
    scrollY: boolean
}

export interface ScrollContext {
    element?: HTMLElement
    left?: number
    top?: number
}
