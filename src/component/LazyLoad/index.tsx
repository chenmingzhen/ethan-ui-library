import React, { useState, useEffect, useRef } from 'react'
import { lazyloadClass } from '@/styles'
import { addStack, removeStack } from '@/utils/lazyload'

interface LazyLoadProps {
    children?: React.ReactNode

    placeholder?: React.ReactNode

    container?: HTMLElement

    offset?: number
}

const LazyLoad: React.FC<LazyLoadProps> = ({ children, placeholder, container, offset = 0 }) => {
    const [ready, setReady] = useState(false)

    const placeholderRef = useRef<HTMLSpanElement>()

    useEffect(() => {
        const lazyId = addStack({
            offset,
            container,
            element: placeholderRef.current,
            render: () => setReady(true),
        })

        return () => {
            removeStack(lazyId)
        }
    }, [])

    if (ready) return <>{children}</>

    return (
        <span ref={placeholderRef} className={lazyloadClass('_')}>
            {placeholder}
        </span>
    )
}

export default React.memo(LazyLoad)
