import React from 'react'
import classnames from 'classnames'
import { carouselClass } from '@/styles'

interface CarouselItemProps {
    children: React.ReactNode

    className?: string

    isCurrent: boolean

    isPrev: boolean
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children, isCurrent, className, isPrev }) => (
    <div className={classnames(carouselClass('item', isCurrent && 'item-current', isPrev && 'item-pre'), className)}>
        {children}
    </div>
)

export default React.memo(CarouselItem)
