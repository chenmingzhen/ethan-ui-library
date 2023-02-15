import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { datePickerClass } from '@/styles'
import { isFunc } from '@/utils/is'
import React from 'react'
import Icon from './Icon'
import { DatePickerMonthProps } from './type'
import utils from './utils'

const Month: React.FC<DatePickerMonthProps> = function (props) {
    const { panelDate, onChange, onModeChange, min, disabled, type } = props

    const handleClickPrevYear = useRefMethod(() => {
        onChange(utils.addYears(panelDate, -1))
    })

    const handleClickNextYear = useRefMethod(() => {
        onChange(utils.addYears(panelDate, 1))
    })

    function handleMonthClick(month: number) {
        const date = new Date(panelDate.getTime())
        const isMonthType = type === 'month'

        date.setMonth(month, 1)

        onChange(date, isMonthType, isMonthType)

        if (!isMonthType) onModeChange('day')
    }

    function renderMonth(monthName: string, index: number) {
        let isDisabled = false
        const date = new Date()

        date.setMonth(index)
        date.setFullYear(panelDate.getFullYear())

        if (min) {
            isDisabled = utils.compareMonth(new Date(min), date, 1) >= 0
        }

        if (!isDisabled && type === 'month' && isFunc(disabled)) {
            isDisabled = disabled(date)
        }

        const className = datePickerClass(utils.isSameMonth(panelDate, date) && 'active', isDisabled && 'disabled')

        return (
            <span
                key={index}
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
