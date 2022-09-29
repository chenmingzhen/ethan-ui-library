import React from 'react'
import { datepickerClass } from '@/styles'
import { getLocale } from '@/locale'
import { PureComponent } from '@/utils/component'
import { isFunc } from '@/utils/is'
import utils from './utils'
import Icon from './Icon'
import Time from './Time'
import { DatePickerDayProps } from './type'

interface DatePickerDayState {
    hover: Date
}

const minStr = 'yyyy-MM-dd 00:00:00'

const maxStr = 'yyyy-MM-dd 23:59:59'

class Day extends PureComponent<DatePickerDayProps, DatePickerDayState> {
    today = utils.newDate()

    get days() {
        const { current } = this.props

        const date = utils.clearHMS(current)

        return utils.getDaysOfMonth(date)
    }

    constructor(props) {
        super(props)

        this.state = {
            hover: null,
        }
    }

    handlePrevYear = () => {
        this.handleMonth(-12)
    }

    handleNextYear = () => {
        this.handleMonth(12)
    }

    handleNextMonth = () => {
        this.handleMonth(1)
    }

    handlePrevMonth = () => {
        this.handleMonth(-1)
    }

    handleYearModeChange = () => {
        this.props.onModeChange('year')
    }

    handleMonthModeChange = () => {
        this.props.onModeChange('month')
    }

    // 格式化时间
    // 将default的HMS克隆到current上
    formatWithDefaultTime(i) {
        let idx = 0
        const { current, defaultTime, index } = this.props

        if (typeof index === 'number') idx = index
        if (typeof i === 'number') idx = i
        if (!defaultTime[idx]) return current
        return utils.cloneTime(current, defaultTime[idx], utils.TIME_FORMAT)
    }

    handleDayDoubleClick(date) {
        const { type, defaultTime, index } = this.props
        // range & datetime & defaultTime
        if (type !== 'datetime' || !defaultTime.length || index === undefined) return
        this.handleDayClick(date, 0)
        this.handleDayClick(date, 1)
    }

