/**
 * cn - 可输入
 *    -- 设置 inputAble 使日期可输入，输入必须与format一致才有效。
 * en -  Input
 *    -- Set inputAble so that the date can be entered. The input must be consistent with format to be valid.
 */
import React from 'react'
import { DatePicker } from 'ethan-ui'

const style: React.CSSProperties = { marginRight: 12, marginBottom: 10, display: 'block', width: 200 }

export default function () {
    return (
        <>
            <DatePicker
                placeholder="default date format is yyyy-MM-dd"
                inputAble
                clearable
                style={style}
                onFocus={(e) => {
                    console.log('focus:', e)
                }}
                onBlur={(e) => {
                    console.log('blur:', e)
                }}
                onChange={(e) => {
                    console.log('change:', e)
                }}
                portal
            />

            <DatePicker placeholder="custom format yyyy.MM.dd" inputAble clearable style={style} format="yyyy.MM.dd" />
        </>
    )
}
