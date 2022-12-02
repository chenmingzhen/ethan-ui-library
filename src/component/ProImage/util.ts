import { OriginRect } from './type'

export const getSuitableImageSize = (naturalWidth: number, naturalHeight: number, rotate: number) => {
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

export const getAnimateOrigin = (originRect: OriginRect): string | undefined => {
    if (originRect) {
        const { innerWidth, innerHeight } = window

        const xOrigin = -innerWidth / 2 + originRect.clientX
        const yOrigin = -innerHeight / 2 + originRect.clientY

        return `${xOrigin}px ${yOrigin}px`
    }

    return undefined
}
