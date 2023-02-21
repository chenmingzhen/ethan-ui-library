import React from 'react'
import { datePickerClass } from '@/styles'
import { range } from '@/utils/numbers'
import useRefMethod from '@/hooks/useRefMethod'
import { isFunc } from '@/utils/is'
import Icon from './Icon'
import { DatePickerYearProps } from './type'
import utils from './utils'

const Year: React.FC<DatePickerYearProps> = function (props) {
    const { panelDate, onChange, onModeChange, type, value, min, max, disabled } = props

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
                {years.map((y) => {
                    let isDisabled = false
                    const date = new Date()

                    date.setFullYear(y)

                    if (min) {
                        isDisabled = min.getFullYear() > y
                    }

                    if (!isDisabled && max) {
                        isDisabled = max.getFullYear() < y
                    }

                    if (!isDisabled && type === 'year' && isFunc(disabled)) {
                        isDisabled = disabled(date)
                    }

                    return (
                        <span
                            key={y}
                            className={datePickerClass(
                                value && value.getFullYear() === y && 'active',
                                isDisabled && 'disabled'
                            )}
                            onClick={isDisabled ? undefined : handleChange.bind(null, y)}
                        >
                            {y}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default React.memo(Year)
