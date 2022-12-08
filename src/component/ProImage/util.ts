import { debounce } from '@/utils/func'
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
    moveX: number
    moveY: number
}

// 在 JavaScript 中，你可以使用下列公式来计算缩放后的位置移动：
// 计算缩放后的 x 坐标
// new_x = (x - center_x) * scale + center_x + dx
// 计算缩放后的 y 坐标
// new_y = (y - center_y) * scale + center_y + dy

// 在这里，x 和 y 是要缩放的坐标，center_x 和 center_y 是缩放中心，scale 是缩放比例，dx 和 dy 是要移动的水平和竖直距离。

// 例如，如果要将坐标 (100, 100) 放大到原来的 2 倍，并以坐标 (50, 50) 为缩放中心，然后将坐标向右移动 10 个单位，向下移动 20 个单位，则可以使用下列代码计算出缩放后的坐标：
// 计算缩放后的 x 坐标
// new_x = (100 - 50) * 2 + 50 + 10 = 160
// 计算缩放后的 y 坐标
// new_y = (100 - 50) * 2 + 50 + 20 = 170

/** y轴移动，获取photoItem对应的位置信息 */
export function computedYAxisMovePosition(params: ComputedYAxisMovePositionParams) {
    const { currentX, currentY, nextClientX, nextClientY, moveX, moveY } = params

    const scaleRadio = 1

    const nextOffsetX = nextClientX - (nextClientX - currentX) * scaleRadio
    const nextOffsetY = nextClientY - (nextClientY - currentY) * scaleRadio

    const nextX = nextOffsetX + moveX
    const nextY = nextOffsetY + moveY

    return {
        currentX: nextX,
        currentY: nextY,
        lastMoveClientX: nextClientX,
        lastMoveClientY: nextClientY,
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
