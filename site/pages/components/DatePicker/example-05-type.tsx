/**
 * cn - 类型
 *    -- 选择时间的类型
 * en - Type
 *    -- Select the type of time
 */
import React from 'react'
import { DatePicker } from 'ethan-ui'

const style: React.CSSProperties = { marginRight: 12, marginBottom: 10, display: 'block' }

export default function () {
    return (
        <div>
            <DatePicker type="date" placeholder="Select date" style={style} onChange={console.log} />
            <DatePicker type="date-time" placeholder="Select date-time" style={style} onChange={console.log} />
            <DatePicker type="month" placeholder="Select month" style={style} onChange={console.log} />
            <DatePicker type="week" placeholder="Select week" style={style} onChange={console.log} />
            <DatePicker type="year" placeholder="Select year" style={style} onChange={console.log} />

            <DatePicker.RangePicker
                type="date"
                style={style}
                onChange={console.log}
                placeholder={['Select start date', 'Select end date']}
            />
            <DatePicker.RangePicker
                type="date-time"
                style={style}
                onChange={console.log}
                placeholder={['Select start date-time', 'Select end date-time']}
            />
            <DatePicker.RangePicker
                type="month"
                style={style}
                onChange={console.log}
                placeholder={['Select start month', 'Select end month']}
            />
            <DatePicker.RangePicker
                type="week"
                style={style}
                onChange={console.log}
                placeholder={['start week', 'end week']}
            />
            <DatePicker.RangePicker
                type="year"
                style={style}
                onChange={console.log}
                placeholder={['start year', 'end year']}
            />
        </div>
    )
}
