import React, { useEffect, useRef } from 'react'
import { modalClass } from '@/styles'
import { KeyboardKey } from '@/utils/keyboard'
import useSafeState from '@/hooks/useSafeState'
import useRefMethod from '@/hooks/useRefMethod'
import { ModalProps } from './type'
import { MODAL_ANIMATION_DURATION } from './util'
import Panel from './Panel'
import Portal from '../Portal'
import Motion from '../Motion/Motion'

const Modal: React.FC<ModalProps> = (props) => {
    const { visible, destroyOnClose, getPopupContainer = () => document.body, esc, onClose } = props

    const mountedRef = useRef(false)
    const [allowDestroy, updateAllowDestroy] = useSafeState(false)

    const handleShowEffect = useRefMethod(() => {
        destroyOnClose && updateAllowDestroy(false)

        const html = document.body.parentNode as HTMLElement
        const scrollWidth = window.innerWidth - document.body.clientWidth

        html.style.overflow = 'hidden'
        html.style.paddingRight = `${scrollWidth}px`

        /** https://developer.mozilla.org/ja/docs/Web/API/Document/activeElement */
        ;(document.activeElement as HTMLElement)?.blur()
    })

    const handleHideEffect = useRefMethod(() => {
        setTimeout(() => {
            const hasAnyModalShow = !!document.body.querySelector(`.${modalClass('enter')}`)

            if (!hasAnyModalShow) {
                const doc = document.body.parentNode as HTMLElement

                doc.style.overflow = ''
                doc.style.paddingRight = ''
            }

            destroyOnClose && updateAllowDestroy(true)
        }, MODAL_ANIMATION_DURATION)
    })

    const handleKeydown = useRefMethod((evt: KeyboardEvent) => {
        if (evt.key !== KeyboardKey.Escape) return

        handleHideEffect()
        onClose()
    })

    useEffect(() => {
        if (visible) {
            handleShowEffect()
        } else if (mountedRef.current) {
            /** 初次副作用不执行关闭 */
            handleHideEffect()
        }

        mountedRef.current = true
    }, [visible])

    useEffect(() => {
        if (!esc) return

        window.addEventListener('keydown', handleKeydown)

        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    }, [esc])

    if (!visible && allowDestroy) return null

    return (
        <Portal show={visible} getPopupContainer={getPopupContainer}>
            <Motion name={modalClass('_')} visible={visible} leaveClassName={modalClass('hidden')}>
                <Panel {...props} />
            </Motion>
        </Portal>
    )
}

export default React.memo(Modal)
