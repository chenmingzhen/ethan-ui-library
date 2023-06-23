import React, { useEffect, useRef } from 'react'
import useMergedValue from '@/hooks/useMergedValue'
import { scrollClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { getRangeValue } from '@/utils/numbers'
import { ScrollProps } from './type'
import Bar from './Bar'

export const BAR_WIDTH = 16

const Scroll: React.FC<ScrollProps> = function (props) {
    const { scroll, style, className, children, scrollHeight = 0, scrollWidth = 0, onScroll } = props
    const [scrollLeftRatio, setScrollLeftRatio] = useMergedValue<number, [number?]>({
        defaultStateValue: 0,
        options: {
            value: props.scrollLeftRatio,
            onChange(nextXScrollRatio, _, pixelX) {
                handleScroll(nextXScrollRatio, scrollTopRatio, pixelX, 0)
            },
        },
    })
    const [scrollTopRatio, setScrollTopRatio] = useMergedValue<number, [number?]>({
        defaultStateValue: 0,
        options: {
            value: props.scrollTopRatio,
            onChange(nextYScrollRatio, _, pixelY) {
                handleScroll(scrollLeftRatio, nextYScrollRatio, 0, pixelY)
            },
        },
    })
    const touchPosition = useRef({ lastClientX: 0, lastClientY: 0 }).current
    const wheelElementRef = useRef<HTMLDivElement>()
    const scrollX = scroll === 'x' || scroll === 'both'
    const scrollY = scroll === 'y' || scroll === 'both'

    const getWheelRect = useRefMethod(() => {
        if (!wheelElementRef.current) return { width: 0, height: 0 }

        let { width, height } = wheelElementRef.current.getBoundingClientRect()

        width = ((style.width as number) || width) - (scrollY ? BAR_WIDTH : 0)
        height = ((style.height as number) || height) - (scrollX ? BAR_WIDTH : 0)

        return { width, height }
    })

    const { width, height } = getWheelRect()

    const handleScroll = useRefMethod((leftRadio: number, topRadio: number, pixelX?: number, pixelY?: number) => {
        const contentHeight = scrollHeight - height
        const contentWidth = scrollWidth - width

        onScroll({
            contentHeight,
            contentWidth,
            scrollLeftRatio: leftRadio,
            scrollTopRatio: topRadio,
            wheelWidth: width,
            wheelHeight: height,
            pixelX,
            pixelY,
        })
    })

    const handleTouchStart = useRefMethod((evt: TouchEvent) => {
        const { clientX, clientY } = evt.changedTouches[0]

        touchPosition.lastClientX = clientX
        touchPosition.lastClientY = clientY
    })

    const handleTouchMove = useRefMethod((evt: TouchEvent) => {
        evt.preventDefault()

        const { clientX, clientY } = evt.changedTouches[0]
        const moveX = clientX - touchPosition.lastClientX
        const moveY = clientY - touchPosition.lastClientY

        let pixelX = 0
        let pixelY = 0

        if (scrollX) pixelX = -moveX
        if (scrollY) pixelY = -moveY

        touchPosition.lastClientX = clientX
        touchPosition.lastClientY = clientY

        const { leftRatio, topRatio } = computedPixel(pixelX, pixelY)

        if (leftRatio !== scrollLeftRatio) {
            setScrollLeftRatio(leftRatio, pixelX)
        } else if (topRatio !== scrollTopRatio) {
            setScrollTopRatio(topRatio, pixelY)
        }
    })

    const computedPixel = useRefMethod((pixelX: number, pixelY: number) => {
        const contentHeight = scrollHeight - height
        const contentWidth = scrollWidth - width

        /** 只能一个方向滚动 一个方向滚动 另外一个方向设置为0 */
        if (Math.abs(pixelX) > Math.abs(pixelY)) {
            pixelY = 0
        } else {
            pixelX = 0
        }

        const leftRatio = getRangeValue({
            current: scrollWidth === 0 ? 0 : scrollLeftRatio + pixelX / contentWidth,
            min: 0,
            max: 1,
        })

        const topRatio = getRangeValue({
            current: scrollHeight === 0 ? 0 : scrollTopRatio + pixelY / contentHeight,
            min: 0,
            max: 1,
        })

        return {
            leftRatio,
            topRatio,
        }
    })

    const handleWheel = useRefMethod((evt: WheelEvent) => {
        const wheelY = Math.ceil(scrollHeight) > Math.ceil(height)
        const wheelX = Math.ceil(scrollWidth) > Math.ceil(width)

        if (!wheelY && !wheelX) return

        evt.preventDefault()

        const wheel = normalizeWheel(evt)
        const { leftRatio, topRatio } = computedPixel(wheel.pixelX, wheel.pixelY)

        if (leftRatio !== scrollLeftRatio) {
            setScrollLeftRatio(leftRatio, wheel.pixelX)
        } else if (topRatio !== scrollTopRatio) {
            setScrollTopRatio(topRatio, wheel.pixelY)
        }
    })

    useEffect(() => {
        /**
         * passive: 布尔值，为true时，表示listener永远不会调用preventDefault()阻止默认行为的方法。
         * 根据规范，默认值为false，但是Chrome, Firefox等浏览器为了保证滚动时的性能，在文档节点(Window, Document,Document,body)上针对touchstart和touchmove事件将passive默认值改为了true保证了在页面滚时不会因为自定义事件中调用了preventDefault而阻塞页面渲染。
         */

        wheelElementRef.current.addEventListener('wheel', handleWheel, { passive: false })
        wheelElementRef.current.addEventListener('touchstart', handleTouchStart, { passive: false })
        wheelElementRef.current.addEventListener('touchmove', handleTouchMove, { passive: false })

        return () => {
            wheelElementRef.current.removeEventListener('wheel', handleWheel)
            wheelElementRef.current.removeEventListener('touchstart', handleTouchStart)
            wheelElementRef.current.removeEventListener('touchmove', handleTouchMove)
        }
    }, [])

    return (
        <div style={style} ref={wheelElementRef} className={className}>
            <div className={scrollClass('inner')}>{children}</div>
            {scrollY && (
                <Bar
                    direction="y"
                    length={height}
                    scrollLength={scrollHeight}
                    scrollRatio={scrollTopRatio}
                    onScroll={setScrollTopRatio}
                />
            )}
            {scrollX && (
                <Bar
                    direction="x"
                    length={width}
                    scrollLength={scrollWidth}
                    scrollRatio={scrollLeftRatio}
                    onScroll={setScrollLeftRatio}
                />
            )}
        </div>
    )
}

export default React.memo(Scroll)
