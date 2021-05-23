import debounce from 'lodash.debounce'

import { CloseEdgeEnum, ReachTypeEnum, TouchStartEnum, OriginRectType } from '../types'
import { maxTouchTime, slideAcceleration } from '../variables'

interface SuitableImageSizeReturn {
    width: number
    height: number
    x: number
    y: number
    scale: number
}

/**
 * 获取图片合适的大小
 */

export const getSuitableImageSize = (
    naturalWidth: number,
    naturalHeight: number,
    rotate: number
): SuitableImageSizeReturn => {
    let width
    let height
    let y = 0
    let { innerWidth, innerHeight } = window
    const isVertical = rotate % 180 !== 0

    // 若图片不是水平则调换宽高
    if (isVertical) {
        ;[innerHeight, innerWidth] = [innerWidth, innerHeight]
    }

    const autoWidth = (naturalWidth / naturalHeight) * innerHeight
    const autoHeight = (naturalHeight / naturalWidth) * innerWidth

    if (naturalWidth < innerWidth && naturalHeight < innerHeight) {
        width = naturalWidth
        height = naturalHeight
    } else if (naturalWidth < innerWidth && naturalHeight >= innerHeight) {
        width = autoWidth
        height = innerHeight
    } else if (naturalWidth >= innerWidth && naturalHeight < innerHeight) {
        width = innerWidth
        height = autoHeight
    } else if (naturalWidth / naturalHeight > innerWidth / innerHeight) {
        width = innerWidth
        height = autoHeight
    } else if (naturalHeight / naturalWidth >= 3 && !isVertical) {
        // 长图模式
        width = innerWidth
        height = autoHeight
        // 默认定位到顶部区域
        y = (height - innerHeight) / 2
    } else {
        width = autoWidth
        height = innerHeight
    }
    return {
        width: Math.floor(width),
        height: Math.floor(height),
        x: 0,
        y,
        scale: 1,
    }
}

interface MultipleTouchPositionReturn {
    clientX: number
    clientY: number
    touchLength: number
}

/**
 * 从 Touch 事件中获取两个触控中心位置
 */
export const getMultipleTouchPosition = (evt: React.TouchEvent): MultipleTouchPositionReturn => {
    const { clientX, clientY } = evt.touches[0]
    if (evt.touches.length >= 2) {
        const { clientX: nextClientX, clientY: nextClientY } = evt.touches[1]
        return {
            clientX: (clientX + nextClientX) / 2,
            clientY: (clientY + nextClientY) / 2,
            touchLength: Math.sqrt((nextClientX - clientX) ** 2 + (nextClientY - clientY) ** 2),
        }
    }
    return { clientX, clientY, touchLength: 0 }
}

interface PositionOnMoveOrScaleParams {
    x: number
    y: number
    clientX: number
    clientY: number
    offsetX?: number
    offsetY?: number
    fromScale: number
    toScale: number
}

interface PositionOnMoveOrScaleReturn {
    x: number
    y: number
    scale: number
    lastMoveClientX: number
    lastMoveClientY: number
}

/**
 * 获取移动或缩放之后的中心点
 */
export const getPositionOnMoveOrScale = ({
    x,
    y,
    clientX,
    clientY,
    offsetX = 0,
    offsetY = 0,
    fromScale,
    toScale,
}: PositionOnMoveOrScaleParams): PositionOnMoveOrScaleReturn => {
    const { innerWidth, innerHeight } = window
    const centerClientX = innerWidth / 2
    const centerClientY = innerHeight / 2
    // 坐标偏移
    const lastPositionX = centerClientX + x
    const lastPositionY = centerClientY + y

    // 放大偏移量
    const offsetScale = toScale / fromScale
    // 偏移位置
    const originX = clientX - (clientX - lastPositionX) * offsetScale - centerClientX
    const originY = clientY - (clientY - lastPositionY) * offsetScale - centerClientY
    return {
        x: originX + offsetX,
        y: originY + offsetY,
        scale: toScale,
        lastMoveClientX: clientX,
        lastMoveClientY: clientY,
    }
}

/**
 * 接触左边/上边 或 右边/下边边缘
 * @param position - x/y
 * @param scale
 * @param size - width/height
 * @param innerSize - innerWidth/innerHeight
 * @return CloseEdgeEnum
 */
export const getClosedEdge = (position: number, scale: number, size: number, innerSize: number): CloseEdgeEnum => {
    const currentWidth = size * scale
    // 图片超出的宽度
    const outOffsetX = (currentWidth - innerSize) / 2
    if (currentWidth <= innerSize) {
        return CloseEdgeEnum.Small
    }
    if (position > 0 && outOffsetX - position <= 0) {
        return CloseEdgeEnum.Before
    }
    if (position < 0 && outOffsetX + position <= 0) {
        return CloseEdgeEnum.After
    }
    return CloseEdgeEnum.Normal
}

interface ReachTypeParams {
    initialTouchState: TouchStartEnum
    horizontalCloseEdge: CloseEdgeEnum
    verticalCloseEdge: CloseEdgeEnum
    reachState: ReachTypeEnum
}

/**
 * 获取接触边缘类型
 * @param initialTouchState
 * @param horizontalCloseEdge
 * @param verticalCloseEdge
 * @param reachState
 */
