import { useState, useEffect } from 'react'

export enum Dismiss {
    OPEN,

    CALLBACK,

    CLOSING,

    CLOSED,
}

const useDismiss = () => {
    const [dismiss, setDismiss] = useState(Dismiss.OPEN)

    function dispatchCallback() {
        setDismiss(Dismiss.CALLBACK)
    }

    function dispatchClosing() {
        setDismiss(Dismiss.CLOSING)
    }

    function dispatchClosed() {
        setDismiss(Dismiss.CLOSED)
    }

    useEffect(() => {
        if (dismiss === Dismiss.CLOSING) {
            const timer = setTimeout(() => {
                dispatchClosed()
            }, 300)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [dismiss])

    return {
        dismiss,
        dispatchCallback,
        dispatchClosing,
        dispatchClosed,
    }
}

export default useDismiss
