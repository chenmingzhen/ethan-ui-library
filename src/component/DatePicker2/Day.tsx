import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { datePickerClass } from '@/styles'
import { isFunc } from '@/utils/is'
import React, { useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import { DatePickerDayProps } from './type'
import utils from './utils'

const Day: React.FC<DatePickerDayProps> = function (props) {
    const { panelDate, index, min, max, onChange, onModeChange, disabled, type } = props
    const [hover, updateHover] = useState(null)
    const today = useRef(utils.newDate()).current
    const minDate = min && new Date(utils.format(min, 'yyyy-MM-dd 00:00:00'))
    const maxDate = max && new Date(utils.format(max, 'yyyy-MM-dd 23:59:59'))
    const days = useMemo(() => {
        const date = utils.clearHMS(panelDate)

        return utils.getDaysOfMonth(date)
    }, [panelDate])

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
        if (type === 'week') {
            onChange(date, true, true)
        } else {
            const newDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                panelDate.getHours(),
                panelDate.getMinutes(),
                panelDate.getSeconds()
            )

            onChange(newDate, true, type !== 'date-time')
        }
    })

    function renderDay(date: Date) {
        const hmsDate = new Date(date)

        utils.setTime(hmsDate, panelDate)

        let isDisabled = isFunc(disabled) ? disabled(date) : disabled

        if (
            (index === undefined && !isDisabled && minDate && utils.compareAsc(date, minDate) < 0) ||
            (maxDate && utils.compareAsc(date, maxDate) > 0)
        ) {
            isDisabled = true
        }

        let hoverClass
        const hoverProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {}
        const weekStart = getLocale('startOfWeek')
        const weekEnd = weekStart ? 0 : 6
        const classList = [
            utils.isSameDay(date, today) && 'today',
            panelDate.getMonth() !== date.getMonth() && 'other-month',
            isDisabled && 'disabled',
        ]

        if (type === 'week') {
            hoverProps.onMouseEnter = () => {
                updateHover(date)
            }
            hoverProps.onMouseLeave = () => {
                updateHover(null)
            }

            if (
                utils.isSameWeek(date, panelDate, {
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
            classList.push(utils.isSameDay(date, panelDate) && 'active')
        }

        return (
            <div
                key={date.getTime()}
                className={hoverClass}
                onClick={isDisabled ? undefined : handleClickDay.bind(null, date)}
                onDoubleClick={isDisabled ? undefined : undefined}
                {...hoverProps}
            >
                <span className={datePickerClass(...classList)}>{date.getDate()}</span>
            </div>
        )
    }

    return (
        <div className={datePickerClass('day-picker')}>
            <div className={datePickerClass('title')}>{getLocale('pickerTitle')[index]}</div>
            <div className={datePickerClass('header')}>
                <Icon
                    name="AngleDoubleLeft"
                    disabled={!!(min && panelDate.getFullYear() <= minDate.getFullYear())}
                    onClick={handleClickPrevYear}
                />
                <Icon
                    name="AngleLeft"
                    disabled={!!(min && utils.compareMonth(panelDate, minDate) <= 0)}
                    onClick={handleClickPrevMonth}
                />

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
        </div>
    )
}

export default React.memo(Day)
