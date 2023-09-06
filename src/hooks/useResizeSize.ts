import { resizableClass } from '@/styles'
import { useEffect, useRef } from 'react'
import useRefMethod from './useRefMethod'
import useSetState from './useSetState'

interface UseResizeSizeProps {
    getResizeTarget?: () => HTMLElement
    dirs?: Dir[]
}

type Dir = 'e' | 's' | 'se'

interface ResizableState {
    /** 当前拖动的摇杆方向 */
    activeDir: string
    /* 移动过程产生的X */
    moveX: number
    /* 移动过程产生的Y */
    moveY: number
    startMoveClientX: number
    startMoveClientY: number
    x: number
    y: number
}

export default function useResizeSize(props: UseResizeSizeProps) {
    const { getResizeTarget, dirs = ['e', 's', 'se'] } = props
    const [state, setState] = useSetState<ResizableState>({
        activeDir: '',
        moveX: 0,
        moveY: 0,
        x: 0,
        y: 0,
        startMoveClientX: 0,
        startMoveClientY: 0,
    })
    const handlers = useRef(new Map<HTMLElement, () => void>()).current
    const targetSize = useRef({
        clientWidth: 0,
        clientHeight: 0,
    }).current

    const handleMouseMove = useRefMethod((e: MouseEvent) => {
        if (!state.activeDir) return

        const moveX = e.clientX - state.startMoveClientX
        const moveY = e.clientY - state.startMoveClientY

        setState((nextState) => {
            if (nextState.activeDir.indexOf('e') >= 0) nextState.moveX = moveX
            if (nextState.activeDir.indexOf('s') >= 0) nextState.moveY = moveY

            return nextState
        })
    })

    const handleMouseUp = useRefMethod(() => {
        setState((nextState) => ({
            ...nextState,
            x: nextState.x + nextState.moveX,
            y: nextState.y + nextState.moveY,
            moveX: 0,
            moveY: 0,
        }))

        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('mouseleave', handleMouseUp)
    })

    const handleMouseDown = useRefMethod((dir: string, e: MouseEvent) => {
        const { clientX, clientY } = e

        setState({ activeDir: dir, startMoveClientX: clientX, startMoveClientY: clientY })

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mouseleave', handleMouseUp)
    })

    useEffect(() => {
        const target = getResizeTarget()

        if (target) {
            const { offsetWidth, offsetHeight } = target

            targetSize.clientWidth = offsetWidth
            targetSize.clientHeight = offsetHeight

            dirs.forEach((dir) => {
                const handler = document.createElement('div')
                const action = handleMouseDown.bind(null, dir)

                handler.className = resizableClass('handler', `handler-${dir}`)
                handler.addEventListener('mousedown', action)

                handlers.set(handler, action)

                target.appendChild(handler)
            })

            return () => {
                handlers.forEach((action, handler) => {
                    handler.removeEventListener('mousedown', action)
                })

                handlers.clear()
            }
        }
    }, [dirs?.join()])

    const width = targetSize.clientWidth + state.moveX + state.x
    const height = targetSize.clientHeight + state.moveY + state.y

    return { width, height }
}
