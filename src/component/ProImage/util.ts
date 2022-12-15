import { debounce } from '@/utils/func'
import { ScalePhotoTouchEdgeState } from './type'
import { INCREASE_ACCELERATED_SPEED_RATIO, INERTIA_SLIDE_MAX_TOUCH_TIME } from './variables'

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
export function getAnimateOrigin(originElement: HTMLElement) {
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

/**
 *
 * @param position 移动的向量
 * @param photoSize Photo 宽/高
 * @param innerSize window innerWidth/innerHeight
 * @param scale
 * @returns
 */
export function getScalePhotoTouchEdgeState(position: number, photoSize: number, innerSize: number, scale: number) {
    const currentSize = photoSize * scale

    const overflowLength = (currentSize - innerSize) / 2

    /** 向右/向下滑动的总距离超过了溢出的长度 */
    if (position > 0 && overflowLength - position <= 0) {
        return ScalePhotoTouchEdgeState.BOTTOM_RIGHT
    }

    /** 向左/向上滑动的总距离超过了溢出的长度 */
    if (position < 0 && overflowLength + position <= 0) {
        return ScalePhotoTouchEdgeState.TOP_LEFT
    }

    return ScalePhotoTouchEdgeState.NOT_TOUCH
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

    const offsetScale = toScale / fromScale

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
        lastClientX: nextClientX,
        lastClientY: nextClientY,
        scale: toScale,
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

interface Slide2PositionParams {
    currentX: number
    currentY: number
    scale: number
    width: number
    height: number
}

/** 缩放移动下，判断是否超过了边界，回滚到正常区域中 */
export function scaleMoveBack2NormalArea(params: Slide2PositionParams) {
    const { currentX, currentY, scale, width, height } = params
    const { innerHeight, innerWidth } = window
    const horizontalScalePhotoTouchEdgeState = getScalePhotoTouchEdgeState(currentX, width, innerWidth, scale)
    const verticalScalePhotoTouchEdgeState = getScalePhotoTouchEdgeState(currentY, height, innerHeight, scale)

    if (
        horizontalScalePhotoTouchEdgeState === ScalePhotoTouchEdgeState.NOT_TOUCH &&
        verticalScalePhotoTouchEdgeState === ScalePhotoTouchEdgeState.NOT_TOUCH
    ) {
        return {
            currentX,
            currentY,
        }
    }

    let nextX = currentX
    let nextY = currentY
    /** 溢出的长度 */
    const halfOverflowWidth = (width * scale - innerWidth) / 2
    const halfOverflowHeight = (height * scale - innerHeight) / 2

    if (horizontalScalePhotoTouchEdgeState === ScalePhotoTouchEdgeState.BOTTOM_RIGHT) {
        nextX = halfOverflowWidth
    } else if (horizontalScalePhotoTouchEdgeState === ScalePhotoTouchEdgeState.TOP_LEFT) {
        nextX = -halfOverflowWidth
    }

    if (verticalScalePhotoTouchEdgeState === ScalePhotoTouchEdgeState.BOTTOM_RIGHT) {
        nextY = halfOverflowHeight
    } else if (verticalScalePhotoTouchEdgeState === ScalePhotoTouchEdgeState.TOP_LEFT) {
        nextY = -halfOverflowHeight
    }

    return { currentX: nextX, currentY: nextY }
}

interface InertiaSlideParams {
    currentX: number
    clientX: number
    clientY: number
    currentY: number
    startTouchTime: number
    startClientX: number
    startClientY: number
}

/** 利用加速度计算惯性滑动的距离 */
export function inertiaSlide(params: InertiaSlideParams) {
    const { currentX, clientX, clientY, currentY, startTouchTime, startClientX, startClientY } = params

    const now = new Date().getTime()
    const moveTime = (now - startTouchTime) / 1000

    if (moveTime > INERTIA_SLIDE_MAX_TOUCH_TIME)
        return {
            planX: currentX,
            planY: currentY,
        }

    const moveX = clientX - startClientX
    const moveY = clientY - startClientY

    /** 初始速度为0，利用平均速度*2估算末速度 */
    const speedX = (moveX / moveTime) * 2
    const speedY = (moveY / moveTime) * 2

    /** 正常加速度a＝(Vt-Vo)/t,在乘一个系数（使滑动更平滑）得到一个最终的加速度 */
    const xAcceleratedSpeed = (speedX / moveTime) * INCREASE_ACCELERATED_SPEED_RATIO
    const yAcceleratedSpeed = (speedY / moveTime) * INCREASE_ACCELERATED_SPEED_RATIO

    /** 位移 */
    const sx = (1 / 2) * xAcceleratedSpeed * moveTime ** 2
    const sy = (1 / 2) * yAcceleratedSpeed * moveTime ** 2

    const planX = Math.floor(currentX + sx)
    const planY = Math.floor(currentY + sy)

    return {
        planX,
        planY,
    }
}
