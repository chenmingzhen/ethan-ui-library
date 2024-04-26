import React, { Children, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { carouselClass } from '@/styles'
import useSafeState from '@/hooks/useSafeState'
import useRefMethod from '@/hooks/useRefMethod'
import { unstable_batchedUpdates } from 'react-dom'
import Item from './Item'
import Indicator from './Indicator'
import { CarouselProps } from './type'

enum Direction {
    STOP = 'stop',
    FORWARD = 'forward',
    BACKWARD = 'backward',
}

const Carousel: React.FC<CarouselProps> = function (props) {
    const {
        animation = 'slide',
        children,
        indicatorPosition = 'center',
        indicatorType = 'circle',
        interval = 0,
        mouseEffect = false,
        style,
        className,
    } = props

    const [mouseInView, updateMouseInView] = useSafeState(false)
    const [direction, updateDirection] = useSafeState(Direction.STOP)
    const [current, updateCurrent] = useSafeState(0)
    const [previous, updatePrevious] = useSafeState(0)
    const jumperTimer = useRef<NodeJS.Timeout>(null)

    useEffect(() => {
        prepareMoveJob(1)

        return () => {
            if (jumperTimer.current) {
                clearTimeout(jumperTimer.current)
            }
        }
    }, [])

    const handleMouseIn = useRefMethod(() => {
        updateMouseInView(true)

        if (jumperTimer.current) {
            clearTimeout(jumperTimer.current)

            jumperTimer.current = null
        }
    })

    const handleMouseOut = useRefMethod(() => {
        updateMouseInView(false)
    })

    const prepareMoveJob = useRefMethod((target: number) => {
        if (mouseInView) return

        if (interval > 0 && count > 1) {
            if (jumperTimer.current) clearTimeout(jumperTimer.current)

            jumperTimer.current = setTimeout(() => {
                moveTo(target)
            }, interval)
        }
    })

    const moveTo = useRefMethod((target: number) => {
        if (target === current) return

        let nextDirection: Direction = target > current ? Direction.FORWARD : Direction.BACKWARD

        if (target > count) {
            nextDirection = Direction.FORWARD
            target = 0
        }

        unstable_batchedUpdates(() => {
            updatePrevious(current)
            updateCurrent(target)
            updateDirection(nextDirection)
        })

        prepareMoveJob(target + 1)
    })

    const count = Children.toArray(children).length

    return (
        <div className={classnames(carouselClass('_', animation, direction), className)} style={style}>
            {Children.toArray(children).map((child: React.ReactElement, i) => (
                <Item key={i} isCurrent={i === current} isPrevious={i === previous && previous !== current}>
                    {React.cloneElement(
                        child,
                        mouseEffect
                            ? {
                                  onMouseEnter: handleMouseIn,
                                  onMouseLeave: handleMouseOut,
                              }
                            : {}
                    )}
                </Item>
            ))}

            <Indicator
                count={count}
                moveTo={moveTo}
                current={current}
                indicatorPosition={indicatorPosition}
                indicatorType={indicatorType}
                mouseInView={mouseInView}
            />
        </div>
    )
}

export default React.memo(Carousel)
