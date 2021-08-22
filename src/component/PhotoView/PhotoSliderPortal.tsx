import React from 'react'
import { createPortal } from 'react-dom'
import { photoViewClass } from '@/styles'

// Slider的传送门
const PhotoSliderPortal: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...restProps }) => {
    const dialogNode = React.useRef<HTMLElement>(document.createElement('div'))
    const originalBodyOverflow = React.useRef('')

    React.useEffect(() => {
        document.body.appendChild(dialogNode.current)

        const { style } = document.body

        originalBodyOverflow.current = style.overflow

        style.overflow = 'hidden'

        return () => {
            style.overflow = originalBodyOverflow.current

            document.body.removeChild(dialogNode.current)
        }
    }, [])

    const sliderWrapClassName = `${photoViewClass('slideWrap')} ${className ?? ''}`

    return createPortal(
        <div className={sliderWrapClassName} {...restProps}>
            {children}
        </div>,
        dialogNode.current
    )
}

PhotoSliderPortal.displayName = 'PhotoSliderPortal'

export default PhotoSliderPortal
