import React, { useEffect } from 'react'

interface UseBindEventsProps {
    parentElementRef: React.RefObject<HTMLElement>

    elementRef: React.RefObject<HTMLElement>

    handleShow(): void

    handleHide(e?: MouseEvent): void

    trigger: 'click' | 'hover'
}

const useBindEvents = ({ trigger, parentElementRef, elementRef, handleHide, handleShow }: UseBindEventsProps) => {
    useEffect(() => {
        if (trigger === 'hover') {
            parentElementRef.current.addEventListener('mouseenter', handleShow)
            parentElementRef.current.addEventListener('mouseleave', handleHide)

            elementRef.current.addEventListener('mouseenter', handleShow)
            elementRef.current.addEventListener('mouseleave', handleHide)

            return () => {
                elementRef.current.removeEventListener('mouseenter', handleShow)
                elementRef.current.removeEventListener('mouseleave', handleHide)
            }
        }

        // click handler
        parentElementRef.current.addEventListener('click', handleShow)
        parentElementRef.current.removeEventListener('mouseenter', handleShow)
        parentElementRef.current.removeEventListener('mouseleave', handleHide)

        return () => {
            parentElementRef.current.removeEventListener('click', handleShow)
        }
    }, [trigger])
}

export default useBindEvents
