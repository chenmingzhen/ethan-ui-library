import React from 'react'
import Modal from './Modal'
import createMethodModal from './createMethodModal'
import { ModalProps } from './type'

export type ModalMethodType = ReturnType<typeof createMethodModal>

export interface ModalComponent extends React.FunctionComponent<ModalProps> {
    success: ModalMethodType
    info: ModalMethodType
    warn: ModalMethodType
    error: ModalMethodType
    confirm: ModalMethodType
    show: ModalMethodType
}

const exportModal = Modal as unknown as ModalComponent

exportModal.success = createMethodModal('success')
exportModal.info = createMethodModal('info')
exportModal.warn = createMethodModal('warning')
exportModal.error = createMethodModal('error')
exportModal.confirm = createMethodModal('confirm')
exportModal.show = createMethodModal('normal')

export default exportModal
