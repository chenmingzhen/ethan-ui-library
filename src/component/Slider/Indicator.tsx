import React, { memo } from 'react'
import { sliderClass } from '@/styles'
import useDrag from '@/hooks/useDrag'
import { IndicatorProps } from './type'

const Indicator: React.FC<IndicatorProps> = (props) => {
    const { disabled, onDragStart, onDrag, onDragEnd } = props

    const [, , handleDragStart] = useDrag({ onDragStart, onDrag, onDragEnd })

    return <div onMouseDown={disabled ? undefined : handleDragStart} className={sliderClass('indicator')} />
}

export default memo(Indicator)
