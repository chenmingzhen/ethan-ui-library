import React from 'react'
import ReactDom, { render } from 'react-dom'
import Modal from './Modal'
import { MethodModalProps, ModalProps } from './type'

const createMethodModal = (type: MethodModalProps['type']) => (options: ModalProps) => {
    const props: MethodModalProps = Object.assign(
        {
            width: 420,
            esc: true,
        },
        options,
        {
            destroyOnClose: true,
            type,
            from: 'method',
        }
    )

    const container = document.createDocumentFragment()

    function render() {
        ReactDom.render(<Modal {...props} />, container)
    }

    function destroy() {
        ReactDom.unmountComponentAtNode(container)
    }
}

export default createMethodModal
