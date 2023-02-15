import React from 'react'
import { datePickerClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { DatePickerTimeProps } from './type'
import utils from './utils'
import TimeScroll from './TimeScroll'

class Time extends PureComponent<DatePickerTimeProps> {
    handleHourChange: () => void

    handleMinuteChange: () => void

    handleSecondChange: () => void

    handleAMPMChange: () => void

    defaultValue: Date

    constructor(props) {
        super(props)

        this.defaultValue = this.getDefaultTime()

        this.handleHourChange = this.handleChange.bind(this, 'hour')
        this.handleMinuteChange = this.handleChange.bind(this, 'minute')
        this.handleSecondChange = this.handleChange.bind(this, 'second')
        this.handleAMPMChange = this.handleChange.bind(this, 'ampm')
    }

    handleChange = (type: string, val) => {
        const { disabled, format, min, max, range } = this.props

        const value = this.getValue()

        let mode = type

        if (type === 'hour') {
            if (format.indexOf('h') >= 0) {
                mode = 'h'
            } else {
                mode = 'H'
            }
        }

        const [isDisabled, date] = utils.judgeTimeByRange(val, value, mode, min, max, range, disabled)

        if (isDisabled) return

        this.props.onChange(date, true, false, 'time')
    }

    getDefaultTime = () => {
        let idx = 0

        const current = utils.newDate()

        const { index, defaultTime, format } = this.props

        if (typeof index === 'number') idx = index

        if (!defaultTime[idx]) return current

        return utils.cloneTime(current, defaultTime[idx], format)
    }

    getValue = () => this.props.value || this.defaultValue

    render() {
        const { format, hourStep, minuteStep, secondStep, range, min: mi, max: ma, disabled } = this.props

        const value = this.getValue()

        const className = datePickerClass('time-picker')

        let hours = value.getHours()

        if (format.indexOf('h') >= 0 && hours >= 12) {
            hours -= 12
        }

        const min = utils.resetTimeByFormat(mi && new Date(mi), format)
        const max = utils.resetTimeByFormat(ma && new Date(ma), format)

        return (
            <div className={className}>
                {format.indexOf('H') >= 0 && (
                    <TimeScroll
                        current={value}
                        value={value.getHours()}
                        mode="H"
                        range={range}
                        min={min}
                        max={max}
                        disabled={disabled}
                        total={24}
                        step={hourStep}
                        onChange={this.handleHourChange}
                    />
                )}
                {format.indexOf('h') >= 0 && (
                    <TimeScroll
                        current={value}
                        mode="h"
                        range={range}
                        min={min}
                        max={max}
                        disabled={disabled}
                        value={hours}
                        total={12}
                        step={hourStep}
                        onChange={this.handleHourChange}
                    />
                )}
                {format.indexOf('m') >= 0 && (
                    <TimeScroll
                        current={value}
                        mode="m"
                        range={range}
                        min={min}
                        max={max}
                        disabled={disabled}
                        value={value.getMinutes()}
                        step={minuteStep}
                        onChange={this.handleMinuteChange}
                    />
                )}
                {format.indexOf('s') >= 0 && (
                    <TimeScroll
                        current={value}
                        mode="s"
                        range={range}
                        min={min}
                        max={max}
                        disabled={disabled}
                        value={value.getSeconds()}
                        step={secondStep}
                        onChange={this.handleSecondChange}
                    />
                )}
                {/a|A/.test(format) && (
                    <TimeScroll
                        current={value}
                        mode="ampm"
                        range={range}
                        min={min}
                        max={max}
                        disabled={disabled}
                        value={value.getHours() >= 12 ? 1 : 0}
                        total={2}
                        ampm
                        onChange={this.handleAMPMChange}
                    />
                )}
            </div>
        )
    }
}

export default Time
