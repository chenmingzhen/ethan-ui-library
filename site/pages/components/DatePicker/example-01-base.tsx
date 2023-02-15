/**
 * cn - 基本用法
 *    -- 基本的使用
 * en - Base
 *    -- Basic usage
 */

import React from 'react'
import { DatePicker2 } from 'ethan-ui'

export default function () {
    return (
        <>
            <DatePicker2
                onChange={console.log}
                format="格式化的值:yyyy年-MM月-dd天"
                portal
                onFocus={() => {
                    console.log('focus')
                }}
                onBlur={() => {
                    console.log('blur')
                }}
                clearable
            />
        </>
    )
}
