import { AddResizeObserverOptions, addResizeObserver } from '@/utils/dom/element'
import { useEffect } from 'react'

interface UseResizeObserverProps {
    watch: boolean
    getTargetElement(): HTMLElement
    options: AddResizeObserverOptions
    onResize: () => void
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
