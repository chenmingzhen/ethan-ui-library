import React from 'react'
import Modal, { ModalExtendsProps } from './Modal'
import { createModalMethod } from './events'

export type ModalMethodType = ReturnType<typeof createModalMethod>

export interface ModalComponent extends React.ComponentClass<ModalExtendsProps> {
    success: ModalMethodType
    info: ModalMethodType
    warn: ModalMethodType
    error: ModalMethodType
    confirm: ModalMethodType
    show: ModalMethodType
}

const exportModal = (Modal as unknown) as ModalComponent

exportModal.success = createModalMethod('success')
exportModal.info = createModalMethod('info')
exportModal.warn = createModalMethod('warning')
exportModal.error = createModalMethod('error')
exportModal.confirm = createModalMethod('confirm')
exportModal.show = createModalMethod('normal')

export default exportModal
