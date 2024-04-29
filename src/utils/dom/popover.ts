import { docSize } from '@/utils/dom/document'

const posKeys = ['left', 'top', 'bottom', 'right']

// 需要样式中transform配合
// 此处计算为Popover 或tooltip的children的位置
// 因为不知道具体Popover的content width与height，所以在css中使用transform使Popover的内容偏移
// 否则Popover的内容会与Chidlren在同一位置
export const getPositionStyle = (position: string, triggerElement: HTMLElement, container = document.body) => {
    if (!triggerElement) return {}

    const triggerRect = triggerElement.getBoundingClientRect()

    // 浏览器滚动条宽度
    const scrollWidth = container === document.body ? window.innerWidth - document.body.clientWidth : 0

    const containerRect = container.getBoundingClientRect()

    const pos: React.CSSProperties = {}

    switch (position) {
        case 'top-left':
            pos.left = triggerRect.left - containerRect.left
            pos.top = triggerRect.top - containerRect.top
            break
        case 'top':
            pos.left = triggerRect.left - containerRect.left + triggerRect.width / 2
            pos.top = triggerRect.top - containerRect.top
            break
        case 'top-right':
            pos.right = (containerRect.right || docSize.width) - triggerRect.right - scrollWidth
            pos.top = triggerRect.top - containerRect.top
            break
        case 'left-top':
            pos.left = triggerRect.left - containerRect.left
            pos.top = triggerRect.top - containerRect.top
            break
        case 'left':
            pos.left = triggerRect.left - containerRect.left
            pos.top = triggerRect.top - containerRect.top + triggerRect.height / 2
            break
        case 'left-bottom':
            pos.left = triggerRect.left - containerRect.left
            pos.top = triggerRect.bottom - containerRect.bottom
            break
        case 'right-top':
            pos.left = triggerRect.left - containerRect.left + triggerRect.width
            pos.top = triggerRect.top - containerRect.top
            break
        case 'right':
            pos.left = triggerRect.left - containerRect.left + triggerRect.width
            pos.top = triggerRect.top - containerRect.top + triggerRect.height / 2
            break
        case 'right-bottom':
            pos.left = triggerRect.left - containerRect.left + triggerRect.width
            pos.top = triggerRect.bottom - containerRect.bottom
            break
        case 'bottom-left':
            pos.left = triggerRect.left - containerRect.left
            pos.top = triggerRect.top - containerRect.top + triggerRect.height
            break
        case 'bottom':
            pos.left = triggerRect.left - containerRect.left + triggerRect.width / 2
            pos.top = triggerRect.top - containerRect.top + triggerRect.height
            break
        case 'bottom-right':
            pos.right = (containerRect.right || docSize.width) - triggerRect.right - scrollWidth
            pos.top = triggerRect.top - containerRect.top + triggerRect.height
            break
        case 'cover':
            pos.left = triggerRect.left - containerRect.left
            pos.top = triggerRect.top - containerRect.top
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
