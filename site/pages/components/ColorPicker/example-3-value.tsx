/**
 * cn - 受控
 *    -- 设置value属性使组件受控
 * en - Control
 *    -- Set the value prop to bring the component under control
 */

import React, { useCallback, useState } from 'react'
import { Input } from 'ethan-ui'
import { ColorPicker } from 'ethan-ui'

export default function() {
    const [color, updateColor] = useState('red')

    const handleChange = useCallback(c => {
        console.log('onChange:', c)

        updateColor(c)
    }, [])

    return (
        <div>
            <ColorPicker value={color} />

            <ColorPicker value={color} onChange={handleChange} style={{ marginLeft: 20 }} />

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
