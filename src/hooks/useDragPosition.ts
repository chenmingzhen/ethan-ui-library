import { docSize } from '@/utils/dom/document'
import { isZero } from '@/utils/is'
import { useEffect } from 'react'
import useMergedValue from './useMergedValue'
import useRefMethod from './useRefMethod'
import useSafeState from './useSafeState'

export interface UseDragPositionProps {
    clientX?: number
    clientY?: number
    x?: number
    y?: number
    onDragStart?: (e: MouseEvent) => void
    onDragEnd?: (e: MouseEvent) => void
    onDrag?: (moveX: number, moveY: number, clientX: number, clientY: number, x: number, y: number) => void
    /** 获取拖动事件的触发元素 */
    getDragTarget: () => HTMLElement
    /** 获取用于计算边界的元素 */
    getBoundingElement?: () => HTMLElement
}

function useDragPosition(props: UseDragPositionProps) {
    const { onDragStart, onDragEnd, onDrag, getDragTarget, getBoundingElement } = props
    const [clientX, updateClientX] = useMergedValue({
        defaultStateValue: 0,
        options: {
            defaultValue: undefined,
            value: props.clientX,
        },
    })
    const [clientY, updateClientY] = useMergedValue({
        defaultStateValue: 0,
        options: {
            defaultValue: undefined,
            value: props.clientY,
        },
    })
    const [x, updateX] = useMergedValue({
        defaultStateValue: 0,
        options: {
            defaultValue: undefined,
            value: props.x,
        },
    })
    const [y, updateY] = useMergedValue({
        defaultStateValue: 0,
        options: {
            defaultValue: undefined,
            value: props.y,
        },
    })
    const [dragging, updateDragging] = useSafeState(false)
    const [boundingElementRect, updateBoundingElementRect] = useSafeState<DOMRect>(undefined)

    useEffect(() => {
        const target = getDragTarget()

        if (target) {
            target.addEventListener('mousedown', handleDragStart)

            return () => {
                target.removeEventListener('mousedown', handleDragStart)
            }
        }
    }, [getDragTarget])

    const addEvents = useRefMethod(() => {
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handleDragEnd)
        document.addEventListener('mouseleave', handleDragEnd)
    })

    const removeEvents = useRefMethod(() => {
        document.removeEventListener('mousemove', handleDrag)
        document.removeEventListener('mouseup', handleDragEnd)
        document.removeEventListener('mouseleave', handleDragEnd)
    })

    const handleDrag = useRefMethod((e: MouseEvent) => {
        if (!dragging || (!clientX && !clientY)) return

        const nextClientX = e.clientX
        const nextClientY = e.clientY
        const moveX = nextClientX - clientX
        const moveY = nextClientY - clientY
        let nextX = x + moveX
        let nextY = y + moveY

        if (isZero(moveX) && isZero(moveY)) return

        if (boundingElementRect) {
            const { left, top, bottom, right, height, width } = boundingElementRect

            if (nextX + left + width > docSize.width || nextX + right - width < 0) {
                nextX = x
            }

            if (nextY + top + height > docSize.height || nextY + bottom - height < 0) {
                nextY = y
            }
        }

        updateClientX(nextClientX)
        updateClientY(nextClientY)
        updateX(nextX)
        updateY(nextY)

        if (onDrag) {
            onDrag(moveX, moveY, nextClientX, nextClientY, x, y)
        }
    })

    const handleDragEnd = useRefMethod((e: MouseEvent) => {
        if (!dragging) return

        updateDragging(false)
        updateBoundingElementRect(undefined)
        removeEvents()
        if (onDragEnd) {
            onDragEnd(e)
        }
    })

    const handleDragStart = useRefMethod((e: MouseEvent) => {
        if (e.button !== 0) return

        updateClientX(e.clientX)
        updateClientY(e.clientY)
        updateDragging(true)
        addEvents()
        if (onDragStart) {
            onDragStart(e)
        }

        if (getBoundingElement) {
            const boundingElement = getBoundingElement()

            if (boundingElement) {
                updateBoundingElementRect(boundingElement.getBoundingClientRect())
            }
        }
    })

    return { clientX, clientY, x, y, dragging }
}

export default useDragPosition
