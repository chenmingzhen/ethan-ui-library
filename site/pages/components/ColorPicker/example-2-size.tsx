/**
 * cn - 大小
 *    -- 提供了三种大小的颜色选择器，small、default、large
 * en - Size
 *    -- Three sizes of color pickers are provided, small, default, and large
 */

import React from 'react'
import { ColorPicker } from 'ethan-ui'

export default function () {
    return (
        <>
            <ColorPicker defaultValue="#795548" size="small" style={{ marginRight: 10 }} showIcon={false} />

            <ColorPicker defaultValue="#CDDC39" size="default" style={{ marginRight: 10 }} showIcon={false} />

            <ColorPicker defaultValue="#E91E63" size="large" showIcon={false} />
        </>
    )
}
