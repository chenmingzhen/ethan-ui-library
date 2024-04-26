import React from 'react'
import classnames from 'classnames'
import { carouselClass } from '@/styles'
import { CarouselItemProps } from './type'

const CarouselItem: React.FC<CarouselItemProps> = ({ children, isCurrent, className, isPrevious }) => (
    <div
        className={classnames(carouselClass('item', isCurrent && 'item-current', isPrevious && 'item-pre'), className)}
    >
        {children}
    </div>
)

export default React.memo(CarouselItem)
