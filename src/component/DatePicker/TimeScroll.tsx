import useRefMethod from '@/hooks/useRefMethod'
import { datePickerClass } from '@/styles'
import normalizeWheel from '@/utils/dom/normalizeWheel'
import { preventDefault, throttleWrapper } from '@/utils/func'
import { runInNextFrame } from '@/utils/nextFrame'
import { getRangeValue, range } from '@/utils/numbers'
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
    const { total, onChange, mode, min, max, selectedDate, disabled, currentScale } = props
    const elementRef = useRef<HTMLDivElement>()

    useEffect(() => {
        if (elementRef.current.scrollTop !== currentScale * lineHeight) {
            const timer = runInNextFrame(() => {
                elementRef.current.scrollTop = lineHeight * currentScale
            })

            return timer
        }
    }, [currentScale])

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.addEventListener('wheel', handleWheel, { passive: false })
        }

        return () => {
            if (elementRef.current) {
                elementRef.current.removeEventListener('wheel', handleWheel)
            }
        }
    }, [])

    function handleClick(scale: number) {
        onChange(scale)
    }

    function renderItem(scale: number) {
        const text: string | number = scale < 10 ? `0${scale}` : scale
        const [isDisabled] = utils.getIsDisabledHMS({ scale, min, max, selectedDate, disabled, mode })
        const className = datePickerClass(!isDisabled && currentScale === scale && 'time-active')

        return (
            <span
                key={scale}
                className={className}
                style={isDisabled ? undefined : grayStyle[Math.abs(currentScale - scale)]}
                onClick={isDisabled ? undefined : handleClick.bind(null, scale)}
            >
                {text}
            </span>
        )
    }

    const throttleScroll = useRefMethod(
        throttleWrapper((e: WheelEvent) => {
            const { pixelY } = normalizeWheel(e)

            const scale = getRangeValue({
                max: total - 1,
                min: 0,
                current: currentScale + Math.round(pixelY / lineHeight),
            })

            onChange(scale)
        }, 120)
    )

    const handleWheel = useRefMethod((e: WheelEvent) => {
        preventDefault(e)

        throttleScroll(e)
    })

    return (
        <div ref={elementRef} className={datePickerClass('time-list')} style={{ scrollBehavior: 'smooth' }}>
            <div className={datePickerClass('pad')} />
            {range(total, 0).map(renderItem)}
            <div className={datePickerClass('pad')} />
        </div>
    )
}

export default React.memo(TimeScroll)
