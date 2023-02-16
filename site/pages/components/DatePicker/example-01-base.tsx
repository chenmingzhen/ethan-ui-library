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
                type="date-time"
                onChange={console.log}
                clearable
                format="yyyy年-MM月-dd日 HH时"
                defaultValue={new Date('2023-01-05')}
            />
        </>
    )
}
