import { datePickerClass } from '@/styles'
import { runInNextFrame } from '@/utils/nextFrame'
import { range } from '@/utils/numbers'
import React, { useEffect, useRef } from 'react'
import { TimeScrollProps } from './type'
import utils from './utils'

const lineHeight = 30
const grayStyle = {
    1: { color: '#888' },
    2: { color: '#ccc' },
    3: { color: '#eee' },
}

const TimeScroll: React.FC<TimeScrollProps> = function (props) {
    const { total, onChange, mode, min, max, panelDate, disabled, currentScale } = props
    const elementRef = useRef<HTMLDivElement>()

    useEffect(() => {
        if (elementRef.current.scrollTop !== lineHeight * currentScale) {
            return runInNextFrame(() => {
                elementRef.current.scrollTop = lineHeight * currentScale
            })
        }
    }, [currentScale])

    function handleMouseLeave() {
        const scale = Math.round(elementRef.current.scrollTop / lineHeight)
        elementRef.current.scrollTop = scale * lineHeight
    }

    function handleScroll() {
        const scale = Math.round(elementRef.current.scrollTop / lineHeight)

        onChange(scale)
    }

    function handleClick(num: number) {
        onChange(num)

        elementRef.current.scrollTop = lineHeight * num
    }

    function renderItem(scale: number) {
        const text: string | number = scale < 10 ? `0${scale}` : scale
        const [isDisabled] = utils.getIsDisabledHMS({ scale, min, max, panelDate, disabled, mode })
        const className = datePickerClass(!isDisabled && currentScale === scale && 'time-active')

        return (
            <span
                key={scale}
                className={className}
                style={isDisabled ? undefined : grayStyle[Math.abs(currentScale - scale)]}
                onClick={disabled ? undefined : handleClick.bind(null, scale)}
            >
                {text}
            </span>
        )
    }

    return (
        <div
            ref={elementRef}
            className={datePickerClass('time-list')}
            onMouseLeave={handleMouseLeave}
            onScroll={handleScroll}
        >
            <div className={datePickerClass('pad')} />
            {range(total, 0).map(renderItem)}
            <div className={datePickerClass('pad')} />
        </div>
    )
}

export default React.memo(TimeScroll)
