import { docScroll, docSize } from '@/utils/dom/document'

const posKeys = ['left', 'top', 'bottom', 'right']

// 需要样式中transform配合
// 此处计算为Popover 或tooltip的children的位置
// 因为不知道具体Popover的content width与height，所以在css中使用transform使Popover的内容偏移
// 否则Popover的内容会与Chidlren在同一位置
export const getPositionStyle = (position: string, el: HTMLElement, container = document.body) => {
    if (!el) return {}

    const rect = el.getBoundingClientRect()

    // 浏览器滚动条宽度
    const scrollWidth = container === document.body ? window.innerWidth - document.body.clientWidth : 0

    let containerRect = { top: 0, left: 0, bottom: 0, right: 0 }

    if (container?.tagName === 'BODY') container = undefined

    if (container) containerRect = container.getBoundingClientRect()

    // 如果container是body 则滚动参与计算
    // 反之 只需要el和实际容器的 BoundingClientRect即可推出计算
    const scrollTop = container ? 0 : docScroll.top
    const scrollLeft = container ? 0 : docScroll.left

    const pos: { left?: number; top?: number; right?: number } = {}

    switch (position) {
        // windows滚动的距离+元素到屏幕的距离-元素容器到屏幕的距离
        case 'top-left':
            pos.left = scrollLeft + rect.left - containerRect.left
            pos.top = scrollTop + rect.top - containerRect.top
            break
        case 'top':
            pos.left = scrollLeft + rect.left - containerRect.left + rect.width / 2
            pos.top = scrollTop + rect.top - containerRect.top
            break
        case 'top-right':
            pos.right = (containerRect.right || docSize.width) - rect.right - scrollLeft - scrollWidth
            pos.top = scrollTop + rect.top - containerRect.top
            break
        case 'left-top':
            pos.left = scrollLeft + rect.left - containerRect.left
            pos.top = scrollTop + rect.top - containerRect.top
            break
        case 'left':
            pos.left = scrollLeft + rect.left - containerRect.left
            pos.top = scrollTop + rect.top - containerRect.top + rect.height / 2
            break
        case 'left-bottom':
            pos.left = scrollLeft + rect.left - containerRect.left
            pos.top = scrollTop + rect.bottom - containerRect.bottom
            break
        case 'right-top':
            pos.left = scrollLeft + rect.left - containerRect.left + rect.width
            pos.top = scrollTop + rect.top - containerRect.top
            break
        case 'right':
            pos.left = scrollLeft + rect.left - containerRect.left + rect.width
            pos.top = scrollTop + rect.top - containerRect.top + rect.height / 2
            break
        case 'right-bottom':
            pos.left = scrollLeft + rect.left - containerRect.left + rect.width
            pos.top = scrollTop + rect.bottom - containerRect.bottom
            break
        case 'bottom-left':
            pos.left = scrollLeft + rect.left - containerRect.left
            pos.top = scrollTop + rect.top - containerRect.top + rect.height
            break
        case 'bottom':
            pos.left = scrollLeft + rect.left - containerRect.left + rect.width / 2
            pos.top = scrollTop + rect.top - containerRect.top + rect.height
            break
        case 'bottom-right':
            pos.right = (containerRect.right || docSize.width) - rect.right - scrollLeft - scrollWidth
            pos.top = scrollTop + rect.top - containerRect.top + rect.height
            break
        case 'cover':
            pos.left = scrollLeft + rect.left - containerRect.left
            pos.top = scrollTop + rect.top - containerRect.top
            break
        default:
    }

    return posKeys.reduce(
        (data, key) => ({ ...data, [key]: typeof pos[key] === 'number' ? `${Math.round(pos[key])}px` : 'auto' }),
        {}
    )
}

export function getPosition(
    position: string,
    priorityDirection: string,
    element: HTMLElement,
    container: HTMLElement = document.body
) {
    if (position) return position
    if (!element) return 'top'

    const elementRect = element.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const horizontalPoint = elementRect.left + elementRect.width / 2
    const verticalPoint = elementRect.top + elementRect.height / 2

    const innerWidth = container === document.body ? docSize.width : containerRect.width
    const innerHeight = container === document.body ? docSize.height : containerRect.height

    if (priorityDirection === 'horizontal') {
        if (horizontalPoint > innerWidth / 2) position = 'left'
        else position = 'right'
    } else if (verticalPoint > innerHeight / 2) position = 'top'
    else position = 'bottom'

    return position
}
