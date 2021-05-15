// @ts-nocheck
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { range } from '@/utils/numbers'
import { datepickerClass } from '@/styles'
import Icon from './Icon'
import utils from './utils'

// 选择年份
const Year = ({ current, onChange, onModeChange, value }) => {
    const handleChange = useCallback(
        year => {
            const date = new Date(current.getTime())

            // 在当前日期设置year
            date.setFullYear(year)

            // 回调date
            onChange(date)

            // 下一个模式
            onModeChange('month')
        },
        [current, onChange, onModeChange]
    )

    // 年份调整;
    const handleRangeChange = useCallback(
        year => {
            onChange(utils.addYears(current, year))
        },
        [current, onChange]
    )

    // 而可选的范围为当前年份的前后7年
    const cy = current.getFullYear() - 7
    const years = range(15, 0).map(i => cy + i)

    return (
        <div className={datepickerClass('year-picker')}>
            <div className={datepickerClass('header')}>
                <Icon name="AngleLeft" onClick={handleRangeChange.bind(null, -15)} />

                <span className={datepickerClass('ym')}>{`${years[0]} ~ ${years[years.length - 1]}`}</span>

                <Icon name="AngleRight" onClick={handleRangeChange.bind(null, 15)} />
            </div>

            <div className={datepickerClass('list')}>
                {years.map(y => (
                    <span
                        key={y}
                        className={datepickerClass(value && value.getFullYear() === y && 'active')}
                        onClick={handleChange.bind(null, y)}
                    >
                        {y}
                    </span>
                ))}
            </div>
        </div>
    )
}

Year.propTypes = {
    current: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onModeChange: PropTypes.func.isRequired,
    value: PropTypes.object,
}

export default Year
