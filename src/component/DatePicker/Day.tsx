import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { datePickerClass } from '@/styles'
import { isFunc } from '@/utils/is'
import React, { useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import Time from './Time'
import { DatePickerDayProps } from './type'
import utils from './utils'

const Day: React.FC<DatePickerDayProps> = function (props) {
    const { panelDate, index, min, max, onChange, onModeChange, disabled, type, value } = props
    const [hover, updateHover] = useState(null)
    const today = useRef(new Date()).current
    const days = useMemo(() => utils.getDaysOfMonth(panelDate), [panelDate])

    const handleChangeMonth = useRefMethod((month: number) => {
        onChange(utils.addMonths(panelDate, month))
    })

    const handleClickPrevYear = useRefMethod(() => {
        handleChangeMonth(-12)
    })

    const handleClickPrevMonth = useRefMethod(() => {
        handleChangeMonth(-1)
    })

    const handleClickNextYear = useRefMethod(() => {
        handleChangeMonth(12)
    })

    const handleClickNextMonth = useRefMethod(() => {
        handleChangeMonth(1)
    })

    const handleClickYearMode = useRefMethod(() => {
        onModeChange('year')
    })
    const handleClickMonthMode = useRefMethod(() => {
        onModeChange('month')
    })
    const handleClickDay = useRefMethod((date: Date) => {
        onChange(date, true, type === 'week' ? true : type !== 'date-time')
    })
    const handleTimeChange = useRefMethod((date) => {
        onChange(date, true, false)
    })

    function renderDay(date: Date) {
        let isDisabled = isFunc(disabled) ? disabled(date) : disabled

        if (
            (index === undefined && !isDisabled && min && utils.compareAsc(date, min) < 0) ||
            (max && utils.compareAsc(date, max) > 0)
        ) {
            isDisabled = true
        }

        let hoverClass
        const hoverProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {}
        const classList = [
            utils.isSameDay(date, today) && 'today',
            panelDate.getMonth() !== date.getMonth() && 'other-month',
            isDisabled && 'disabled',
        ]

        if (type === 'week') {
            const weekStart = getLocale('startOfWeek')
            const weekEnd = weekStart ? 0 : 6

            hoverProps.onMouseEnter = () => {
                updateHover(date)
            }
            hoverProps.onMouseLeave = () => {
                updateHover(null)
            }

            if (
                utils.isSameWeek(date, value, {
                    weekStartsOn: weekStart,
                })
            ) {
                hoverClass = datePickerClass(
                    'active',
                    date.getDay() === weekStart && 'hover-start',
                    date.getDay() === weekEnd && 'hover-end'
                )
            } else if (
                hover &&
                utils.isSameWeek(date, hover, {
                    weekStartsOn: weekStart,
                })
            ) {
                hoverClass = datePickerClass(
                    'hover',
                    date.getDay() === weekStart && 'hover-start',
                    date.getDay() === weekEnd && 'hover-end'
                )
            }
        } else {
            classList.push(utils.isSameDay(date, value) && 'active')
        }

        return (
            <div
                key={date.getTime()}
                className={hoverClass}
                onClick={isDisabled ? undefined : handleClickDay.bind(null, date)}
                {...hoverProps}
            >
                <span className={datePickerClass(...classList)}>{date.getDate()}</span>
            </div>
        )
    }

    function renderTimePicker() {
        if (type !== 'date-time' || !value) return null

        const { format } = props

        return (
            <div className={datePickerClass('date-time')}>
                <Time
                    format={format}
                    value={value}
                    onChange={handleTimeChange}
                    panelDate={panelDate}
                    disabled={disabled}
                    min={min}
                    max={max}
                />
                <span>{utils.format(value, format)}</span>
            </div>
        )
    }

    return (
        <div className={datePickerClass('day-picker')}>
            <div className={datePickerClass('title')}>{getLocale('pickerTitle')[index]}</div>
            <div className={datePickerClass('header')}>
                <Icon name="AngleDoubleLeft" onClick={handleClickPrevYear} />
                <Icon name="AngleLeft" onClick={handleClickPrevMonth} />

                <span className={datePickerClass('ym')}>
                    <span onClick={handleClickYearMode}>{panelDate.getFullYear()}</span>
                    <span onClick={handleClickMonthMode}>{getLocale('monthValues.short')[panelDate.getMonth()]}</span>
                </span>

                <Icon name="AngleRight" onClick={handleClickNextMonth} />
                <Icon onClick={handleClickNextYear} name="AngleDoubleRight" />
            </div>

            <div className={datePickerClass('week')}>
                {getLocale('weekdayValues.narrow').map((w) => (
                    <span key={w}>{w}</span>
                ))}
            </div>

            <div className={datePickerClass('list')}>{days.map(renderDay)}</div>

            {renderTimePicker()}
        </div>
    )
}

export default React.memo(Day)
