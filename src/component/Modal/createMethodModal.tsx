import { getLocale } from '@/locale'
import { isFunc, isPromise } from '@/utils/is'
import React from 'react'
import ReactDom from 'react-dom'
import Button from '../Button'
import Modal from './Modal'
import { MethodModalProps, ModalProps } from './type'
import { MODAL_ANIMATION_DURATION } from './util'

const createMethodModal = (type: ModalProps['type']) => (options: MethodModalProps) => {
    let props: MethodModalProps = Object.assign(
        {
            width: 420,
            esc: true,
        },
        options,
        {
            destroyOnClose: true,
            type,
            from: 'method',
            visible: true,
            children: options.content,
            onClose: close,
        }
    )

    const container = document.createDocumentFragment()

    function buildFooter() {
        function handleClose(callback: () => Promise<any> | void) {
            let callbackResult: Promise<any> | void

            if (isFunc(callback)) {
                callbackResult = callback()
            }

            if (isPromise(callbackResult)) {
                callbackResult.then(() => {
                    close()
                })
            } else {
                close()
            }
        }

        const btnOk = (
            <Button key="ok" type="primary" onClick={handleClose.bind(this, props.onOk)} {...props.okButtonProps}>
                {getLocale('ok', props.text)}
            </Button>
        )

        const btnCancel = (
            <Button key="cancel" onClick={handleClose.bind(this, props.onCancel)} {...props.cancelButtonProps}>
                {getLocale('cancel', props.text)}
            </Button>
        )

        if (type === 'confirm' && !options.footer) {
            props.footer = [btnCancel, btnOk]
        } else {
            props.footer = 'footer' in props ? props.footer : [btnOk]
        }
    }

    function render() {
        buildFooter()

        ReactDom.render(<Modal {...props} />, container)
    }

    function close() {
        update(prevProps => ({ ...prevProps, visible: false }))

        setTimeout(() => {
            if (container) {
                ReactDom.unmountComponentAtNode(container)
            }
        }, MODAL_ANIMATION_DURATION)
    }

    function update(nextProps: ModalProps | ((prevProps: ModalProps) => ModalProps)) {
        if (isFunc(nextProps)) {
            props = nextProps(props)
        } else {
            props = {
                ...props,
                ...nextProps,
            }
        }

        render()
    }

    render()

    return {
        close,
        update,
    }
}

export default createMethodModal
