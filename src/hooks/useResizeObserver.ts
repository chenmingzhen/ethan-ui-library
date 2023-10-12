import { AddResizeObserverOptions, addResizeObserver } from '@/utils/dom/element'
import { useEffect } from 'react'

export interface UseResizeObserverProps {
    watch: boolean
    getTargetElement(): HTMLElement | Element
    options: AddResizeObserverOptions
    onResize: (rect: DOMRect, element: Element) => void
}

export default function useResizeObserver(props: UseResizeObserverProps) {
    const { watch, getTargetElement, options, onResize } = props

    useEffect(() => {
        if (watch) {
            const target = getTargetElement()

            if (!target) return

            return addResizeObserver(target, onResize, options)
        }
    }, [watch])
}
