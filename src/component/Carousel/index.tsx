import React, { Children } from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { carouselClass } from '@/styles'
import Item from './Item'
import Indicator from './Indicator'
import { CarouselProps } from './type'

type Direction = 'stop' | 'forward' | 'backward'

interface CarouselState {
    current: number
    direction: Direction
    pre: number
}

class Carousel extends PureComponent<CarouselProps, CarouselState> {
    static defaultProps: CarouselProps = {
        animation: 'slide',
        indicatorPosition: 'center',
        indicatorType: 'circle',
        interval: 0,
        mouseEffect: false,
        size: 'small',
    }

    mouseInView = false

    timer: NodeJS.Timeout

    get count() {
        return Children.toArray(this.props.children).length
    }

    constructor(props) {
        super(props)

        this.state = {
            current: 0,
            direction: 'stop',
            pre: 0,
        }
    }

    componentDidMount = () => {
        this.setNext(1)
    }

    setNext = (next) => {
        if (this.mouseInView) {
            return
        }

        const { interval } = this.props

        if (interval > 0 && this.count > 1) {
            if (this.timer) clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                this.moveTo(next)
            }, interval)
        }
    }

    moveTo = (next) => {
        const { current } = this.state

        if (next === current) return

        let direction: Direction = next > current ? 'forward' : 'backward'

        if (next >= this.count) {
            direction = 'forward'
            next = 0
        }

        this.setState({ pre: current, current: next, direction })

        this.setNext(next + 1)
    }

    handleMouseIn = () => {
        this.mouseInView = true

        if (this.timer) {
            clearTimeout(this.timer)

            this.timer = null
        }
    }

    handleMouseOut = () => {
        this.mouseInView = false

        this.setNext(this.state.current + 1)
    }

    render = () => {
        const { animation, style, indicatorPosition, indicatorType } = this.props
        const { direction, current, pre } = this.state
        const className = classnames(carouselClass('_', animation, direction), this.props.className)

        return (
            <div className={className} style={style}>
                {Children.toArray(this.props.children).map((child: React.ReactElement, i) => (
                    <Item key={i} isCurrent={i === current} isPrev={i === pre && pre !== current}>
                        {React.cloneElement(
                            child,
                            this.props.mouseEffect
                                ? {
                                      onMouseEnter: this.handleMouseIn,
                                      onMouseLeave: this.handleMouseOut,
                                  }
                                : {}
                        )}
                    </Item>
                ))}

                <Indicator
                    count={this.count}
                    moveTo={this.moveTo}
                    current={current}
                    indicatorPosition={indicatorPosition}
                    indicatorType={indicatorType}
                    mouseInView={this.mouseInView}
                />
            </div>
        )
    }
}

export default Carousel
