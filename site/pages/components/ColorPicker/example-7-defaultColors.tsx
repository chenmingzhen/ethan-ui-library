/**
 * cn - 默认颜色
 *    -- 设置defaultColors prop定义默认的颜色盘
 * en - Default Colors
 *    -- Set defaultColors prop to update the default color panel
 */

import React from 'react'
import { ColorPicker } from 'ethan-ui'

const rgb = []

for (let i = 0; i < 50; i++) {
    const arr = []

    for (let j = 0; j < 3; j++) {
        arr.push(Math.floor(Math.random() * 255))
    }

    rgb.push(arr)
}

const defaultColors = rgb.map((group) => `rgb(${group.join(',')})`)

export default function () {
    return <ColorPicker.ColorBoard defaultColors={defaultColors} defaultValue="#FFC107" />
}
