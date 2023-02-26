import useRefMethod from '@/hooks/useRefMethod'
import { datePickerClass } from '@/styles'
import React from 'react'
import TimeScroll from './TimeScroll'
import { DatePickerTimeProps } from './type'
import utils from './utils'

const Time: React.FC<DatePickerTimeProps> = function (props) {
    const { min, max, disabled, onChange, selectedDate } = props

    const handleChange = useRefMethod((mode, scale) => {
        const [isDisabled, date] = utils.getIsDisabledHMS({
            scale,
            min,
            max,
            selectedDate,
            disabled,
            mode,
        })

        if (isDisabled) return

        onChange(date, 'time')
    })

    const handleHourChange = useRefMethod((scale: number) => {
        handleChange('hour', scale)
    })

    const handleMinuteChange = useRefMethod((scale: number) => {
        handleChange('minute', scale)
    })

    const handleSecondChange = useRefMethod((scale: number) => {
        handleChange('second', scale)
    })

    return (
        <div className={datePickerClass('time-picker')}>
            <TimeScroll
                selectedDate={selectedDate}
                currentScale={selectedDate.getHours()}
                mode="hour"
                min={min}
                max={max}
                disabled={disabled}
                total={24}
                onChange={handleHourChange}
            />
            <TimeScroll
                selectedDate={selectedDate}
                currentScale={selectedDate.getMinutes()}
                mode="minute"
                min={min}
                max={max}
                disabled={disabled}
                total={60}
                onChange={handleMinuteChange}
            />
            <TimeScroll
                selectedDate={selectedDate}
                currentScale={selectedDate.getSeconds()}
                mode="second"
                min={min}
                max={max}
                disabled={disabled}
                total={60}
                onChange={handleSecondChange}
            />
        </div>
    )
}

export default React.memo(Time)
