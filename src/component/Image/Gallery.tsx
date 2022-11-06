import React, { useState, useRef } from 'react'
import { useEvent, useUpdateEffect } from 'react-use'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { docSize } from '@/utils/dom/document'
import { imageClass } from '@/styles'
import icons from '../icons'
import Magnify from './Magnify'

interface Image {
    key: string | number

    src: string
}

interface GalleryProps {
    onClose(e: any): void

    current: number

    images: Image[]
}

enum Direction {
    INIT = 'init',

    FORWARD = 'forward',

    BACKWARD = 'backward',
}

const Gallery: React.FC<GalleryProps> = (props) => {
    const [current, setCurrent] = useState<number>(props.current || 0)
    const [direction, setDirection] = useState<Direction>(Direction.INIT)

    const rawScroll = useRef<boolean>(false)
    const scrollX = useRef<number>(0)
    const scrollTimer = useRef<ReturnType<typeof setTimeout>>()

    const lockScroll = React.useCallback(() => {
        rawScroll.current = false
    }, [])

    const handleClick = (index) => {
        const { length } = props.images

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
    }

    const handleScroll = (e: WheelEvent) => {
        // 放大镜组件返回true 滚动中
        if (rawScroll.current) return

        e.preventDefault()

        // ！==0 滚动中 返回
        if (scrollX.current !== 0) return

        const wheel = normalizeWheel(e)
        // FIXME 坐标错了 需要用Y代替X
        scrollX.current += wheel.spinY

        if (scrollX.current < 0) handleClick(-1)
        if (scrollX.current > 0) handleClick(1)

        scrollTimer.current = setTimeout(() => {
            scrollX.current = 0
        }, 1000)
    }

    const renderImage = (image, pos) => {
        const windowHeight = docSize.height
        const windowWidth = docSize.width

        let onClick
        if (pos !== 'center') {
            onClick = handleClick.bind(null, pos === 'left' ? -1 : 1)
        }

        return (
            <div key={image.key} className={imageClass(pos, direction)} onClick={onClick}>
                <a onClick={props.onClose} className={imageClass('close')}>
                    {icons.Close}
                </a>
                <Magnify
                    maxWidth={windowWidth - 400}
                    maxHeight={windowHeight - 160}
                    position={pos}
                    src={image.src}
                    lockScroll={lockScroll}
                />
            </div>
        )
    }

    useEvent('wheel', handleScroll, document, { passive: false })

    useUpdateEffect(() => {
        setTimeout(() => {
            setDirection(Direction.INIT)
        }, 400)
    }, [current])

    const { images, onClose } = props
    const currentImage = images[current]

    const result = []
    // 注意 动画是怎么产生的 点击后 原本的center的image就会立即被调换 原来的center被换成left 这个时候才进行动画
    // 不要被假象蒙蔽
    result.push(<div key="overlay" className={imageClass('overlay')} onClick={onClose} />)
    result.push(renderImage(currentImage, 'center'))

    if (images[current - 1]) result.push(renderImage(images[current - 1], 'left'))
    if (images[current + 1]) result.push(renderImage(images[current + 1], 'right'))

    return result as unknown as JSX.Element
}

export default React.memo(Gallery)
