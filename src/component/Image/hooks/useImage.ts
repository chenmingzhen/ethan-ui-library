import { useRef, useState, useEffect } from 'react'
import { addStack, removeStack } from '@/utils/lazyload'
import { PLACEHOLDER, SRC, ALT, ERROR, StatusType } from '../variable'

const useImage = (
    lazy: number | boolean | null,
    src: string | null,
    alt: string | null,
    container: string | null,
    elId: string
) => {
    const [status, setStatus] = useState<StatusType>(PLACEHOLDER)
    const image = useRef<HTMLImageElement>()
    const lazyId = useRef<string>()

    useEffect(() => {
        fetchImage()
    }, [src, alt])

    useEffect(() => {
        return () => {
            removeStack(lazyId.current)
        }
    }, [])

    const fetchImage = () => {
        if (lazyId.current) removeStack(lazyId.current)

        if (!lazy) {
            markToRender()
        } else {
            lazyId.current = addStack({
                offset: typeof lazy === 'number' ? lazy : 0,
                element: document.getElementById(elId),
                render: markToRender,
                container: typeof container === 'string' ? document.querySelector(container) : container,
            })
        }
    }

    const markToRender = () => {
        if (!src) {
            handleAlt()
        }

        const rawImage = new window.Image()

        // onload加载完成后执行
        rawImage.onload = () => setStatus(SRC)
        rawImage.onerror = handleAlt
        // 设置src开始加载
        rawImage.src = src
        image.current = rawImage
    }

    const handleAlt = () => {
        if (!alt) {
            setStatus(ERROR)
            return
        }

        // 浏览器会对这个地址的图片进行缓存
        // src不能找到时 渲染alt地址的图片
        const rawImage = new window.Image()
        rawImage.onload = () => setStatus(ALT)
        rawImage.onerror = () => setStatus(ERROR)
        // 加载
        rawImage.src = alt
    }

    return { status }
}

export default useImage
