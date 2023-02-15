import React from 'react'
import { datePickerClass } from '@/styles'
import { range } from '@/utils/numbers'
import useRefMethod from '@/hooks/useRefMethod'
import Icon from './Icon'
import { DatePickerYearProps } from './type'
import utils from './utils'

const Year: React.FC<DatePickerYearProps> = function (props) {
    const { panelDate, onChange, onModeChange, type } = props

    function handleChange(year: number) {
        const date = new Date(panelDate.getTime())
        const isYearType = type === 'year'

        date.setFullYear(year)

        onChange(date, isYearType, isYearType)

        if (!isYearType) onModeChange('month')
    }

    const handleRangeChange = useRefMethod((year: number) => {
        onChange(utils.addYears(panelDate, year))
    })

    /** 可选的范围为当前年份的前后7年 */
    const cy = panelDate.getFullYear() - 7
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
                        className={datePickerClass(panelDate && panelDate.getFullYear() === y && 'active')}
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
