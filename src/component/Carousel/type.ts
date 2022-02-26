export type CarouselMoveTo = (index: number) => void

export type CarouselIndicatorPosition = 'left' | 'center' | 'right'

export type CarouselIndicatorType =
    | 'number'
    | 'circle'
    | 'line'
    | ((current: number, moveTo: CarouselMoveTo, isInCarousel: boolean) => React.ReactNode)

export type CarouselSize = 'small' | 'default' | 'large'

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
    // TODO
    size?: CarouselSize
}
