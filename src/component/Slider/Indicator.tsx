import React, { memo } from 'react'
import draggable from '@/hoc/draggable'
import { sliderClass } from '@/styles'
import { IndicatorProps } from './type'

const Indicator: React.FC<IndicatorProps> = props => {
    const { disabled, onDragStart } = props

    const onMouseDown = disabled ? undefined : onDragStart

    return <div onMouseDown={onMouseDown} className={sliderClass('indicator')} />
}

export default draggable(memo(Indicator))
