import React, { useRef, useEffect, useMemo, cloneElement } from 'react'
import classnames from 'classnames'
import { usePrevious, useUpdateEffect } from 'react-use'
import { swiperClass } from '@/styles'
import { setStyle } from '@/utils/dom/style'
import useSafeState from '@/hooks/useSafeState'
import { SwiperInstance, SwiperProps } from './type'
import icons from '../icons'
import SwiperDots from './SwiperDots'

enum MouseIn {
    OUTSIDE,
    INNER,
    LEFTARROW,
    RIGHTARROW,
}

const { AngleLeft, AngleRight } = icons

/** INIT=>TRANSLATE=>NEXT=>STATE=>EFFECT=>TRANSLATE */

const Swiper: React.ForwardRefRenderFunction<SwiperInstance, SwiperProps> = (props, ref) => {
    const [currentIndex, setIndex] = useSafeState(1)

    const [mouseIn, setMouseIn] = useSafeState<MouseIn>(MouseIn.OUTSIDE)

    const prevIndex = usePrevious(currentIndex)

    const swiperRef = useRef<HTMLDivElement>()

    const swiperContainerRef = useRef<HTMLDivElement>()

    const isTransition = useRef(false)

    const timer = useRef<NodeJS.Timeout>()

    React.useImperativeHandle(ref, () => ({ onNext: next, onPrev: prev }))

    const {
        autoplay,
        children,
        dots,
        transitionDuration,
        onChange,
        autoplayInterval,
        className,
        arrows,
        renderArrow,
        style,
    } = props

    const childrenCount = useMemo(() => React.Children.count(children), [children])

    const clonedChildren = useMemo(() => {
        if (childrenCount <= 1) return children

        const clone = new Array(childrenCount + 2)

        React.Children.forEach(children, (child, index) => {
            if (index === 0) {
                clone[childrenCount + 1] = child
            }

            if (index === childrenCount - 1) {
                clone[0] = child
            }

            clone[index + 1] = child
        })

        return clone
    }, [children])

    useEffect(() => {
        const innerElements = swiperContainerRef.current.children

        const swiperWidth = swiperRef.current?.getBoundingClientRect().width

        clearAutoplay()

        setStyle(swiperContainerRef.current, {
            width: `${swiperWidth * innerElements.length}px`,
        })

        for (const item of innerElements) {
            setStyle(item as HTMLElement, {
                width: `${100 / innerElements.length}%`,
            })
        }

        if (childrenCount > 1) {
            autoplay && startAutoplay()

            // 重置到指定位置
            translate(true)
        }
    }, [])

    useUpdateEffect(() => {
        translate(prevIndex === childrenCount + 1 || prevIndex === 0)
    }, [currentIndex])

    function translate(noDuration?: boolean) {
        const swiperWidth = swiperRef.current?.getBoundingClientRect().width

        const translateX = swiperWidth * -currentIndex

        const realDuration = noDuration ? 0 : transitionDuration

        if (autoplay && mouseIn === MouseIn.OUTSIDE && timer.current) {
            clearTimeout(timer.current)

            timer.current = setTimeout(next, Number(autoplayInterval))
        }

        setStyle(swiperContainerRef.current, {
            transform: `translateX(${translateX}px) `,
            transition: `all ${realDuration}ms ease-in-out`,
        })

        if (currentIndex === childrenCount + 1 || currentIndex === 0) {
            resetPosition()

            return
        }

        setTimeout(() => {
            isTransition.current = false
        }, realDuration)

        const realIndex = getRealIndex()

        onChange?.(realIndex)
    }

    function prev(e: React.MouseEvent) {
        e?.stopPropagation()

        if (childrenCount === 1) return

        scrollTo(currentIndex - 1)
    }

    function next(e: React.MouseEvent) {
        e?.stopPropagation()

        if (childrenCount === 1) return

        scrollTo(currentIndex + 1)
    }

    function scrollTo(index) {
        if (index === currentIndex || isTransition.current) return

        isTransition.current = true

        setIndex(index)
    }

    function resetPosition() {
        if (currentIndex === 0) {
            setTimeout(() => setIndex(childrenCount), transitionDuration)
        } else {
            setTimeout(() => setIndex(1), transitionDuration)
        }
    }

    function handleMouseEnter() {
        setMouseIn(MouseIn.INNER)

        autoplay && clearAutoplay()
    }

    function handleMouseLeave() {
        setMouseIn(MouseIn.OUTSIDE)

        autoplay && startAutoplay()
    }

    function handleMouseEnterLeftArrow() {
        setMouseIn(MouseIn.LEFTARROW)
    }

    function handleMouseEnterRightArrow() {
        setMouseIn(MouseIn.RIGHTARROW)
    }

    function handleMouseLeaveArrow() {
        setMouseIn(MouseIn.INNER)
    }

    function clearAutoplay() {
        if (timer.current) {
            clearTimeout(timer.current)
        }
    }

    function startAutoplay() {
        timer.current = setTimeout(next, autoplayInterval)
    }

    function getRealIndex() {
        if (currentIndex === 0) return childrenCount - 1

        if (currentIndex === childrenCount + 1) return 0

        return currentIndex - 1
    }

    function buildArrow() {
        if (!arrows && childrenCount <= 1) return

        if (renderArrow) return renderArrow?.(prev, next)

        const leftOpacity =
            mouseIn === MouseIn.INNER || mouseIn === MouseIn.RIGHTARROW ? 0.2 : mouseIn === MouseIn.LEFTARROW ? 0.4 : 0
        const rightOpacity =
            mouseIn === MouseIn.INNER || mouseIn === MouseIn.LEFTARROW ? 0.2 : mouseIn === MouseIn.RIGHTARROW ? 0.4 : 0

        return (
            <>
                <div
                    className={swiperClass('left')}
                    onClick={prev}
                    onMouseEnter={handleMouseEnterLeftArrow}
                    onMouseLeave={handleMouseLeaveArrow}
                    style={{ opacity: leftOpacity }}
                >
                    {AngleLeft}
                </div>
                <div
                    className={swiperClass('right')}
                    onClick={next}
                    onMouseEnter={handleMouseEnterRightArrow}
                    onMouseLeave={handleMouseLeaveArrow}
                    style={{ opacity: rightOpacity }}
                >
                    {AngleRight}
                </div>
            </>
        )
    }

    return (
        <div
            className={classnames(className, swiperClass('_'))}
            ref={swiperRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={style}
        >
            {buildArrow()}

            <div ref={swiperContainerRef} className={swiperClass('container')}>
                {React.Children.map(clonedChildren, (child: React.ReactElement, index: number) => {
                    const { style: rawStyle, ...rest } = child.props

                    const childStyle = Object.assign({}, rawStyle ?? {}, { float: 'left', height: '100%' })

                    const key = child.key ?? index - 1

                    return cloneElement(child, {
                        key,
                        style: childStyle,
                        ...rest,
                    })
                })}
            </div>

            {dots && childrenCount > 1 && (
                <SwiperDots items={children} realIndex={getRealIndex()} onDotsClick={setIndex} />
            )}
        </div>
    )
}

const ComputedSwiper = React.forwardRef(Swiper)

ComputedSwiper.defaultProps = {
    transitionDuration: 450,
    autoplay: true,
    autoplayInterval: 2000,
    dots: true,
    arrows: true,
}

export default React.memo(ComputedSwiper)
