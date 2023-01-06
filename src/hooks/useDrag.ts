import { isZero } from '@/utils/is'
import useMergedValue from './useMergedValue'
import useRefMethod from './useRefMethod'
import useSafeState from './useSafeState'

export interface UseDragProps {
    clientX?: number
    clientY?: number
    onDragStart?: (e: React.MouseEvent<HTMLElement>) => void
    onDragEnd?: (e: MouseEvent) => void
    onDrag?: (moveX: number, moveY: number, clientX: number, clientY: number) => void
}

function useDrag(props: UseDragProps): [number, number, (e: React.MouseEvent<HTMLElement>) => void] {
    const { onDragStart, onDragEnd, onDrag } = props
    const [clientX, updateClientX] = useMergedValue({
        defaultStateValue: undefined,
        options: {
            defaultValue: undefined,
            value: props.clientX,
        },
    })
    const [clientY, updateClientY] = useMergedValue({
        defaultStateValue: undefined,
        options: {
            defaultValue: undefined,
            value: props.clientY,
        },
    })
    const [dragging, updateDragging] = useSafeState(false)

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

        if (isZero(moveX) && isZero(moveY)) return

        updateClientX(nextClientX)
        updateClientY(nextClientY)

        if (onDrag) {
            onDrag(moveX, moveY, nextClientX, nextClientY)
        }
    })

    const handleDragEnd = useRefMethod((e: MouseEvent) => {
        if (!dragging) return

        updateDragging(false)

        if (onDragEnd) {
            onDragEnd(e)
        }

        removeEvents()
    })

    const handleDragStart = useRefMethod((e: React.MouseEvent<HTMLElement>) => {
        if (e.button !== 0) return

        updateClientX(e.clientX)
        updateClientY(e.clientY)
        updateDragging(true)

        if (onDragStart) {
            onDragStart(e)
        }

        addEvents()
    })

    return [clientX, clientY, handleDragStart]
}

export default useDrag
