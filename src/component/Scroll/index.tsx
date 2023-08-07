import React, { useEffect, useRef } from 'react'
import useMergedValue from '@/hooks/useMergedValue'
import { scrollClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { getRangeValue } from '@/utils/numbers'
import classnames from 'classnames'
import { useIsomorphicLayoutEffect, usePrevious } from 'react-use'
import { styles } from '@/utils/style/styles'
import useIsomorphicLayoutUpdateEffect from '@/hooks/useIsomorphicLayoutUpdateEffect'
import { ScrollProps } from './type'
import Bar from './Bar'

export const BAR_WIDTH = 16

const Scroll: React.FC<ScrollProps> = function (props) {
    const { scroll, children, onScroll, style, maxHeight, maxWidth, symbol, containerHeight, containerWidth } = props
    const touchPosition = useRef({ lastClientX: 0, lastClientY: 0 }).current
    const wheelElementRef = useRef<HTMLDivElement>()
    const scrollX = scroll === 'x' || scroll === 'both'
    const scrollY = scroll === 'y' || scroll === 'both'
    const className = classnames(scrollClass('_', scrollX && 'show-x', scrollY && 'show-y'), props.className)
    const viewRef = useRef<HTMLDivElement>()
    const innerRef = useRef<HTMLDivElement>()

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

    useIsomorphicLayoutEffect(() => {
        setScrollHeight(innerRef.current.scrollHeight)
        setScrollWidth(innerRef.current.scrollWidth)
    }, [])

    useIsomorphicLayoutEffect(() => {
        if (!scrollY && !scrollX) return

        const { scrollTop, scrollLeft } = getComputeScrollValue(scrollLeftRatio, scrollTopRatio)

        viewRef.current.scrollLeft = scrollLeft
        viewRef.current.scrollTop = scrollTop
    }, [scrollTopRatio, scrollLeftRatio])

    useIsomorphicLayoutUpdateEffect(() => {
        const { height, width } = getWheelRect()
        const nextContentHeight = innerRef.current.scrollHeight - height
        const nextContentWidth = innerRef.current.scrollWidth - width

        setScrollHeight(innerRef.current.scrollHeight)
        setScrollWidth(innerRef.current.scrollWidth)

        if (prevContentHeight !== nextContentHeight) {
            setScrollTopRatio(scrollTopRatio * (prevContentHeight / nextContentHeight))
        }

        if (prevContentWidth !== nextContentWidth) {
            setScrollLeftRatio(scrollLeftRatio * (prevContentWidth / nextContentWidth))
        }
    }, [symbol])

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

    const getWheelRect = useRefMethod(() => {
        if (!wheelElementRef.current) return { width: 0, height: 0 }

        let { width, height } = wheelElementRef.current.getBoundingClientRect()

        width = (containerWidth || width) - (scrollY ? BAR_WIDTH : 0)
        height = (containerHeight || height) - (scrollX ? BAR_WIDTH : 0)

        if (maxHeight) {
            height = getRangeValue({ min: 0, max: maxHeight, current: height })
        }

        if (maxWidth) {
            width = getRangeValue({ min: 0, max: maxWidth, current: width })
        }

        return { width, height }
    })

    const getComputeScrollValue = useRefMethod((leftRatio: number, topRatio: number) => {
        const { contentHeight, contentWidth } = getComputeContent()

        let scrollTop = topRatio * contentHeight
        if (scrollTop > contentHeight) scrollTop = contentHeight
        if (scrollTop < 0) scrollTop = 0

        let scrollLeft = leftRatio * contentWidth
        if (scrollLeft > contentWidth) scrollLeft = contentWidth
        if (scrollLeft < 0) scrollLeft = 0

        return { scrollTop, scrollLeft }
    })

    const getComputeContent = useRefMethod(() => {
        const { width, height } = getWheelRect()
        const contentHeight = scrollHeight - height
        const contentWidth = scrollWidth - width

        return { contentHeight, contentWidth }
    })

    const prevContentHeight = usePrevious(getComputeContent().contentHeight)
    const prevContentWidth = usePrevious(getComputeContent().contentWidth)

    const handleScroll = useRefMethod((leftRatio: number, topRatio: number, pixelX?: number, pixelY?: number) => {
        if (!onScroll) return

        const { contentHeight, contentWidth } = getComputeContent()
        const { scrollLeft, scrollTop } = getComputeScrollValue(leftRatio, topRatio)

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
        const { contentHeight, contentWidth } = getComputeContent()

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

    const { width, height } = getWheelRect()
    const showScrollYBar = scrollY && scrollHeight > height
    const showScrollXBar = scrollX && scrollWidth > width
    const ms = styles(
        style,
        containerHeight && { height: containerHeight },
        containerWidth && { width: containerWidth },
        /** X轴方向下,view层的宽度始终与wheel的宽度一致，所以可以使用maxWidth */
        /** Y轴放下下,如果wheel设置maxHeight，并不能限制view层与wheel一致的高度,如果存在滚动，需要将wheel的高度限制住,使view保持100% */
        maxHeight && scrollHeight > height && { height: maxHeight },
        maxWidth && { maxWidth }
    )

    return (
        <div style={ms} ref={wheelElementRef} className={className}>
            <div ref={viewRef} className={scrollClass('view')}>
                <div className={scrollClass('inner')} ref={innerRef}>
                    {children}
                </div>
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
