/**
 * cn - 色版
 *    -- 使用ColorBoard组件单独显示色板
 * en - ColorBoard
 *    -- Display ColorBoard separately
 */

import React, { useCallback } from 'react'
import { ColorPicker } from 'ethan-ui'

const style = { marginRight: 20, display: 'inline-block' }

export default function () {
    const handleChange = useCallback(console.log, [])

    return (
        <>
            <ColorPicker.ColorBoard defaultValue="#C940C6" mode onChange={handleChange} style={style} />

            <ColorPicker.ColorBoard defaultValue="#7E3C54" mode="hsla" onChange={handleChange} style={style} />

            <ColorPicker.ColorBoard defaultValue="#517B3B" mode="hex" onChange={handleChange} style={style} />
        </>
    )
}
