/**
 * cn - 快速选择
 *    -- 可以配置一些快速选择的选项
 * en - Quick select
 *    -- Configure some options for quick selection.
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'
import { addDays } from 'date-fns'

const today = new Date()

export default function () {
    return (
        <DatePicker
            placeholder="Select date"
            quickSelects={[
                { name: 'Today', value: today },
                {
                    name: 'A week later',
                    value: addDays(today, -7),
                },
                {
                    name: 'A month later',
                    value: addDays(today, -30),
                },
            ]}
        />
    )
}
