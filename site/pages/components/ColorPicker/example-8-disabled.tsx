/**
 * cn - 禁用
 *    -- 设置 disabled 属性禁用组件
 * en - Disabled
 *    -- Set the disabled property to disable the component.
 */

import React from 'react'
import { ColorPicker } from 'ethan-ui'

export default function() {
    return (
        <div style={{ display: 'flex' }}>
            <ColorPicker disabled defaultValue="#23B613" />

            <ColorPicker.ColorBoard disabled defaultValue="#23B613" mode style={{ marginLeft: 20 }} />
        </div>
    )
}
