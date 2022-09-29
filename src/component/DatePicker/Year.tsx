import React from 'react'
import { datepickerClass } from '@/styles'
import { range } from '@/utils/numbers'
import Icon from './Icon'
import { DatePickerYearProps } from './type'
import utils from './utils'

const Year: React.FC<DatePickerYearProps> = function(props) {
    const { current, onChange, onModeChange, value } = props

    function handleChange(year: number) {
        const date = new Date(current.getTime())

        date.setFullYear(year)

        onChange(date)

        onModeChange('month')
    }

    function handleRangeChange(year: number) {
        onChange(utils.addYears(current, year))
    }

    /** 可选的范围为当前年份的前后7年 */
    const cy = current.getFullYear() - 7

    const years = range(15, 0).map(i => cy + i)

    return (
        <div className={datepickerClass('year-picker')}>
            <div className={datepickerClass('header')}>
                <Icon name="AngleLeft" onClick={handleRangeChange.bind(null, -15)} />

                <span className={datepickerClass('ym')}>{`${years[0]} ~ ${years[years.length - 1]}`}</span>

                <Icon name="AngleRight" onClick={handleRangeChange.bind(null, 15)} />
            </div>

            <div className={datepickerClass('list')}>
                {years.map(y => (
                    <span
                        key={y}
                        className={datepickerClass(value && value.getFullYear() === y && 'active')}
                        onClick={handleChange.bind(null, y)}
                    >
                        {y}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default React.memo(Year)
