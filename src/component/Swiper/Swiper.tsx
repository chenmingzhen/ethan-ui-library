import { PureComponent } from '@/utils/component'
import { setStyle } from '@/utils/dom/style'
import React, { cloneElement } from 'react'
import classnames from 'classnames'
import { swiperClass } from '@/styles'
import { SwiperProps, SwiperState } from './type'
import { defaultRenderNextArrow, defaultRenderPrevArrow } from './util/defaultRender'

class Swiper extends PureComponent<SwiperProps, SwiperState> {
    static defaultProps = {
        transitionDuration: 300,
        autoplay: false,
        autoplayInterval: 3000,
        dots: true,
        dotsColor: 'black',
        dotsSize: 'normal',
        arrows: false,
        arrowsType: 'dark',
        renderPrevArrow: defaultRenderPrevArrow,
        renderNextArrow: defaultRenderNextArrow,
    }

    swiperRef = React.createRef<HTMLDivElement>()

    swiperContainerRef = React.createRef<HTMLDivElement>()

    isTransition: boolean

    isMouseIn: boolean

    timer: NodeJS.Timeout

    get clonedChildren() {
        const { children } = this.props

        const length = React.Children.count(children)

        if (length <= 1) return children

        // 复制第一个和最后一个实现无缝滚动
        const clone = new Array(length + 2)

        React.Children.forEach(children, (child, index) => {
            if (index === 0) {
                clone[length + 1] = child
            }

            if (index === length - 1) {
                clone[0] = child
            }

            clone[index + 1] = child
        })

        return clone
    }

    get swiperWidth() {
        return this.swiperRef.current.getBoundingClientRect().width
    }

    constructor(props: SwiperProps) {
        super(props)

        this.state = {
            currentIndex: props.defaultIndex ?? 0,
        }
    }

    componentDidMount = () => {
        this.init()
    }

    componentDidUpdate = (prevProps: SwiperProps, prevState: SwiperState) => {
        const length = React.Children.count(this.props.children)
        const { currentIndex } = this.state
        const prevIndex = prevState.currentIndex

        // const isSilent = prevIndex > length - 1

        if (prevIndex !== currentIndex) {
            this.translate(currentIndex, false)
        }
    }

    render = () => {
        const { className, dots, arrows, arrowsType, children, renderNextArrow, renderPrevArrow } = this.props

        const { currentIndex } = this.state

        const childrenCount = React.Children.count(children)

        return (
            <div
                className={classnames(className, swiperClass('_'))}
                ref={this.swiperRef}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {arrows && childrenCount > 1 && renderPrevArrow(this.prev)}
                {arrows && childrenCount > 1 && renderNextArrow(this.next)}

                <div ref={this.swiperContainerRef} className={swiperClass('container')}>
                    {React.Children.map(this.clonedChildren, (child: React.ReactElement, index: number) => {
                        const { style: rawStyle, ...props } = child.props

                        const style = Object.assign({}, rawStyle ?? {}, { float: 'left', height: '100%' })

                        const key = child.key ?? index - 1

                        return cloneElement(child, {
                            key,
                            style,
                            ...props,
                        })
                    })}
                </div>
            </div>
        )
    }

    private init = () => {
        const { autoplay, children } = this.props
        const { currentIndex } = this.state
        const childrenCount = React.Children.count(children)
        const innerElements = this.swiperContainerRef.current.children

        console.log(this.swiperWidth, innerElements.length)

        this.clearAutoplay()

        setStyle(this.swiperContainerRef.current, {
            width: `${this.swiperWidth * innerElements.length}px`,
        })

        for (const item of innerElements) {
            setStyle(item as HTMLElement, {
                width: `${100 / innerElements.length}%`,
            })
        }

        if (childrenCount > 1) {
            autoplay && this.startAutoplay()

            this.translate(currentIndex, true)
        }
    }

    private translate = (currentIndex: number, isSilent?: boolean) => {
        const { autoplay, autoplayInterval, transitionDuration, onChange } = this.props

        const length = React.Children.count(this.props.children)

        const itemWidth = this.swiperWidth

        const translateDistance = itemWidth * -currentIndex

        const realDuration = isSilent ? 0 : transitionDuration

        if (autoplay && !this.isMouseIn && this.timer) {
            clearTimeout(this.timer)

            this.timer = setTimeout(this.next, Number(autoplayInterval))
        }

        setStyle(this.swiperRef.current, {
            transform: `translateX(${translateDistance}px)`,
            'transition-duration': `${realDuration}ms`,
        })

        if (currentIndex > length - 1 || currentIndex < 0) {
            return this.resetPosition(currentIndex)
        }

        // 等待动画结束之后将isSwiping置为false
        setTimeout(() => {
            this.isTransition = false
        }, realDuration)

        onChange?.(currentIndex)
    }

    private handleMouseEnter = () => {
        const { autoplay } = this.props

        this.isMouseIn = true

        autoplay && this.clearAutoplay()
    }

    private handleMouseLeave = () => {
        const { autoplay } = this.props

        this.isMouseIn = false

        autoplay && this.startAutoplay()
    }

    private clearAutoplay = () => {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    private startAutoplay = () => {
        const { autoplayInterval } = this.props

        this.timer = setTimeout(this.next, autoplayInterval)
    }

    private resetPosition = (currentIndex: number) => {
        const { transitionDuration } = this.props
        const length = React.Children.count(this.props.children)

        if (currentIndex < 0) {
            setTimeout(
                () =>
                    this.setState({
                        currentIndex: length - 1,
                    }),
                transitionDuration
            )
        } else {
            setTimeout(
                () =>
                    this.setState({
                        currentIndex: 0,
                    }),
                transitionDuration
            )
        }
    }

    prev = () => {
        const { currentIndex } = this.state

        this.scrollTo(currentIndex - 1)
    }

    next = () => {
        const { currentIndex } = this.state

        if (React.Children.count(this.props.children) === 1) {
            return
        }

        this.scrollTo(currentIndex + 1)
    }

    scrollTo = (index: number) => {
        const { currentIndex } = this.state

        if (index === currentIndex || this.isTransition) return

        this.isTransition = true

        this.setState({ currentIndex: index })
    }
}

export default Swiper
