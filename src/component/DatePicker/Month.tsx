import { getLocale } from '@/locale'
import { datepickerClass } from '@/styles'
import { isFunc } from '@/utils/is'
import React from 'react'
import Icon from './Icon'
import { DatePickerMonthProps } from './type'
import utils from './utils'

const Month: React.FC<DatePickerMonthProps> = function(props) {
    const { current, onChange, onModeChange, value, min, disabled, range, type } = props

    function handleYearChange(year: number) {
        onChange(utils.addYears(current, year))
    }

    function handleMonthClick(month: number) {
        const date = new Date(current.getTime())

        const isMonthType = type === 'month'

        date.setMonth(month, 1)

        onChange(date, isMonthType, isMonthType)

        if (!isMonthType) onModeChange('day')
    }

    function renderMonth(monthName: string, index: number) {
        const date = new Date()

        date.setMonth(index)

        date.setFullYear(current.getFullYear())

        let isDisabled = false

        if (min) {
            isDisabled = utils.compareMonth(new Date(min), date, 1) >= 0
        }

        if (!isDisabled && type === 'month' && isFunc(disabled)) {
            isDisabled = disabled(date)
        }

        if (
            !isDisabled &&
            min &&
            typeof range === 'number' &&
            utils.compareAsc(date, utils.addSeconds(min, range)) > 0
        ) {
            isDisabled = true
        }

        const className = datepickerClass(utils.isSameMonth(value, date) && 'active', isDisabled && 'disabled')

        return (
            <span
                key={index}
                className={className}
                onClick={isDisabled ? undefined : handleMonthClick.bind(this, index)}
            >
                {monthName}
            </span>
        )
    }

    return (
        <div className={datepickerClass('month-picker')}>
            <div className={datepickerClass('header')}>
                <Icon name="AngleLeft" onClick={handleYearChange.bind(this, -1)} />

                <span
                    onClick={() => {
                        onModeChange('year')
                    }}
                    className={datepickerClass('ym')}
                >
                    {current.getFullYear()}
                </span>

                <Icon name="AngleRight" onClick={handleYearChange.bind(this, 1)} />
            </div>

            <div className={datepickerClass('list')}>{getLocale('monthValues.short').map(renderMonth)}</div>
        </div>
    )
}

export default React.memo(Month)
