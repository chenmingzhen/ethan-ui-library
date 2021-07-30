import { useState, useCallback, useEffect, RefObject } from 'react'

interface UseDismissProps {
    onClose?(t?: number, h?: number): void

    duration: number

    outAnimation?: boolean

    el: RefObject<HTMLDivElement>
}

const useDismiss = ({ onClose, el, duration, outAnimation }: UseDismissProps) => {
    /* 0:normal 1:running closed 2:running closed over */
    const [dismiss, setDismiss] = useState(0)

    const handleDismiss = useCallback(() => {
        setDismiss(2)

        typeof onClose === 'function' && onClose?.()
    }, [onClose])

    const handleClose = useCallback(() => {
        if (dismiss > 0) return

        // outer animation
        // 参数传回去 本组件不处理动画 由上容器设置动画效果
        if (outAnimation) {
            if (typeof onClose === 'function') {
                onClose(duration, el.current.offsetHeight)

                return
            }
        }

        if (duration > 0) {
            setDismiss(1)
        } else {
            handleDismiss()
        }
    }, [dismiss, onClose, duration, handleDismiss])

    useEffect(() => {
        if (dismiss === 1) setTimeout(handleDismiss, duration)
    }, [dismiss])

    return { dismiss, handleClose }
}

export default useDismiss
