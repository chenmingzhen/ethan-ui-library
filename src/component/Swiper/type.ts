import React from 'react'

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

    renderArrow?: (onPrev: (e: React.MouseEvent) => void, onNext: (e: React.MouseEvent) => void) => React.ReactNode
}

export interface SwiperInstance {
    onPrev(e: React.MouseEvent): void

    onNext(e: React.MouseEvent): void

    scrollTo(index: number): void
}