export const getReachType = ({
    initialTouchState,
    horizontalCloseEdge,
    verticalCloseEdge,
    reachState,
}: ReachTypeParams): ReachTypeEnum => {
    if ((horizontalCloseEdge > 0 && initialTouchState === TouchStartEnum.X) || reachState === ReachTypeEnum.XReach) {
        return ReachTypeEnum.XReach
    }
    if (
        (verticalCloseEdge > 0 &&
            (initialTouchState === TouchStartEnum.YPull || initialTouchState === TouchStartEnum.YPush)) ||
        reachState === ReachTypeEnum.YReach
    ) {
        return ReachTypeEnum.YReach
    }
    return ReachTypeEnum.Normal
}

interface SlideToPositionParams {
    x: number
    y: number
    lastX: number
    lastY: number
    width: number
    height: number
    scale: number
    rotate: number
    touchedTime: number
}

interface SliderToPositionReturn {
    x: number
    y: number
}

/**
 * 适应到合适的图片偏移量
 */
export const slideToPosition = ({
    x,
    y,
    lastX,
    lastY,
    width,
    height,
    scale,
    rotate,
    touchedTime,
}: SlideToPositionParams): SliderToPositionReturn => {
    const moveTime = Date.now() - touchedTime

    // 初始速度
    const speedX = (x - lastX) / moveTime
    const speedY = (y - lastY) / moveTime

    // 停下所消耗时间
    const slideTimeX = Math.abs(speedX / slideAcceleration)
    const slideTimeY = Math.abs(speedY / slideAcceleration)

    // 计划滑动位置
    const planX = Math.floor(x + speedX * slideTimeX)
    const planY = Math.floor(y + speedY * slideTimeY)

    // 若图片不是水平则调换属性
    if (rotate % 180 !== 0) {
        ;[width, height] = [height, width]
    }

    let currentX = planX
    let currentY = planY

    const { innerWidth, innerHeight } = window
    // 图片超出的长度
    const outOffsetX = (width * scale - innerWidth) / 2
    const outOffsetY = (height * scale - innerHeight) / 2

    const horizontalCloseEdge = getClosedEdge(planX, scale, width, innerWidth)
    const verticalCloseEdge = getClosedEdge(planY, scale, height, innerHeight)

    // x
    if (horizontalCloseEdge === CloseEdgeEnum.Small) {
        currentX = 0
    } else if (horizontalCloseEdge === CloseEdgeEnum.Before) {
        currentX = outOffsetX
    } else if (horizontalCloseEdge === CloseEdgeEnum.After) {
        currentX = -outOffsetX
    }
    // y
    if (verticalCloseEdge === CloseEdgeEnum.Small) {
        currentY = 0
    } else if (verticalCloseEdge === CloseEdgeEnum.Before) {
        currentY = outOffsetY
    } else if (verticalCloseEdge === CloseEdgeEnum.After) {
        currentY = -outOffsetY
    }

    // 时间过长
    if (
        moveTime >= maxTouchTime &&
        horizontalCloseEdge === CloseEdgeEnum.Normal &&
        verticalCloseEdge === CloseEdgeEnum.Normal
    ) {
        return {
            x,
            y,
        }
    }
    return {
        x: currentX,
        y: currentY,
    }
}

export type TapFuncType<T> = (...args: T[]) => void

/**
 * 单击和双击事件处理
 * @param singleTap - 单击事件
 * @param doubleTap - 双击事件
 * @return invokeTap
 */
export const withContinuousTap = <T>(singleTap: TapFuncType<T>, doubleTap: TapFuncType<T>): TapFuncType<T> => {
    // 当前连续点击次数
    let continuousClick = 0

    const withDebounceTap = debounce((...args) => {
        continuousClick = 0
        singleTap(...args)
    }, 300)

    return function invokeTap(...args) {
        continuousClick += 1
        withDebounceTap(...args)
        // 双击
        if (continuousClick >= 2) {
            withDebounceTap.cancel()
            continuousClick = 0
            doubleTap(...args)
        }
    }
}

interface CorrectSuitablePositionParams {
    x: number
    y: number
    scale: number
}

interface CorrectSuitablePositionReturn {
    x: number
    y: number
}

/**
 * 纠正缩放后偏离中心区域位置
 */
export const correctSuitablePosition = ({
    x,
    y,
    scale,
}: CorrectSuitablePositionParams): CorrectSuitablePositionReturn => {
    if (scale <= 1) {
        return {
            x: 0,
            y: 0,
        }
    }
    return {
        x,
        y,
    }
}

export const throttle = (func, wait: number) =>
    debounce(func, wait, {
        leading: true,
        maxWait: wait,
        trailing: true,
    })

/**
 * 是否支持触摸设备
 */
export const isTouchDevice = typeof document !== 'undefined' && 'ontouchstart' in document.documentElement

export const getAnimateOrigin = (originRect: OriginRectType, width: number, height: number): string | undefined => {
    if (originRect) {
        const { innerWidth, innerHeight } = window

        const xOrigin = (width - innerWidth) / 2 + originRect.clientX
        const yOrigin = (height - innerHeight) / 2 + originRect.clientY

        return `${xOrigin}px ${yOrigin}px`
    }

    return undefined
}
