import { datePickerClass } from '@/styles'
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
    const { total, onChange, mode, min, max, panelDate, disabled, value } = props
    const elementRef = useRef<HTMLDivElement>()

    useEffect(() => {
        if (elementRef.current.scrollTop !== lineHeight * value) {
            const timer = setTimeout(() => {
                elementRef.current.scrollTop = lineHeight * value
            }, 10)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [value])

    function handleMouseLeave() {
        const currentIndex = Math.round(elementRef.current.scrollTop / lineHeight)
        elementRef.current.scrollTop = currentIndex * lineHeight
    }

    function handleScroll() {
        const currentIndex = Math.round(elementRef.current.scrollTop / lineHeight)

        onChange(currentIndex)
    }

    function handleClick(num: number) {
        onChange(num)

        elementRef.current.scrollTop = lineHeight * num
    }

    function renderItem(num: number) {
        let text: string | number = num

        if (total === 12 && num === 0) text = '12'
        else if (num < 10) text = `0${num}`

        const [isDisabled] = utils.judgeTimeByRange(num, panelDate, mode, min, max, props.range, disabled)
        const className = datePickerClass(!isDisabled && value === num && 'time-active')

        return (
            <span
                key={num}
                className={className}
                style={isDisabled ? undefined : grayStyle[Math.abs(value - num)]}
                onClick={handleClick.bind(null, num)}
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
