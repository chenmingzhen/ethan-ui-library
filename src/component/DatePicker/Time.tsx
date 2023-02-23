import useRefMethod from '@/hooks/useRefMethod'
import { datePickerClass } from '@/styles'
import React from 'react'
import TimeScroll from './TimeScroll'
import { DatePickerTimeProps } from './type'
import utils from './utils'

const Time: React.FC<DatePickerTimeProps> = function (props) {
    const { panelDate, min, max, disabled, onChange } = props

    const handleChange = useRefMethod((mode, scale) => {
        const [isDisabled, date] = utils.getIsDisabledHMS({ scale, min, max, panelDate, disabled, mode })

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
                panelDate={panelDate}
                currentScale={panelDate.getHours()}
                mode="hour"
                min={min}
                max={max}
                disabled={disabled}
                total={24}
                onChange={handleHourChange}
            />
            <TimeScroll
                panelDate={panelDate}
                currentScale={panelDate.getMinutes()}
                mode="minute"
                min={min}
                max={max}
                disabled={disabled}
                total={60}
                onChange={handleMinuteChange}
            />
            <TimeScroll
                panelDate={panelDate}
                currentScale={panelDate.getSeconds()}
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