    // 点击Day处理
    handleDayClick(date, sync) {
        const { type, allowSingle, rangeDate, min, max, index } = this.props
        const current = this.formatWithDefaultTime(sync)
        const onChange = typeof sync === 'number' ? this.props.onChangeSync.bind(this.props, sync) : this.props.onChange

        if (type === 'week') {
            onChange(date, true, true)
        } else {
            let newDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                current.getHours(),
                current.getMinutes(),
                current.getSeconds()
            )

            if (min && utils.compareAsc(newDate, min) < 0) utils.setTime(newDate, min)
            if (max && utils.compareAsc(newDate, max) > 0) utils.setTime(newDate, max)

            if (
                allowSingle &&
                rangeDate[index] &&
                utils.clearHMS(newDate).getTime() === utils.clearHMS(rangeDate[index]).getTime()
            )
                newDate = ''
            // datetime模式 点击day未结束操作
            onChange(newDate, true, type !== 'datetime')
        }
    }

    handleTimeChange(time, change, end, mode) {
        this.props.onChange(time, true, false, mode)
    }

    handleWeek(hover: Date) {
        this.setState({ hover })
    }

    handleMonth(month: number) {
        const { current, onChange } = this.props

        onChange(utils.addMonths(current, month))
    }

    handleDayHover(date: Date) {
        this.props.onDayHover(date)
    }

    renderDay(date: Date, minDate: Date, maxDate: Date) {
        const { current, disabled, value, index, type, rangeDate, range, rangeTemp, min, max } = this.props

        const { hover } = this.state

        const hmsDate = new Date(date)

        utils.setTime(hmsDate, current)

        let isDisabled = false

        if (isFunc(disabled)) {
            disabled(date)
        } else if (disabled) {
            isDisabled = disabled
        }

        if (
            (index === undefined && !isDisabled && minDate && utils.compareAsc(date, minDate) < 0) ||
            (maxDate && utils.compareAsc(date, maxDate) > 0)
        ) {
            isDisabled = true
        }

        if (
            !isDisabled &&
            index === 1 &&
            ((typeof range === 'number' && utils.compareAsc(date, utils.addSeconds(rangeTemp, range)) > 0) ||
                utils.compareAsc(date, utils.clearHMS(rangeTemp)) < 0 ||
                utils.compareAsc(date, utils.clearHMS(min)) < 0 ||
                utils.compareAsc(date, max) > 0)
        ) {
            isDisabled = true
        }

        if (
            !isDisabled &&
            index === 0 &&
            (utils.compareAsc(date, utils.clearHMS(min)) < 0 || utils.compareAsc(date, max) > 0)
        ) {
            isDisabled = true
        }

        const classList = [
            utils.isSameDay(date, this.today) && 'today',
            current.getMonth() !== date.getMonth() && 'other-month',
            isDisabled && 'disabled',
        ]

        let hoverClass

        const hoverProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {}

        const weekStart = getLocale('startOfWeek')

        const weekEnd = weekStart ? 0 : 6

        if (type === 'week') {
            hoverProps.onMouseEnter = this.handleWeek.bind(this, date)

            hoverProps.onMouseLeave = this.handleWeek.bind(this, null)

            if (
                utils.isSameWeek(date, value, {
                    weekStartsOn: weekStart,
                })
            ) {
                hoverClass = datepickerClass(
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
                hoverClass = datepickerClass(
                    'hover',
                    date.getDay() === weekStart && 'hover-start',
                    date.getDay() === weekEnd && 'hover-end'
                )
            }
        } else if (rangeDate && current.getMonth() === date.getMonth()) {
            hoverProps.onMouseEnter = this.handleDayHover.bind(this, date)

            classList.push(utils.isSameDay(date, rangeDate[index]) && 'active')

            hoverClass = datepickerClass(
                //  选中时间区间内的days 灰色方块hover
                utils.compareAsc(rangeDate[0], date) <= 0 && utils.compareAsc(rangeDate[1], date) >= 0 && 'hover',
                // Datetime Picker range end datetime classname #330
                utils.isSameDay(rangeDate[index], date) && `hover-${index === 0 ? 'start' : 'end'} active`
            )
        } else if (value) {
            classList.push(utils.isSameDay(date, value) && 'active')
        }

        return (
            <div
                key={date.getTime()}
                className={hoverClass}
                onClick={isDisabled ? undefined : this.handleDayClick.bind(this, date, minDate, maxDate)}
                onDoubleClick={isDisabled ? undefined : this.handleDayDoubleClick.bind(this, date)}
                {...hoverProps}
            >
                <span className={datepickerClass(...classList)}>{date.getDate()}</span>
            </div>
        )
    }

    // 渲染HMS组件
    renderTimePicker() {
        const { rangeDate, index, showTimePicker } = this.props

        if (this.props.type !== 'date-time') return undefined

        if (!showTimePicker) return undefined

        let { format } = this.props

        if (/^[T|t]$/.test(format)) {
            format = 'HH:mm:ss'
        } else {
            ;[format] = format.match(/[H|h].*/)
        }

        const value = rangeDate ? utils.toDateWithFormat(rangeDate[index], format) : this.props.value

        if (!value) return undefined

        return (
            <div className={datepickerClass('datetime')}>
                <Time {...this.props} format={format} value={value} onChange={this.handleTimeChange} />
                <span>{utils.format(value, format)}</span>
            </div>
        )
    }

    render() {
        const { current, min, index, max } = this.props

        const { days } = this

        const minDate = min && new Date(utils.format(min, minStr))

        const maxDate = max && new Date(utils.format(max, maxStr))

        return (
            <div className={datepickerClass('day-picker')}>
                <div className={datepickerClass('title')}>{getLocale('pickerTitle')[index]}</div>
                <div className={datepickerClass('header')}>
                    <Icon
                        name="AngleDoubleLeft"
                        disabled={!!(min && current.getFullYear() <= minDate.getFullYear())}
                        onClick={this.handlePrevYear}
                    />
                    <Icon
                        name="AngleLeft"
                        disabled={!!(min && utils.compareMonth(current, minDate) <= 0)}
                        onClick={this.handlePrevMonth}
                    />

                    <span className={datepickerClass('ym')}>
                        <span onClick={this.handleYearModeChange}>{current.getFullYear()}</span>
                        <span onClick={this.handleMonthModeChange}>
                            {getLocale('monthValues.short')[current.getMonth()]}
                        </span>
                    </span>

                    <Icon name="AngleRight" onClick={this.handleNextMonth} />
                    <Icon onClick={this.handleNextYear} name="AngleDoubleRight" />
                </div>

                <div className={datepickerClass('week')}>
                    {getLocale('weekdayValues.narrow').map(w => (
                        <span key={w}>{w}</span>
                    ))}
                </div>

                <div className={datepickerClass('list')}>{days.map(d => this.renderDay(d, minDate, maxDate))}</div>

                <div style={{ flex: 1 }} />

                {this.renderTimePicker()}
            </div>
        )
    }
}

export default Day
