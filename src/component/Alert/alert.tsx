import React, { useRef, useCallback, useEffect, useImperativeHandle, memo } from 'react'
import { alertClass } from '@/styles'
import Spin from '@/component/Spin'
import useDissmiss from './hooks/useDismiss'
import useRender from './hooks/useRender'

export type AlertType = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'loading'
export interface AlertProps {
    className?: string

    style?: React.CSSProperties

    type?: AlertType

    dismiss?: boolean

    icon?: boolean | Element

    iconSize?: number

    onClose?(t?: number, h?: number): void

    outAnimation?: boolean

    duration?: number

    closeItem?: React.ReactNode

    children?: React.ReactNode
}

export interface AlertInstance {
    clientHeight(): number
}

export default memo(
    React.forwardRef<AlertInstance, AlertProps>(
        (
            {
                className,
                style,
                dismiss: outerDismiss,
                icon,
                iconSize = 16,
                onClose,
                outAnimation,
                duration = 200,
                type = 'warning',
                closeItem,
                children,
            },
            alertRef
        ) => {
            const ref = useRef<HTMLDivElement>()
            const { dismiss, handleClose } = useDissmiss({ onClose, outAnimation, duration, el: ref })
            const { renderClose, renderIcon } = useRender({ icon, iconSize, handleClose, type, closeItem })

            const clientHeight = useCallback(() => ref.current?.clientHeight, [])

            useEffect(() => {
                outerDismiss && handleClose()
            }, [outerDismiss])

            useImperativeHandle(alertRef, () => ({ clientHeight }))

            if (dismiss === 2) return null

            let wrapClassName = alertClass(
                '_',
                type,
                /* shrink animation control by this (dismissed) */
                !outAnimation && dismiss === 1 && 'dismissed',
                onClose && 'with-close',
                icon && 'with-icon'
            )

            if (className) wrapClassName = `${wrapClassName} ${className}`

            return (
                <div ref={ref} className={wrapClassName} style={style}>
                    {onClose && renderClose}
                    {type !== 'loading' ? (
                        renderIcon
                    ) : (
                        <Spin name="ring" size={18} className={alertClass('loading-icon')} color="#17a2b8" />
                    )}
                    <div className={alertClass('content')}>{children}</div>
                </div>
            )
        }
    )
)
