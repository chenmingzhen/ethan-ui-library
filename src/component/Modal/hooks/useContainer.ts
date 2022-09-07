import { useCallback, useEffect, useRef } from 'react'
import { modalClass } from '@/styles'
import classnames from 'classnames'
import isDOMElement from '@/utils/dom/isDOMElement'
import { ModalProps } from '../type'

type UseContainerProps = Pick<ModalProps, 'getContainer' | 'position' | 'rootClassName'>

const useContainer = (props: UseContainerProps) => {
    const { getContainer, position, rootClassName } = props

    const hasInitContainer = useRef(false)

    const portalContainerRef = useRef<HTMLDivElement>()

    const initPortalContainer = useCallback(() => {
        const propContainer = getContainer?.()

        const container = isDOMElement(propContainer) ? propContainer : document.body

        if (!hasInitContainer.current) {
            portalContainerRef.current = document.createElement('div')

            const portalContainer = portalContainerRef.current

            container.appendChild(portalContainer)

            portalContainer.className = classnames(modalClass('_', position && 'position'), rootClassName)

            hasInitContainer.current = true
        }
    }, [rootClassName])

    useEffect(() => {
        return () => {
            const portalContainer = portalContainerRef.current

            if (portalContainer && portalContainer.parentElement) {
                portalContainer.parentElement.removeChild(portalContainer)
            }
        }
    }, [])

    return { portalContainerRef, initPortalContainer }
}

export default useContainer
