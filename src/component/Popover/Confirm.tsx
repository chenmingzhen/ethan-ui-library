import React, { useState } from 'react'
import { getLocale } from '@/locale'
import { popoverClass } from '@/styles'
import Popover, { PopoverProps } from './Popover'
import Button, { ButtonProps } from '../Button'
import Alert, { AlertProps } from '../Alert'

interface Text {
    ok: string

    cancel: string
}

export interface ConfirmProps extends PopoverProps {
    buttonProps?: { ok?: ButtonProps; cancel: ButtonProps }

    /** 按钮文字 */
    text?: Text

    onOk?(): void | Promise<void>

    onCancel?(): void | Promise<void>

    /** icon类型 */
    type?: AlertProps['type']

    /** 确认框的描述 */
    description?: React.ReactNode
}

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
        <Popover {...other} trigger="click" content={buildContent} isConfirmLoading={okLoading || cancelLoading}>
            {children}
        </Popover>
    )
}

export default React.memo(Confirm)
