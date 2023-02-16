import useRefMethod from '@/hooks/useRefMethod'
import { datePickerClass } from '@/styles'
import React from 'react'
import TimeScroll from './TimeScroll'
import { DatePickerTimeProps } from './type'
import utils from './utils'

const Time: React.FC<DatePickerTimeProps> = function (props) {
    const { value, format, panelDate, min, max, disabled, onChange } = props

    const handleChange = useRefMethod((type: string, val) => {
        let mode = type

        if (type === 'hour') {
            if (format.indexOf('h') >= 0) {
                mode = 'h'
            } else {
                mode = 'H'
            }
        }

        const [isDisabled, date] = utils.judgeTimeByRange(val, value, mode, min, max, undefined, disabled)

        if (isDisabled) return

        onChange(date, false, false)
    })

    const handleHourChange = useRefMethod((val) => {
        handleChange('hour', val)
    })

    function renderHouTimeScroll() {
        if (format.indexOf('H') >= 0) {
            return (
                <TimeScroll
                    panelDate={panelDate}
                    value={panelDate.getHours()}
                    mode="H"
                    min={min}
                    max={max}
                    disabled={disabled}
                    total={24}
                    onChange={handleHourChange}
                />
            )
        }
        if (format.indexOf('h') >= 0) {
            let hours = value.getHours()

            if (hours >= 12) {
                hours -= 12
            }

            return (
                <TimeScroll
                    panelDate={panelDate}
                    mode="h"
                    min={min}
                    max={max}
                    disabled={disabled}
                    value={hours}
                    total={12}
                    onChange={handleHourChange}
                />
            )
        }

        return null
    }

    return <div className={datePickerClass('time-picker')}>{renderHouTimeScroll()}</div>
}

export default React.memo(Time)
