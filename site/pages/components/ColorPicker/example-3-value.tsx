/**
 * cn - 基本用法
 *    -- 基本的使用
 * en - Base
 *    -- Basic usage
 */

import React, { useCallback, useState } from 'react'
import { Input } from 'ethan-ui'
import { ColorPicker } from 'ethan-ui'

export default function() {
    const [color, updateColor] = useState('red')

    const handleChange = useCallback(c => {
        console.log('onChange:', c)

        // updateColor(c)
    }, [])

    return (
        <div>
            <ColorPicker value={color} onChange={handleChange} format="hsla" showMode />

            <Input
                placeholder="Input the color"
                value={color}
                onChange={handleChange}
                width={200}
                style={{ display: 'block' }}
            />
        </div>
    )
}
