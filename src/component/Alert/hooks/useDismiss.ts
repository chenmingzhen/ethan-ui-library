import { isFunc } from '@/utils/is'
import { useState, useCallback, RefObject } from 'react'
import { AlertProps } from '../type'

interface UseDismissProps extends Pick<AlertProps, 'onClose' | 'duration'> {
    alertContainerElementRef: RefObject<HTMLDivElement>

    onDismiss: (duration?: number, height?: number) => void
}

const useDismiss = ({ onClose, alertContainerElementRef, duration, onDismiss }: UseDismissProps) => {
    /* 0:normal 1:running closed 2:running closed over */
    const [dismiss, setDismiss] = useState(0)

    const handleDismiss = useCallback(() => {
        setDismiss(2)

        if (isFunc(onClose)) {
            onClose()
        }
    }, [onClose])

    const handleClose = useCallback(() => {
        if (dismiss > 0) return

        // Message动画
        if (onDismiss) {
            onDismiss(duration, alertContainerElementRef.current.offsetHeight)

            return
        }

        if (duration > 0) {
            setDismiss(1)

            setTimeout(handleDismiss, duration)
        } else {
            handleDismiss()
        }
    }, [dismiss, onClose, duration, handleDismiss])

    return { dismiss, handleClose }
}

export default useDismiss
