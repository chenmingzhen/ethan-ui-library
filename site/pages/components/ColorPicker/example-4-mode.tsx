/**
 * cn - 模式
 *    -- ColorPicker提供三种模式(rgba,hsla,hex)切换
 * en - Mode
 *    -- ColorPicker provides three modes (rgba,hsla,hex) toggle
 */

import React from 'react'
import { ColorPicker } from 'ethan-ui'

export default function () {
    return (
        <>
            <ColorPicker mode="hex" defaultValue="#004dcf" />
        </>
    )
}
