import React from 'react'
import { datePickerClass } from '@/styles'
import { range } from '@/utils/numbers'
import Icon from './Icon'
import { DatePickerYearProps } from './type'
import utils from './utils'

const Year: React.FC<DatePickerYearProps> = function (props) {
    const { current, onChange, onModeChange, value, type } = props

    function handleChange(year: number) {
        const date = new Date(current.getTime())
        date.setFullYear(year)

        const isYearType = type === 'year'

        onChange(date, isYearType, isYearType)

        if (!isYearType) onModeChange('month')
    }

    function handleRangeChange(year: number) {
        onChange(utils.addYears(current, year))
    }

    /** 可选的范围为当前年份的前后7年 */
    const cy = current.getFullYear() - 7

    const years = range(15, 0).map((i) => cy + i)

    return (
        <div className={datePickerClass('year-picker')}>
            <div className={datePickerClass('header')}>
                <Icon name="AngleLeft" onClick={handleRangeChange.bind(null, -15)} />

                <span className={datePickerClass('ym')}>{`${years[0]} ~ ${years[years.length - 1]}`}</span>

                <Icon name="AngleRight" onClick={handleRangeChange.bind(null, 15)} />
            </div>

            <div className={datePickerClass('list')}>
                {years.map((y) => (
                    <span
                        key={y}
                        className={datePickerClass(value && value.getFullYear() === y && 'active')}
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
