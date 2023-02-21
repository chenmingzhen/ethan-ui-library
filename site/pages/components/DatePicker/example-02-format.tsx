/**
 * cn - 格式化
 *    -- 使用 format 属性，可以自定义日期显示格式，如果包含特殊字符（英文子母）,可以使用两个单引号字符 (') 进行转义.<a target="_blank" href="https://date-fns.org/v2.29.3/docs/format">文档</>
 * en - Format
 *    -- Using the format prop, you can customize the date display format.If it contains special characters (English parenthetics), you can use two single quote characters (') to escape.<a target="_blank" href="https://date-fns.org/v2.29.3/docs/format">docs</>
 */

import React, { useState } from 'react'
import { DatePicker, Input } from 'ethan-ui'

export default function () {
    const [format, updateFormat] = useState('MM/dd/yyyy')
    return (
        <div>
            <DatePicker defaultValue={new Date('2012-12-31')} format={format} />

            <Input value={format} onChange={updateFormat} style={{ marginLeft: 10, width: 200 }} />
        </div>
    )
}
