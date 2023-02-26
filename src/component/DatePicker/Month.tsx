import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { datePickerClass } from '@/styles'
import { isFunc } from '@/utils/is'
import React from 'react'
import Icon from './Icon'
import { DatePickerMonthProps } from './type'
import utils from './utils'

const Month: React.FC<DatePickerMonthProps> = function (props) {
    const { panelDate, onChange, onModeChange, min, disabled, type, max, selectedDate } = props

    const handleClickPrevYear = useRefMethod(() => {
        onChange(utils.addYears(panelDate, -1), undefined)
    })

    const handleClickNextYear = useRefMethod(() => {
        onChange(utils.addYears(panelDate, 1), undefined)
    })

    function handleMonthClick(month: number) {
        const date = utils.clearHMS(panelDate)
        const isMonthType = type === 'month'

        date.setMonth(month, 1)

        onChange(date, 'month')

        if (!isMonthType) onModeChange('day')
    }

    function renderMonth(monthName: string, index: number) {
        const date = new Date(utils.STANDARD_DATE)
        date.setMonth(index)
        date.setFullYear(panelDate.getFullYear())
        let isDisabled = false

        if (min) {
            isDisabled = utils.compareMonth(min, date) > 0
        }

        if (!isDisabled && max) {
            isDisabled = utils.compareMonth(date, max) > 0
        }

        if (!isDisabled && type === 'month' && isFunc(disabled)) {
            isDisabled = disabled(date)
        }

        const className = datePickerClass(
            utils.isSameMonth(selectedDate, date) ? 'active' : undefined,
            isDisabled && 'disabled'
        )

        return (
            <span
                key={date.getTime()}
                className={className}
                onClick={isDisabled ? undefined : handleMonthClick.bind(null, index)}
            >
                {monthName}
            </span>
        )
    }

    return (
        <div className={datePickerClass('month-picker')}>
            <div className={datePickerClass('header')}>
                <Icon name="AngleLeft" onClick={handleClickPrevYear} />
                <span
                    onClick={() => {
                        onModeChange('year')
                    }}
                    className={datePickerClass('ym')}
                >
                    {panelDate.getFullYear()}
                </span>
                <Icon name="AngleRight" onClick={handleClickNextYear} />
            </div>
            <div className={datePickerClass('list')}>{getLocale('monthValues.short').map(renderMonth)}</div>
        </div>
    )
}

export default React.memo(Month)
