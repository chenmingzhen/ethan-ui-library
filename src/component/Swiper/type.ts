export interface SwiperProps {
    defaultIndex?: number

    className?: string

    transitionDuration?: number

    autoplay?: boolean

    autoplayInterval?: number

    dots?: boolean

    arrows?: boolean

    onChange?: (current: number) => void

    children?: React.ReactNode

    renderPrevArrow?: (onPrev: () => void) => React.ReactNode

    renderNextArrow?: (onNext: () => void) => React.ReactNode
}

export interface SwiperState {
    currentIndex: number
}
