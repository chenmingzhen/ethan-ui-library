import { carouselClass } from '@/styles'
import { range } from '@/utils/numbers'
import React from 'react'
import { IndicatorProps } from './type'

const Indicator: React.FC<IndicatorProps> = ({
    count,
    indicatorPosition,
    indicatorType,
    current,
    moveTo,
    mouseInView,
}) => {
    if (typeof indicatorType === 'function') {
        return (
            <div className={carouselClass('indicator', `indicator-${indicatorPosition}`)}>
                {indicatorType(current, moveTo, mouseInView)}
            </div>
        )
    }

    return (
        <div className={carouselClass('indicator', `indicator-${indicatorPosition}`, `indicator-${indicatorType}`)}>
            {range(count).map((i) => (
                <a
                    key={i}
                    onClick={moveTo.bind(this, i)}
                    className={carouselClass(current === i && 'indicator-active')}
                >
                    {indicatorType === 'number' ? i + 1 : ''}
                </a>
            ))}
        </div>
    )
}

export default React.memo(Indicator)
