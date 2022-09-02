import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { modalClass } from '@/styles'
import { runInNextFrame } from '@/utils/nextFrame'
import { KeyboardKey } from '@/utils/keyboard'
import { IModalProps } from './type'
import useContainer from './hooks/useContainer'
import { ANIMATION_DURATION } from './util'
import Panel from './Panel'

const Modal: React.FC<IModalProps> = props => {
    const { visible, destroyOnClose, getContainer, rootClassName, position, zIndex, esc, onClose } = props

    const [animationVisible, updateAnimationVisible] = useState(visible)

    const animationRaf = useRef<NodeJS.Timeout>()

    const { portalContainer, initContainer } = useContainer({ getContainer, rootClassName, position })

    const mountedRef = useRef(false)

    function handleOpen() {
        if (animationVisible) return

        updateAnimationVisible(true)

        const html = document.body.parentNode as HTMLElement

        const scrollWidth = window.innerWidth - document.body.clientWidth

        html.style.overflow = 'hidden'

        html.style.paddingRight = `${scrollWidth}px`

        portalContainer.classList.remove(modalClass('end'))

        initContainer()

        runInNextFrame(() => {
            portalContainer.style.display = 'block'

            const opacity = props.maskOpacity ?? 0.25

            const hasVisible = !!document.body.querySelector(`.${modalClass('show')}`)

            const maskOpacity = hasVisible ? 0 : opacity

            portalContainer.style.zIndex = String(zIndex)

            portalContainer.style.background = props.maskBackground || `rgba(0,0,0,${maskOpacity})`

            runInNextFrame(() => {
                portalContainer.classList.add(modalClass('show'))

                !position && portalContainer.classList.add(modalClass('start'))
            })
        })

        /** https://developer.mozilla.org/ja/docs/Web/API/Document/activeElement */
        ;(document.activeElement as HTMLElement)?.blur()
    }

    function handleClose() {
        if (!animationVisible) return

        portalContainer.classList.remove(modalClass('show'), modalClass('start'))

        if (!position) portalContainer.classList.add(modalClass('end'))

        setTimeout(() => {
            portalContainer.style.display = 'none'

            portalContainer.classList.remove(modalClass('end'))

            const hasVisible = !!document.body.querySelector(`.${modalClass('show')}`)

            if (!hasVisible) {
                const doc = document.body.parentNode as HTMLElement

                doc.style.overflow = ''

                doc.style.paddingRight = ''
            }

            updateAnimationVisible(false)
        }, ANIMATION_DURATION)
    }

    useEffect(() => {
        if (animationRaf.current) {
            clearTimeout(animationRaf.current)

            animationRaf.current = null
        }

        /** 仅处理动画和DOM相关，不会执行事件的回调 */
        if (visible) {
            handleOpen()
        } else if (mountedRef.current) {
            /** 初次副作用不执行关闭 */
            handleClose()
        }

        mountedRef.current = true
    }, [visible])

    const handleKeydown = useCallback(
        (evt: KeyboardEvent) => {
            if (evt.key !== KeyboardKey.Escape) return

            handleClose()

            onClose()
        },
        [onClose]
    )

    useEffect(() => {
        if (esc) {
            window.addEventListener('keydown', handleKeydown)

            return () => {
                window.removeEventListener('keydown', handleKeydown)
            }
        }
    }, [esc, handleKeydown])

    if (!animationVisible && destroyOnClose) return null

    return ReactDOM.createPortal(<Panel {...props} container={portalContainer} />, portalContainer)
}

export default React.memo(Modal)
