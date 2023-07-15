import React, { useEffect, useRef } from 'react'
import useMergedValue from '@/hooks/useMergedValue'
import { scrollClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { getRangeValue } from '@/utils/numbers'
import classnames from 'classnames'
import useResizeObserver from '@/hooks/useResizeObserver'
import useUpdate from '@/hooks/useUpdate'
import { setTranslate } from '@/utils/dom/translate'
import { useIsomorphicLayoutEffect } from 'react-use'
import { ScrollProps } from './type'
import Bar from './Bar'

export const BAR_WIDTH = 16

const Scroll: React.FC<ScrollProps> = function (props) {
    const { scroll, children, onScroll, containerHeight, containerWidth } = props
    const [scrollHeight, setScrollHeight] = useMergedValue({
        defaultStateValue: 0,
        options: {
            value: props.scrollHeight,
        },
    })
    const [scrollWidth, setScrollWidth] = useMergedValue({
        defaultStateValue: 0,
        options: {
            value: props.scrollWidth,
        },
    })
    const [scrollLeftRatio, setScrollLeftRatio] = useMergedValue<number, [number?]>({
        defaultStateValue: 0,
        options: {
            value: props.scrollLeftRatio,
            onChange(nextXScrollRatio, _, pixelX) {
                handleScroll(nextXScrollRatio, scrollTopRatio, pixelX, 0)
                /** 兼容ssr的情况useIsomorphicLayoutEffect是useEffect的效果（拖动会闪烁） */
                const { scrollTop, scrollLeft } = computedScrollValue(nextXScrollRatio, scrollTopRatio)
                setTranslate(wrapChildrenRef.current, `-${scrollLeft}px`, `-${scrollTop}px`)
            },
        },
    })
    const [scrollTopRatio, setScrollTopRatio] = useMergedValue<number, [number?]>({
        defaultStateValue: 0,
        options: {
            value: props.scrollTopRatio,
            onChange(nextYScrollRatio, _, pixelY) {
                handleScroll(scrollLeftRatio, nextYScrollRatio, 0, pixelY)
                /** 兼容ssr的情况useIsomorphicLayoutEffect是useEffect的效果（拖动会闪烁） */
                const { scrollTop, scrollLeft } = computedScrollValue(scrollLeftRatio, nextYScrollRatio)
                setTranslate(wrapChildrenRef.current, `-${scrollLeft}px`, `-${scrollTop}px`)
            },
        },
    })

    useEffect(() => {
        const { height, width } = wrapChildrenRef.current.getBoundingClientRect()

        setScrollHeight(height)
        setScrollWidth(width)
    }, [])

    const update = useUpdate()
    const touchPosition = useRef({ lastClientX: 0, lastClientY: 0 }).current
    const wheelElementRef = useRef<HTMLDivElement>()
    const scrollX = scroll === 'x' || scroll === 'both'
    const scrollY = scroll === 'y' || scroll === 'both'

    const getWheelRect = useRefMethod(() => {
        if (!wheelElementRef.current) return { width: 0, height: 0 }

        let { width, height } = wheelElementRef.current.getBoundingClientRect()

        width = (containerWidth || width) - (scrollY ? BAR_WIDTH : 0)
        height = (containerHeight || height) - (scrollX ? BAR_WIDTH : 0)

        return { width, height }
    })

    const computedScrollValue = useRefMethod((leftRatio: number, topRatio: number) => {
        const { width, height } = getWheelRect()
        const contentHeight = scrollHeight - height
        const contentWidth = scrollWidth - width

        let scrollTop = topRatio * contentHeight
        if (scrollTop > contentHeight) scrollTop = contentHeight
        if (scrollTop < 0) scrollTop = 0

        let scrollLeft = leftRatio * contentWidth
        if (scrollLeft > contentWidth) scrollLeft = contentWidth
        if (scrollLeft < 0) scrollLeft = 0

        return { scrollTop, scrollLeft }
    })

    const handleScroll = useRefMethod((leftRatio: number, topRatio: number, pixelX?: number, pixelY?: number) => {
        if (!onScroll) return
        const { width, height } = getWheelRect()

        const contentHeight = scrollHeight - height
        const contentWidth = scrollWidth - width

        const { scrollLeft, scrollTop } = computedScrollValue(leftRatio, topRatio)

        onScroll({
            contentHeight,
            contentWidth,
            scrollLeftRatio: leftRatio,
            scrollTopRatio: topRatio,
            wheelWidth: width,
            wheelHeight: height,
            pixelX,
            pixelY,
            scrollLeft,
            scrollTop,
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
        const { width, height } = getWheelRect()

        const contentHeight = scrollHeight - height
        const contentWidth = scrollWidth - width

        /** 只能一个方向滚动 一个方向滚动 另外一个方向设置为0 */
        if (Math.abs(pixelX) > Math.abs(pixelY)) {
            pixelY = 0
        } else {
            pixelX = 0
        }

        const leftRatio = getRangeValue({
            current: scrollWidth === 0 || contentWidth === 0 ? 0 : scrollLeftRatio + pixelX / contentWidth,
            min: 0,
            max: 1,
        })

        const topRatio = getRangeValue({
            current: scrollHeight === 0 || contentHeight === 0 ? 0 : scrollTopRatio + pixelY / contentHeight,
            min: 0,
            max: 1,
        })

        return {
            leftRatio,
            topRatio,
        }
    })

    const handleWheel = useRefMethod((evt: WheelEvent) => {
        const { width, height } = getWheelRect()

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
            if (!wheelElementRef.current) return

            wheelElementRef.current.removeEventListener('wheel', handleWheel)
            wheelElementRef.current.removeEventListener('touchstart', handleTouchStart)
            wheelElementRef.current.removeEventListener('touchmove', handleTouchMove)
        }
    }, [])

    useResizeObserver({
        watch: true,
        options: {
            direction: 'xy',
        },
        getTargetElement() {
            return wheelElementRef.current
        },
        onResize() {
            handleScroll(scrollLeftRatio, scrollTopRatio)
            update()
        },
    })

    const className = classnames(scrollClass('_', scrollX && 'show-x', scrollY && 'show-y'), props.className)
    const wrapChildrenRef = useRef<HTMLDivElement>()
    const { width, height } = getWheelRect()

    /** 非SSR的，通常在副作用的设置Translate即可,为了兼容SSR的情况，在设置Ratio中就设置Translate，这里主要处理Prop的Ratio不一致时重置到Prop的Ratio */
    useIsomorphicLayoutEffect(() => {
        if (!scrollY && !scrollX) return

        const { scrollTop, scrollLeft } = computedScrollValue(scrollLeftRatio, scrollTopRatio)
        setTranslate(wrapChildrenRef.current, `-${scrollLeft}px`, `-${scrollTop}px`)
    }, [scrollTopRatio, scrollLeftRatio])

    const style: React.CSSProperties = { height: containerHeight, width: containerWidth }

    const showScrollYBar = scrollY && scrollHeight > height
    const showScrollXBar = scrollX && scrollWidth > width

    return (
        <div style={style} ref={wheelElementRef} className={className}>
            <div className={scrollClass('inner')}>
                <div ref={wrapChildrenRef}>{children}</div>
            </div>
            {showScrollYBar && (
                <Bar
                    direction="y"
                    length={height}
                    scrollLength={scrollHeight}
                    scrollRatio={scrollTopRatio}
                    onScroll={setScrollTopRatio}
                />
            )}
            {showScrollXBar && (
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
