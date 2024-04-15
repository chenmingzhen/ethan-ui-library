import React from 'react'
import { runAsMicrotask } from '@/utils/func'
import { destroy, getComponent, closeWithAnimation } from './messager'
import { MessageOption, MessagePositionType } from './type'
import { AlertType } from '../Alert/type'

function create(type: AlertType) {
    return (
        content: React.ReactNode,
        duration = 3,
        options: MessageOption = { position: 'top', className: '', closeable: false }
    ) => {
        const { position = 'top' } = options

        let callback

        getComponent(position).then((messager) => {
            callback = messager.addMessage({
                content,
                type,
                duration,
                ...options,
            })
        })

        const hide = () => {
            runAsMicrotask(callback)
        }

        return hide
    }
}

const show = create('default')
const success = create('success')
const info = create('info')
const warn = create('warning')
const warning = create('warning')
const danger = create('danger')
const error = create('error')
const loading = create('loading')

function close(position?: MessagePositionType) {
    if (position) destroy(position)
    else {
        const positions: MessagePositionType[] = [
            'top',
            'middle',
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
        ]

        positions.forEach((c: MessagePositionType) => {
            destroy(c)
        })
    }
}

function closeAll(position?: MessagePositionType) {
    closeWithAnimation(position)
}

export default {
    show,
    success,
    info,
    warn,
    warning,
    danger,
    error,
    loading,
    close,
    closeAll,
}
