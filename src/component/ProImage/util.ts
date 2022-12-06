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
