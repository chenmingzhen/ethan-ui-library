import React, { useRef, useCallback, useEffect, useImperativeHandle, memo } from 'react'
import { alertClass } from '@/styles'
import Spin from '@/component/Spin'
import { capitalize } from '@/utils/strings'
import classnames from 'classnames'
import useDismiss from './hooks/useDismiss'
import icons from '../icons'
import { AlertInstance, AlertProps } from './type'

export default memo(
    React.forwardRef<AlertInstance, AlertProps>((props, alertRef) => {
        const {
            className,
            style,
            dismiss: propDismiss,
            icon,
            iconSize = 16,
            onClose,
            duration = 216,
            type = 'warning',
            closeItem,
            children,
            onDismiss,
        } = props
        const alertContainerElementRef = useRef<HTMLDivElement>()

        const { dismiss, handleClose } = useDismiss({
            onClose,
            onDismiss,
            duration,
            alertContainerElementRef,
        })

        const offsetHeight = useCallback(() => alertContainerElementRef.current?.offsetHeight, [])

        useEffect(() => {
            propDismiss && handleClose()
        }, [propDismiss])

        useImperativeHandle(alertRef, () => ({ offsetHeight }))

        if (dismiss === 2) return null

        function renderIcon() {
            if (type === 'loading')
                return <Spin name="ring" size={18} className={alertClass('loading-icon')} color="#17a2b8" />

            let iconElement: React.ReactNode

            if (typeof icon === 'boolean' && icon) {
                iconElement = icons[capitalize(type)]
            }

            if (!iconElement) return null

            return (
                <div
                    className={alertClass('icon')}
                    style={{
                        width: iconSize,
                        height: iconSize,
                        marginRight: iconSize / 2,
                    }}
                >
                    {iconElement}
                </div>
            )
        }

        function renderClose() {
            if (React.isValidElement(closeItem)) return React.cloneElement<any>(closeItem, { onClick: handleClose })

            return (
                <a className={alertClass('close')} onClick={handleClose}>
                    {closeItem || icons.Close}
                </a>
            )
        }

        const mc = classnames(
            alertClass(
                '_',
                type,
                !onDismiss && dismiss === 1 && 'dismissed',
                onClose && 'with-close',
                icon && 'with-icon'
            ),
            className
        )

        return (
            <div ref={alertContainerElementRef} className={mc} style={style}>
                {renderIcon()}
                <div className={alertClass('content')}>{children}</div>
                {onClose && renderClose()}
            </div>
        )
    })
)
