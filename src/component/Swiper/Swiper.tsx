import React, { useRef, useEffect, useMemo, cloneElement } from 'react'
import classnames from 'classnames'
import { usePrevious, useUpdateEffect } from 'react-use'
import { swiperClass } from '@/styles'
import { setStyle } from '@/utils/dom/style'
import useSafeState from '@/hooks/useSafeState'
import { SwiperInstance, SwiperProps } from './type'
import icons from '../icons'

const { AngleLeft, AngleRight } = icons

export const defaultRenderPrevArrow: SwiperProps['renderPrevArrow'] = onPrev => {
    return (
        <div className={swiperClass('left')} onClick={onPrev}>
            {AngleLeft}
        </div>
    )
}

export const defaultRenderNextArrow: SwiperProps['renderNextArrow'] = onNext => {
    return (
        <div className={swiperClass('right')} onClick={onNext}>
            {AngleRight}
        </div>
    )
}

/** INIT=>TRANSLATE=>NEXT=>STATE=>EFFECT=>TRANSLATE */

const Swiper: React.ForwardRefRenderFunction<SwiperInstance, SwiperProps> = (props, ref) => {
    const [currentIndex, setIndex] = useSafeState(1)

    const prevIndex = usePrevious(currentIndex)

    const swiperRef = useRef<HTMLDivElement>()

    const swiperContainerRef = useRef<HTMLDivElement>()

    const isMouseIn = useRef(false)

    const isTransition = useRef(false)

    const timer = useRef<NodeJS.Timeout>()

    React.useImperativeHandle(ref, () => ({ onNext: next, onPrev: prev, scrollTo }))

    const {
        autoplay,
        children,
        transitionDuration,
        onChange,
        autoplayInterval,
        className,
        arrows,
        renderNextArrow,
        renderPrevArrow,
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
        translate(prevIndex === childrenCount)
    }, [currentIndex])

    function translate(noDuration?: boolean) {
        const swiperWidth = swiperRef.current?.getBoundingClientRect().width

        const translateX = swiperWidth * -currentIndex

        const realDuration = noDuration ? 0 : transitionDuration

        if (autoplay && !isMouseIn.current && timer.current) {
            clearTimeout(timer.current)

            timer.current = setTimeout(next, Number(autoplayInterval))
        }

        setStyle(swiperContainerRef.current, {
            transform: `translateX(${translateX}px) `,
            transition: `all ${realDuration}ms ease-in-out`,
        })

        if (currentIndex === childrenCount) {
            resetPosition()

            return
        }

        setTimeout(() => {
            isTransition.current = false
        }, realDuration)

        onChange?.(currentIndex)
    }

    function prev() {
        if (childrenCount === 1) return

        scrollTo(currentIndex - 1)
    }

    function next() {
        if (childrenCount === 1) return

        scrollTo(currentIndex + 1)
    }

    function scrollTo(index) {
        if (index === currentIndex || isTransition.current) return

        isTransition.current = true

        setIndex(index)
    }

    function resetPosition() {
        if (currentIndex < 0) {
            setTimeout(() => setIndex(childrenCount - 1), transitionDuration)
        } else {
            setTimeout(() => setIndex(0), transitionDuration)
        }
    }

    function handleMouseEnter() {
        isMouseIn.current = true

        autoplay && clearAutoplay()
    }

    function handleMouseLeave() {
        isMouseIn.current = false

        autoplay && startAutoplay()
    }

    function clearAutoplay() {
        if (timer.current) {
            clearTimeout(timer.current)
        }
    }

    function startAutoplay() {
        timer.current = setTimeout(next, autoplayInterval)
    }

    return (
        <div
            className={classnames(className, swiperClass('_'))}
            ref={swiperRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {arrows && childrenCount > 1 && renderPrevArrow(prev)}
            {arrows && childrenCount > 1 && renderNextArrow(next)}

            <div ref={swiperContainerRef} className={swiperClass('container')}>
                {React.Children.map(clonedChildren, (child: React.ReactElement, index: number) => {
                    const { style: rawStyle, ...rest } = child.props

                    const style = Object.assign({}, rawStyle ?? {}, { float: 'left', height: '100%' })

                    const key = child.key ?? index - 1

                    return cloneElement(child, {
                        key,
                        style,
                        ...rest,
                    })
                })}
            </div>
        </div>
    )
}

const ComputedSwiper = React.forwardRef(Swiper)

ComputedSwiper.defaultProps = {
    transitionDuration: 600,
    autoplay: true,
    autoplayInterval: 2000,
    dots: true,
    arrows: true,
    renderPrevArrow: defaultRenderPrevArrow,
    renderNextArrow: defaultRenderNextArrow,
}

export default React.memo(ComputedSwiper)
