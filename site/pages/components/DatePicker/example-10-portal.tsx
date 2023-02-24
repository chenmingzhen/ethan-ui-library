/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 portal 属性使弹出选项在单独层中渲染。（非必要情况下不建议）
 * en - Portal
 *    -- If the parent container of the pop-up layer is occluded, you can set the portal property to make the pop-up options rendered in a separate layer. (not recommended if not necessary)
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

export default function () {
    return (
        <div style={{ height: 70, overflow: 'hidden' }}>
            <DatePicker placeholder="normal" />

            <DatePicker portal placeholder="portal" style={{ marginLeft: 20 }} />

            <DatePicker.RangePicker portal placeholder="Select date" style={{ marginLeft: 20 }} />
        </div>
    )
}
