/**
 * 默认currentIndex是在第一行，但是如果defaultIndex是后面的数据.
 * 例如最后一个，也放置在第一行的话，会出现溢出高度的情况，出现空白，
 * 所以如果有溢出，计算合适的currentIndex
 */

import { getRangeValue } from './numbers'

interface InitIndexParams {
    scrollIndex: number

    dataLength: number

    lineHeight: number

    height: number
}

export function getVirtualScrollCurrentIndex(params: InitIndexParams) {
    const { scrollIndex, dataLength, lineHeight, height } = params

    if (scrollIndex < -1 || scrollIndex > dataLength - 1) return 0

    let currentIndex = scrollIndex

    const scrollHeight = dataLength * lineHeight

    const emptyHeight = currentIndex * lineHeight

    const overflow = emptyHeight + height - scrollHeight

    if (overflow > 0) {
        currentIndex -= Math.ceil(overflow / lineHeight)

        /** 添加边界条件防止溢出，按常理是不会溢出的，溢出就是有bug */
        currentIndex = getRangeValue({ min: 0, max: dataLength - 1, current: currentIndex })
    }

    return currentIndex
}

interface ComputedScrollParams {
    dataLength: number
    lineHeight: number
    height: number
    currentIndex: number
}

/** 存在滚动的情况下，计算滚动的比例值和滚动值 */
export function computeScroll(params: ComputedScrollParams) {
    const { dataLength, lineHeight, height, currentIndex } = params

    const lastScrollTop = currentIndex * lineHeight

    const contentHeight = dataLength * lineHeight - height

    const scrollTopRatio = lastScrollTop / contentHeight

    return { lastScrollTop, scrollTopRatio }
}
