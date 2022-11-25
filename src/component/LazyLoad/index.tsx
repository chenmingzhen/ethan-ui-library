import React, { useState, useEffect, useRef } from 'react'
import { lazyloadClass } from '@/styles'
import { lazyLoad } from '@/utils/lazyload'

interface LazyLoadProps {
    children?: React.ReactNode

    placeholder?: React.ReactNode | JSX.Element

    container?: HTMLElement

    offset?: number
}

const LazyLoad: React.FC<LazyLoadProps> = ({ children, placeholder, container, offset = 0 }) => {
    const [ready, setReady] = useState(false)

    const placeholderRef = useRef<HTMLSpanElement>()

    useEffect(() => {
        const dispose = lazyLoad({
            offset,
            container,
            target: placeholderRef.current,
            render: () => setReady(true),
        })

        return dispose
    }, [])

    if (ready) return <>{children}</>

    return (
        <span ref={placeholderRef} className={lazyloadClass('_')}>
            {placeholder}
        </span>
    )
}

export default React.memo(LazyLoad)
