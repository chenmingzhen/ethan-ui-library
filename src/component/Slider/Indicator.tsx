import React, { memo, useCallback, useRef } from 'react'
import { sliderClass } from '@/styles'
import useDragPosition from '@/hooks/useDragPosition'
import { IndicatorProps } from './type'

const Indicator: React.FC<IndicatorProps> = (props) => {
    const { disabled, onDragStart, onDrag, onDragEnd } = props

    const elementRef = useRef<HTMLDivElement>()

    const getDragTarget = useCallback(() => {
        if (disabled) return undefined

        return elementRef.current
    }, [disabled])

    useDragPosition({
        onDragStart,
        onDrag,
        onDragEnd,
        getDragTarget,
    })

    return <div ref={elementRef} className={sliderClass('indicator')} />
}

export default memo(Indicator)
