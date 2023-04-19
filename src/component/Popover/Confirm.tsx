import React, { useState } from 'react'
import { getLocale } from '@/locale'
import { popoverClass } from '@/styles'
import Popover from './Popover'
import Button from '../Button'
import Alert from '../Alert'
import { ConfirmProps } from './type'

const Confirm: React.FC<ConfirmProps> = (props) => {
    const { buttonProps = { ok: {}, cancel: {} }, text, onOk, onCancel, type, children, description, ...other } = props

    const [okLoading, setOkLoading] = useState(false)

    const [cancelLoading, setCancelLoading] = useState(false)

    async function handleClick(eventType, close: () => void) {
        const fn = eventType === 'ok' ? onOk : onCancel

        const callback = fn?.()

        if (callback && typeof callback.finally === 'function' && typeof callback.finally === 'function') {
            if (eventType === 'ok') {
                setOkLoading(true)

                callback.finally(() => {
                    setOkLoading(false)

                    close()
                })
            } else {
                setCancelLoading(true)

                callback.finally(() => {
                    setCancelLoading(false)

                    close()
                })
            }
        } else {
            close()
        }
    }

    function buildContent(close: () => void) {
        return (
            <div className={popoverClass('confirm')}>
                <div className={popoverClass('mention')}>
                    <Alert type={type} icon className={popoverClass('alert')}>
                        {description}
                    </Alert>
                </div>

                <div className={popoverClass('footer')}>
                    <Button
                        loading={cancelLoading}
                        size="small"
                        onClick={handleClick.bind(this, 'cancel', close)}
                        disabled={okLoading}
                        {...buttonProps?.cancel}
                    >
                        {getLocale('cancel', text)}
                    </Button>
                    <Button
                        loading={okLoading}
                        size="small"
                        type="primary"
                        onClick={handleClick.bind(this, 'ok', close)}
                        disabled={cancelLoading}
                        {...buttonProps?.ok}
                    >
                        {getLocale('ok', text)}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <Popover {...other} trigger="mousedown" content={buildContent} isConfirmLoading={okLoading || cancelLoading}>
            {children}
        </Popover>
    )
}

export default React.memo(Confirm)
