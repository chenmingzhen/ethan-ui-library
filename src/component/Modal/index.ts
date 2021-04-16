import Modal from './Modal'
import { createModalMethod } from './events'
import Card from '../Card'

Modal.success = createModalMethod('success')
Modal.info = createModalMethod('info')
Modal.warn = createModalMethod('warning')
Modal.error = createModalMethod('error')
Modal.confirm = createModalMethod('confirm')
Modal.show = createModalMethod('normal')
Modal.Submit = Card.Submit

export default Modal
