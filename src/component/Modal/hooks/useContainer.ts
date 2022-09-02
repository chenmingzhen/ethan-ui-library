import { useCallback, useEffect, useRef } from 'react'
import { modalClass } from '@/styles'
import classnames from 'classnames'
import isDOMElement from '@/utils/dom/isDOMElement'
import { ModalProps } from '../type'

type UseContainerProps = Pick<ModalProps, 'getContainer' | 'position' | 'rootClassName'>

const useContainer = (props: UseContainerProps) => {
    const { getContainer, position, rootClassName } = props

    const hasInitContainer = useRef(false)

    const portalContainer = useRef<HTMLDivElement>(document.createElement('div')).current

    const propContainer = getContainer?.()

    const container = isDOMElement(propContainer) ? propContainer : document.body

    const initContainer = useCallback(() => {
        if (!hasInitContainer.current) {
            container.appendChild(portalContainer)

            portalContainer.className = classnames(modalClass('_', position && 'position'), rootClassName)

            hasInitContainer.current = true
        }
    }, [rootClassName])

    useEffect(() => {
        return () => {
            if (portalContainer && container) {
                container.removeChild(portalContainer)
            }
        }
    }, [])

    return { portalContainer, initContainer }
}

export default useContainer
