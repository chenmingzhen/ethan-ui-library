export type CarouselMoveTo = (index: number) => void

export type CarouselIndicatorPosition = 'left' | 'center' | 'right'

export type CarouselIndicatorType =
    | 'number'
    | 'circle'
    | 'line'
    | ((current: number, moveTo: CarouselMoveTo, isInCarousel: boolean) => React.ReactNode)

export type CarouselAnimation = 'slide' | 'slide-y' | 'fade'

export interface CarouselProps {
    animation?: CarouselAnimation
    children?: React.ReactNode
    indicatorPosition?: CarouselIndicatorPosition
    indicatorType?: CarouselIndicatorType
    interval?: number
    mouseEffect?: boolean
    style?: React.CSSProperties
    className?: string
}

export interface IndicatorProps {
    count: number
    indicatorPosition: CarouselIndicatorPosition
    indicatorType: CarouselIndicatorType
    current: number
    moveTo: CarouselMoveTo
    mouseInView: boolean
}

export interface CarouselItemProps {
    children: React.ReactNode
    className?: string
    isCurrent: boolean
    isPrevious: boolean
}
