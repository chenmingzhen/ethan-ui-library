import React from 'react'
import Modal, { ModalExtendsProps } from './Modal'
import { createModalMethod } from './events'

export interface ModalComponent extends React.ComponentClass<ModalExtendsProps> {
    success: ReturnType<typeof createModalMethod>
    info: ReturnType<typeof createModalMethod>
    warn: ReturnType<typeof createModalMethod>
    error: ReturnType<typeof createModalMethod>
    confirm: ReturnType<typeof createModalMethod>
    show: ReturnType<typeof createModalMethod>
}

const exportModal = (Modal as unknown) as ModalComponent

exportModal.success = createModalMethod('success')
exportModal.info = createModalMethod('info')
exportModal.warn = createModalMethod('warning')
exportModal.error = createModalMethod('error')
exportModal.confirm = createModalMethod('confirm')
exportModal.show = createModalMethod('normal')

export default exportModal
