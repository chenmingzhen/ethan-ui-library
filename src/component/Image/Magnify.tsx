import React, { useState, useEffect, useRef } from 'react'
import { imageClass } from '@/styles'
import { styles } from '@/utils/style/styles'
import { docSize } from '@/utils/dom/document'
import useRefMethod from '@/hooks/useRefMethod'
import Spin from '../Spin'
import { MagnifyProps } from './type'

/**
 * 放大镜
 * 通过改变status的值来显示是否放大
 * 正常情况status=0 img里面的宽高会受到max的限制 status=1时 img的max style被清除 显示一个完整的图形
 * 由于父级容器存在溢出隐藏 所有出现活动条 这时候mousemove的作用就来了 status为1时 计算父级容器div的scrollTop与scrollLeft
 */
const Magnify: React.FC<MagnifyProps> = (props) => {
    const { src, position } = props
    const [loading, setLoading] = useState<boolean>(true)
    // 1 放大 0 正常
    const [status, setStatus] = useState<0 | 1>(0)
    const elementRef = useRef<HTMLDivElement>()

    const handleResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (position !== 'center') return

        const newStatus = status === 1 ? 0 : 1
        const { clientX, clientY } = e

        setStatus(newStatus)

        move(clientX, clientY)
    }

    const move = useRefMethod((clientX, clientY) => {
        const rect = elementRef.current.getBoundingClientRect()
        const image = elementRef.current.querySelector('img')
        const { width, height } = rect
        const x = (clientX - rect.left) / width
        const y = (clientY - rect.top) / height

        elementRef.current.scrollTop = (image.offsetHeight - height) * y
        elementRef.current.scrollLeft = (image.offsetWidth - width) * x
    })

    const handleMove = useRefMethod((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        move(e.clientX, e.clientY)
    })

    const handleLoaded = useRefMethod(() => {
        setLoading(false)
    })

    function handleWheel(evt: React.WheelEvent<HTMLDivElement>) {
        if (status === 1) {
            evt.stopPropagation()
        }
    }

    useEffect(() => {
        if (status === 1) {
            setLoading(true)
            setStatus(0)
        }
    }, [src])

    const cursor = position === 'center' ? (status === 1 ? 'zoom-out' : 'zoom-in') : 'pointer'
    const maxWidth = docSize.width - 400
    const maxHeight = docSize.height - 160
    const ms: React.CSSProperties = styles({ maxHeight, maxWidth, cursor })

    if (status === 1) {
        ms.overflow = 'auto'
    }

    return (
        <div
            style={ms}
            ref={elementRef}
            onWheel={handleWheel}
            onClick={handleResize}
            className={imageClass('magnify')}
            onMouseMove={status === 1 ? handleMove : undefined}
        >
            <img onLoad={handleLoaded} src={src} alt="" style={status === 0 ? { maxHeight, maxWidth } : undefined} />
            {loading && (
                <div className={imageClass('magnify-loading')}>
                    <Spin size={30} />
                </div>
            )}
        </div>
    )
}

export default Magnify
