import { useState, useCallback, useEffect, RefObject } from 'react'
import { IAlertProps } from '../alert'

interface UseDismissProps extends Pick<IAlertProps, 'onClose' | 'duration' | 'outAnimation' | 'internalOnClose'> {
    el: RefObject<HTMLDivElement>
}

const useDismiss = ({ onClose, el, duration, outAnimation, internalOnClose }: UseDismissProps) => {
    /* 0:normal 1:running closed 2:running closed over */
    const [dismiss, setDismiss] = useState(0)

    const handleDismiss = useCallback(() => {
        setDismiss(2)

        typeof onClose === 'function' && onClose?.()
    }, [onClose])

    const handleClose = useCallback(() => {
        if (dismiss > 0) return

        // Message动画
        if (outAnimation && internalOnClose) {
            internalOnClose(duration, el.current.offsetHeight)

            return
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
