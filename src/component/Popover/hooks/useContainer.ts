import isDOMElement from '@/utils/dom/isDOMElement'
import React, { useRef, useEffect } from 'react'

interface UseContainerProps {
    getPopupContainer?(): HTMLElement

    elementRef: React.RefObject<HTMLElement>
}

const useContainer = ({ getPopupContainer, elementRef }: UseContainerProps) => {
    const containerRef = useRef<HTMLElement>()

    function getContainer() {
        const container = getPopupContainer?.()

        if (container && isDOMElement(container)) {
            const child = document.createElement('div')

            child.setAttribute('style', ' position: absolute; top: 0px; left: 0px; width: 100% ')

            return container.appendChild(child)
        }

        return document.body
    }

    useEffect(() => {
        containerRef.current = getContainer()

        containerRef.current.appendChild(elementRef.current)

        return () => {
            if (containerRef.current === document.body) {
                containerRef.current.removeChild(elementRef.current)
            } else {
                containerRef.current.parentElement.removeChild(containerRef.current)
            }
        }
    }, [])

    return [containerRef.current]
}

export default useContainer
