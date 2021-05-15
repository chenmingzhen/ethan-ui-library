// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '@/styles'
import { getLocale } from '@/locale'
import { PureComponent } from '@/utils/component'
import utils from './utils'
import Icon from './Icon'
import Time from './Time'

const minStr = 'yyyy-MM-dd 00:00:00'
const maxStr = 'yyyy-MM-dd 23:59:59'

class Day extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            hover: null,
        }

        this.handleNextMonth = this.handleMonth.bind(this, 1)
        this.handlePrevMonth = this.handleMonth.bind(this, -1)
        this.handleNextYear = this.handleMonth.bind(this, 12)
        this.handlePrevYear = this.handleMonth.bind(this, -12)
        this.handleMonthMode = this.handleModeChange.bind(this, 'month')
        this.handleYearMode = this.handleModeChange.bind(this, 'year')
        this.handleWeekLeave = this.handleWeek.bind(this, null)
        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.formatWithDefaultTime = this.formatWithDefaultTime.bind(this)
    }

    // 获取Day的数组
    getDays() {
        const { current } = this.props

        if (!current) return this.cachedDays
        const date = utils.clearHMS(current)
        if (this.cachedDate && utils.isSameMonth(this.cachedDate, date) && this.cachedDays) {
            return this.cachedDays
        }
        this.cachedDays = utils.getDaysOfMonth(date)
        this.cachedDate = date

        return this.cachedDays
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

    // type week 模式 滑进或滑出
    handleWeek(hover) {
        this.setState({ hover })
    }

    // 点击double箭头 处理月份的变化
    handleMonth(month) {
        const { current, onChange } = this.props

        onChange(utils.addMonths(current, month))
    }

    handleModeChange(mode) {
        this.props.onModeChange(mode)
    }

    handleDayHover(date) {
        this.props.onDayHover(date)
    }

    // 渲染day
    renderDay(date, minD, maxD) {
        const { current, disabled, value, index, type, rangeDate, range, rangeTemp, min, max } = this.props
        const { hover } = this.state
        const hmsDate = new Date(date)

        utils.setTime(hmsDate, current)
        let isDisabled = disabled ? disabled(date) : false

        // only for single, single picker don't has index
        if (index === undefined && !isDisabled) {
            if ((minD && utils.compareAsc(date, minD) < 0) || (maxD && utils.compareAsc(date, maxD) > 0))
                isDisabled = true
        }
        if (!isDisabled && index === 1) {
            if (
                (typeof range === 'number' && utils.compareAsc(date, utils.addSeconds(rangeTemp, range)) > 0) ||
                utils.compareAsc(date, utils.clearHMS(rangeTemp)) < 0 ||
                utils.compareAsc(date, utils.clearHMS(min)) < 0 ||
                utils.compareAsc(date, max) > 0
            ) {
                isDisabled = true
            }
        }

        if (!isDisabled && index === 0) {
            if (utils.compareAsc(date, utils.clearHMS(min)) < 0 || utils.compareAsc(date, max) > 0) {
                isDisabled = true
            }
        }

        const classList = [
            utils.isSameDay(date, this.today) && 'today',
            // 其他月份的日期 灰色显示
            current.getMonth() !== date.getMonth() && 'other-month',
            isDisabled && 'disabled',
        ]

        let hoverClass
        const hoverProps = {}
        const weekStart = getLocale('startOfWeek')
        const weekEnd = weekStart ? 0 : 6

        if (type === 'week') {
            hoverProps.onMouseEnter = this.handleWeek.bind(this, date)
            hoverProps.onMouseLeave = this.handleWeekLeave
            if (
                utils.isSameWeek(date, value, {
                    weekStartsOn: weekStart,
                })
            ) {
                hoverClass = datepickerClass(
                    'active',
                    // week模式下 选中后 左右点
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
                    // hover下classname
                    date.getDay() === weekStart && 'hover-start',
                    date.getDay() === weekEnd && 'hover-end'
                )
            }
        }
        // range 模式
        else if (rangeDate && current.getMonth() === date.getMonth()) {
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
                onClick={isDisabled ? undefined : this.handleDayClick.bind(this, date, minD, maxD)}
                onDoubleClick={isDisabled ? undefined : this.handleDayDoubleClick.bind(this, date)}
                {...hoverProps}
            >
                <span className={datepickerClass(...classList)}>{date.getDate()}</span>
            </div>
        )
    }

    // 渲染HMS组件
    renderTimepicker() {
        const { rangeDate, index, showTimePicker } = this.props
        if (this.props.type !== 'datetime') return undefined
        if (!showTimePicker) return undefined

        let { format } = this.props
        if (/^[T|t]$/.test(format)) {
            format = 'HH:mm:ss'
        } else {
            const match = format.match(/[H|h].*/)
            // eslint-disable-next-line
      if (match) format = match[0]
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
        const days = this.getDays()

        this.today = utils.newDate()

        // 最小日期
        const minDate = min && new Date(utils.format(min, minStr, new Date()))
        // 最大日期
        const maxDate = max && new Date(utils.format(max, maxStr, new Date()))

        return (
            <div className={datepickerClass('day-picker')}>
                <div className={datepickerClass('title')}>{getLocale('pickerTitle')[index]}</div>
                <div className={datepickerClass('header')}>
                    <Icon
                        name="AngleDoubleLeft"
                        disabled={!!(min && current.getFullYear() <= min.getFullYear())}
                        onClick={this.handlePrevYear}
                    />
                    <Icon
                        name="AngleLeft"
                        disabled={!!(min && utils.compareMonth(current, min) <= 0)}
                        onClick={this.handlePrevMonth}
                    />

                    <span className={datepickerClass('ym')}>
                        <span onClick={this.handleYearMode}>{current.getFullYear()}</span>
                        <span onClick={this.handleMonthMode}>{getLocale('monthValues.short')[current.getMonth()]}</span>
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

                {this.renderTimepicker()}
            </div>
        )
    }
}

Day.propTypes = {
    current: PropTypes.object.isRequired,
    disabled: PropTypes.func,
    format: PropTypes.string,
    index: PropTypes.number,
    max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onChange: PropTypes.func.isRequired,
    onChangeSync: PropTypes.func,
    onDayHover: PropTypes.func,
    onModeChange: PropTypes.func.isRequired,
    range: PropTypes.number,
    rangeDate: PropTypes.array,
    rangeTemp: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    showTimePicker: PropTypes.bool,
    type: PropTypes.string.isRequired,
    value: PropTypes.object,
    defaultTime: PropTypes.array,
    allowSingle: PropTypes.bool,
}

export default Day
