import useRefMethod from '@/hooks/useRefMethod'
import { useEffect } from 'react'
import { usePrevious } from 'react-use'

function removeMotionEvents(
    getElement: () => HTMLElement,
    onMotionEnd: (evt: TransitionEvent | AnimationEvent) => void
) {
    const prevElement = usePrevious(getElement())

    const addMotionEventListener = useRefMethod(() => {
        if (prevElement && prevElement !== getElement()) {
            removeMotionEventListener(prevElement)
        }

        const element = getElement()

        if (element) {
            element.addEventListener('transitionend', onMotionEnd)
            element.addEventListener('animationend', onMotionEnd)
        }
    })

    const removeMotionEventListener = useRefMethod((element: HTMLElement) => {
        element.removeEventListener('transitionend', onMotionEnd)
        element.removeEventListener('animationend', onMotionEnd)
    })

    useEffect(
        () => () => {
            if (prevElement && prevElement !== getElement()) {
                removeMotionEventListener(prevElement)
            }

            const element = getElement()

            if (element) {
                removeMotionEventListener(element)
            }
        },
        []
    )

    return [addMotionEventListener]
}

export default removeMotionEvents
