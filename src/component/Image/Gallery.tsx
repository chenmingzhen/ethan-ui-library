import React, { useState, useRef } from 'react'
import { useEvent } from 'react-use'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { imageClass } from '@/styles'
import icons from '../icons'
import Magnify from './Magnify'
import { GalleryProps } from './type'

enum Direction {
    INIT = 'init',
    FORWARD = 'forward',
    BACKWARD = 'backward',
}

const ANIMATION_DURATION = 420

const Gallery: React.FC<GalleryProps> = (props) => {
    const { images, onClose } = props
    const [current, setCurrent] = useState<number>(props.current || 0)
    const [direction, setDirection] = useState<Direction>(Direction.INIT)
    const scrollTimer = useRef<ReturnType<typeof setTimeout>>()

    const handleClick = (index) => {
        const { length } = images

        let newCurrent = current + index

        if (newCurrent < 0) {
            newCurrent = 0
        } else if (newCurrent >= length) {
            newCurrent = length - 1
        } else {
            const newDirection = index === 1 ? Direction.FORWARD : Direction.BACKWARD
            setDirection(newDirection)
        }

        setCurrent(newCurrent)

        scrollTimer.current = setTimeout(() => {
            scrollTimer.current = null
            setDirection(Direction.INIT)
        }, ANIMATION_DURATION)
    }

    const handleScroll = (e: WheelEvent) => {
        e.preventDefault()

        if (scrollTimer.current) return

        const wheel = normalizeWheel(e)

        if (wheel.spinY < 0) handleClick(-1)
        if (wheel.spinY > 0) handleClick(1)

        scrollTimer.current = setTimeout(() => {
            scrollTimer.current = null
        }, ANIMATION_DURATION)
    }

    const renderImage = (image, pos) => (
        <div
            key={image.key}
            className={imageClass(pos, direction)}
            onClick={pos !== 'center' ? handleClick.bind(null, pos === 'left' ? -1 : 1) : undefined}
        >
            {pos === 'center' && (
                <a onClick={props.onClose} className={imageClass('close')}>
                    {icons.Close}
                </a>
            )}
            <Magnify position={pos} src={image.src} />
        </div>
    )

    useEvent('wheel', handleScroll, document, { passive: false })

    const currentImage = images[current]

    const result = []

    result.push(<div key="overlay" className={imageClass('overlay')} onClick={onClose} />)

    if (images[current - 1]) result.push(renderImage(images[current - 1], 'left'))

    result.push(renderImage(currentImage, 'center'))

    if (images[current + 1]) result.push(renderImage(images[current + 1], 'right'))

    return result as unknown as JSX.Element
}

export default React.memo(Gallery)
