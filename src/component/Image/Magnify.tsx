import React, { useState, useEffect, useRef, useCallback } from 'react'
import { imageClass } from '@/styles'
import Spin from '../Spin'

/**
 * 放大镜
 * 通过改变status的值来显示是否放大
 * 正常情况status=0 img里面的宽高会受到max的限制 status=1时 img的max style被清除 显示一个完整的图形
 * 由于父级容器存在溢出隐藏 所有出现活动条 这时候mousemove的作用就来了 status为1时 计算父级容器div的scrollTop与scrollLeft
 */

export interface MagnifyProps {
    maxHeight: number

    maxWidth: number

    src: string

    position: string

    lockScroll(e: boolean): void
}

const Magnify: React.FC<MagnifyProps> = ({ maxHeight, maxWidth, src, position, lockScroll }) => {
    const [loading, setLoading] = useState<boolean>(true)
    // 1 放大 0 正常
    const [status, setStatus] = useState<0 | 1>(0)
    const [style, setStyle] = useState<{ maxHeight: number; maxWidth: number }>({
        maxHeight,
        maxWidth,
    })

    const elementRef = useRef<HTMLDivElement>()
    // 点击图片开启放大器模式时 记录点击点的位置 触发移动
    const resizeRef = useRef<{ clientX: number | undefined; clientY: number | undefined }>({
        clientX: undefined,
        clientY: undefined,
    })

    const handleResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (position !== 'center') return

        const newStatus = status === 1 ? 0 : 1
        const { clientX, clientY } = e

        setStatus(newStatus)
        setStyle(newStatus === 0 ? { maxHeight, maxWidth } : undefined)

        resizeRef.current = { clientX, clientY }

        lockScroll(newStatus === 1)
    }

    const move = useCallback((clientX, clientY) => {
        const rect = elementRef.current.getBoundingClientRect()
        const image = elementRef.current.querySelector('img')
        // 浏览器滚动条宽度
        const browserBarWidth = window.innerWidth - document.body.clientWidth
        const { width, height } = rect
        const x = (clientX - rect.left) / (width - browserBarWidth)
        const y = (clientY - rect.top) / (height - browserBarWidth)
        // 20为this.element的上下Padding总和
        elementRef.current.scrollTop = (image.offsetHeight - height + 20) * y
        elementRef.current.scrollLeft = (image.offsetWidth - width + 20) * x
    }, [])

    const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        move(e.clientX, e.clientY)
    }, [])

    const handleLoaded = useCallback(() => {
        setLoading(false)
    }, [])

    useEffect(() => {
        if (status === 1) {
            setLoading(true)
            setStatus(0)
            setStyle({ maxHeight, maxWidth })
            lockScroll(false)
        }
    }, [src])

    useEffect(() => {
        if (status === 0) return

        const { clientX, clientY } = resizeRef.current

        move(clientX, clientY)
    }, [status, style])

    const cursor = position === 'center' ? (status === 1 ? 'zoom-out' : 'zoom-in') : 'pointer'
    const newStyle: React.CSSProperties = { maxHeight, maxWidth, cursor }

    if (status === 1) {
        newStyle.overflow = 'scroll'
        newStyle.borderRightWidth = 0
        newStyle.borderBottomWidth = 0
    }

    const onMouseMove = status === 1 ? handleMove : undefined

    return (
        <div
            onClick={handleResize}
            onMouseMove={onMouseMove}
            ref={elementRef}
            style={newStyle}
            className={imageClass('magnify')}
        >
            <img onLoad={handleLoaded} src={src} alt="" style={style} />
            {loading && (
                <div className={imageClass('magnify-loading')}>
                    <Spin size={30} />
                </div>
            )}
        </div>
    )
}

export default Magnify
