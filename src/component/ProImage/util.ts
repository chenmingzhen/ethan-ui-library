import { debounce } from '@/utils/func'
import { toFixed } from '@/utils/numbers'
import { PhotoTouchEdgeState, TouchIntent, TriggerDirectionState } from './type'

export function getSuitableImageSize(naturalWidth: number, naturalHeight: number, rotate: number) {
    let width: number
    let height: number
    let { innerWidth, innerHeight } = window
    const isVertical = rotate % 180 !== 0

    if (isVertical) {
        ;[innerHeight, innerWidth] = [innerWidth, innerHeight]
    }

    /** 根据原图缩放比计算合适的宽高 */
    const autoWidth = (naturalWidth / naturalHeight) * innerHeight
    const autoHeight = (naturalHeight / naturalWidth) * innerWidth

    if (naturalWidth < innerWidth && naturalHeight < innerHeight) {
        width = naturalWidth
        height = naturalHeight
    } else if (naturalWidth < innerWidth && naturalHeight >= innerHeight) {
        width = autoWidth
        height = innerHeight
    } else if (
        (naturalWidth >= innerWidth && naturalHeight < innerHeight) ||
        naturalWidth / naturalHeight > innerWidth / innerHeight
    ) {
        width = innerWidth
        height = autoHeight
    } else if (naturalHeight / naturalWidth >= 3 && !isVertical) {
        width = innerWidth
        height = autoHeight
    } else {
        width = autoWidth
        height = innerHeight
    }
    return {
        width: Math.floor(width),
        height: Math.floor(height),
    }
}

/** ProImage中心点到屏幕中心的距离 */
export function getAnimateOrigin(originElement: HTMLDivElement) {
    if (!originElement) return undefined

    const rect = originElement.getBoundingClientRect()

    const { innerWidth, innerHeight } = window

    const xOrigin = rect.left + rect.width / 2 - innerWidth / 2
    const yOrigin = rect.top + rect.height / 2 - innerHeight / 2

    return `${xOrigin}px ${yOrigin}px`
}

export function handleContinueClick(singleClick: (...args) => void, doubleClick: (...args) => void) {
    let clickCount = 0

    const debounceSingleClick = debounce((...args) => {
        clickCount = 0

        singleClick(...args)
    }, 250)

    return function (...args) {
        clickCount += 1

        debounceSingleClick()

        if (clickCount === 2) {
            debounceSingleClick.cancel()

            clickCount = 0

            doubleClick(...args)
        }
    }
}

export function getPhotoTouchEdgeState(moveSize: number, photoSize: number, innerSize: number) {
    const currentSize = photoSize

    if (currentSize <= innerSize) {
        return PhotoTouchEdgeState.NORMAL_LESS_SCREEN
    }
}

/**
 * 获取应该触发哪个方向的事件
 * x轴：左右滑动 y轴:上下拉  */
export function getTriggerDirectionState(
    touchIntent: TouchIntent,
    horizontalTouchEdgeState: PhotoTouchEdgeState,
    verticalTouchEdgeState: PhotoTouchEdgeState,
    prevTriggerDirectionState: TriggerDirectionState
) {
    if (prevTriggerDirectionState === TriggerDirectionState.X_AXIS || touchIntent === TouchIntent.X_SLIDE) {
        return TriggerDirectionState.X_AXIS
    }

    if (
        prevTriggerDirectionState === TriggerDirectionState.Y_AXIS ||
        touchIntent === TouchIntent.Y_PULL_DOWN ||
        touchIntent === TouchIntent.Y_PULL_UP
    ) {
        return TriggerDirectionState.Y_AXIS
    }

    return TriggerDirectionState.NONE
}

interface ComputedYAxisMovePositionParams {
    currentX: number
    currentY: number
    nextClientX: number
    nextClientY: number
    moveX?: number
    moveY?: number
    fromScale?: number
    toScale?: number
}

// 在 JavaScript 中，你可以使用下列公式来计算缩放后的位置移动：
// 计算缩放后的 x 坐标
// new_x = (x - center_x) * scale + center_x + dx
// 计算缩放后的 y 坐标
// new_y = (y - center_y) * scale + center_y + dy

// 在这里，x 和 y 是要缩放的坐标，center_x 和 center_y 是缩放中心，scale 是缩放比例，dx 和 dy 是要移动的水平和竖直距离。

// 例如，如果要将坐标 (0, 0) 放大到原来的 2 倍，并以坐标 (50, 50) 为缩放中心，然后将坐标向右移动 10 个单位，向下移动 10 个单位，则可以使用下列代码计算出缩放后的坐标：
// 计算缩放后的 x 坐标
// new_x = (0 - 50) * 2 + 50 + 10 = -40
// 计算缩放后的 y 坐标
// new_y = (0 - 50) * 2 + 50 + 10 = -40

/** 获取photoItemY轴移动或者缩放或缩放移动对应的位置信息 */
export function computedYAxisMoveOrScaleMovePosition(params: ComputedYAxisMovePositionParams) {
    const { currentX, currentY, nextClientX, nextClientY, moveX = 0, moveY = 0, fromScale = 1, toScale = 1 } = params

    const { innerWidth, innerHeight } = window

    /** 屏幕的中心是原点(也是图片的transform-origin中心) */
    const centerClientX = innerWidth / 2
    const centerClientY = innerHeight / 2

    const offsetScale = toFixed(toScale / fromScale, 3)

    /** 点击的位置是缩放中心 */
    const scaleCenterX = nextClientX - centerClientX
    const scaleCenterY = nextClientY - centerClientY

    /** 计算currentX，currentY在最新缩放比的x,y，再加上本次的偏移量 */
    const dx = currentX * offsetScale + moveX
    const dy = currentY * offsetScale + moveY

    const newX = (0 - scaleCenterX) * offsetScale + scaleCenterX + dx
    const newY = (0 - scaleCenterY) * offsetScale + scaleCenterY + dy

    return {
        currentX: newX,
        currentY: newY,
        lastMoveClientX: nextClientX,
        lastMoveClientY: nextClientY,
        scale: toScale,
    }
}

export function computedYAxisMovePosition2(params: ComputedYAxisMovePositionParams) {
    const { currentX, currentY, nextClientX, nextClientY, moveX, moveY } = params

    return {
        currentX: currentX + moveX,
        currentY: currentY + moveY,
        lastMoveClientX: nextClientX,
        lastMoveClientY: nextClientY,
    }
}

interface CorrectSuitablePositionParams {
    currentX: number
    currentY: number
    scale: number
}

/** 大于1放大，小于等于1复原 */
export function getCorrectedPosition({ currentX, currentY, scale }: CorrectSuitablePositionParams) {
    return scale > 1 ? { currentX, currentY } : { currentX: 0, currentY: 0 }
}
