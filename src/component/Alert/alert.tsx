import React from 'react'
import { alertClass } from '@/styles'
import Spin from '@/component/Spin'
import { capitalize } from '@/utils/strings'
import classnames from 'classnames'
import useRefMethod from '@/hooks/useRefMethod'
import { isFunc } from '@/utils/is'
import useSafeState from '@/hooks/useSafeState'
import icons from '../icons'
import { AlertProps } from './type'

const Alert: React.ForwardRefRenderFunction<HTMLDivElement, AlertProps> = (props, ref) => {
    const {
        icon,
        style,
        onClose,
        children,
        closeItem,
        className,
        iconSize = 16,
        duration = 216,
        onInternalClose,
        type = 'warning',
        ...rest
    } = props

    /* 0:正常显示 1:执行关闭动画中 2:关闭完成 */
    const [dismiss, setDismiss] = useSafeState(0)

    const handleClose = useRefMethod(() => {
        /** ForMessage */
        if (onInternalClose) {
            onInternalClose()
            return
        }

        if (dismiss > 0) return

        const handleDismiss = () => {
            setDismiss(2)

            isFunc(onClose) && onClose()
        }

        if (duration > 0) {
            setDismiss(1)

            setTimeout(handleDismiss, duration)
        } else {
            handleDismiss()
        }
    })

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

    const mc = classnames(
        alertClass('_', type, dismiss === 1 && 'dismissed', onClose && 'with-close', icon && 'with-icon'),
        className
    )

    return (
        <div {...rest} ref={ref} className={mc} style={style}>
            {renderIcon()}
            <div className={alertClass('content')}>{children}</div>
            {onClose && (
                <a className={alertClass('close')} onClick={handleClose}>
                    {closeItem || icons.Close}
                </a>
            )}
        </div>
    )
}

export default React.memo(React.forwardRef(Alert))
