/**
 * cn - 可输入
 *    -- 设置 inputAble 使日期可输入，输入必须与format一致才有效。
 * en -  Input
 *    -- Set inputAble so that the date can be entered. The input must be consistent with format to be valid.
 */
import React from 'react'
import { DatePicker } from 'ethan-ui'
import { addDays } from 'date-fns'

const style: React.CSSProperties = { marginRight: 12, marginBottom: 10, display: 'block', width: 200 }

const today = new Date()
const tomorrow = addDays(today, 1)

export default function () {
    return (
        <div>
            <DatePicker
                placeholder="default date format is yyyy-MM-dd"
                inputAble
                clearable
                style={style}
                defaultValue={today}
                onChange={console.log}
            />

            <DatePicker
                placeholder="custom format yyyy.MM.dd"
                inputAble
                clearable
                style={style}
                format="yyyy.MM.dd"
                defaultValue={today}
                onChange={console.log}
            />

            <DatePicker.RangePicker
                inputAble
                clearable
                style={{ marginRight: 12, marginBottom: 10, display: 'block' }}
                defaultValue={[today, tomorrow]}
                onChange={console.log}
            />
        </div>
    )
}
