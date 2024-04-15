import React, { useEffect, useRef } from 'react'
import useRefMethod from '@/hooks/useRefMethod'
import { MessageAlertProps } from './type'
import Alert from '../Alert'

const MessageAlert: React.FC<MessageAlertProps> = function (props) {
    const { closeable, onDismiss, className, dismiss, iconSize, type, children } = props

    const alertElementRef = useRef<HTMLDivElement>()

    useEffect(() => {
        if (dismiss) {
            handleClose()
        }
    }, [dismiss])

    const handleClose = useRefMethod(() => {
        const { offsetHeight } = alertElementRef.current

        onDismiss(offsetHeight)
    })

    return (
        <Alert
            icon
            type={type}
            onClose={closeable}
            iconSize={iconSize}
            ref={alertElementRef}
            className={className}
            onInternalClose={handleClose}
        >
            {children}
        </Alert>
    )
}

export default React.memo(MessageAlert)
