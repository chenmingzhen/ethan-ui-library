import React, { useCallback, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { modalClass } from '@/styles'
import { runInNextFrame } from '@/utils/nextFrame'
import { KeyboardKey } from '@/utils/keyboard'
import useSafeState from '@/hooks/useSafeState'
import useUpdate from '@/hooks/useUpdate'
import { IModalProps } from './type'
import useContainer from './hooks/useContainer'
import { MODAL_ANIMATION_DURATION } from './util'
import Panel from './Panel'

const Modal: React.FC<IModalProps> = props => {
    const { visible, destroyOnClose, getContainer, rootClassName, position, zIndex, esc, onClose } = props

    /** 在使用MethodModal的时候，外层已经执行unmountComponentAtNode,内层handleClose仍会执行state的操作 */
    const [animationVisible, updateAnimationVisible] = useSafeState(false)

    const { portalContainerRef, initPortalContainer } = useContainer({ getContainer, rootClassName, position })

    const mountedRef = useRef(false)

    const update = useUpdate()

    function handleOpen() {
        if (animationVisible) return

        updateAnimationVisible(true)

        const html = document.body.parentNode as HTMLElement

        const scrollWidth = window.innerWidth - document.body.clientWidth

        html.style.overflow = 'hidden'

        html.style.paddingRight = `${scrollWidth}px`

        initPortalContainer()

        const portalContainer = portalContainerRef.current

        portalContainer.classList.remove(modalClass('end'))

        portalContainer.style.display = 'block'

        runInNextFrame(() => {
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
        const portalContainer = portalContainerRef.current

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

            /** 有可能前后的animationVisible一致，无法触发更新，添加强制更新(eg:默认visible是true，导致无法关闭) */
            update()
        }, MODAL_ANIMATION_DURATION)
    }

    useEffect(() => {
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

    /** 防止提前渲染Panel，触发初始化Panel的状态 */
    if (!portalContainerRef.current) return null

    return ReactDOM.createPortal(
        <Panel {...props} container={portalContainerRef.current} />,
        portalContainerRef.current
    )
}

export default React.memo(Modal)
