export const mousePosition: { x?: number; y?: number } = {}

export const setTransformOrigin = (node: HTMLElement, value) => {
    const { style } = node

    style.transformOrigin = value
}

export const handleStop = e => e.stopPropagation()

// 对Zoom情况做处理 记录点击的位置 从点击点缩放到中心
// https://github.com/ant-design/ant-design/blob/master/components/modal/Modal.tsx
const getClickPosition = (e: MouseEvent) => {
    mousePosition.x = e.clientX
    mousePosition.y = e.clientY

    setTimeout(() => {
        delete mousePosition.x
        delete mousePosition.y
    }, 100)
}

document.addEventListener('click', getClickPosition, true)
