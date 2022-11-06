/**
 * cn - 格式化结果
 *    -- 设置format prop进行格式化结果
 * en - Format result
 *    -- Set format prop to format the results
 */

import React, { useState } from 'react'
import { ColorPicker, Select } from 'ethan-ui'

export default function () {
    const [color, updateColor] = useState('#3F51B5')

    const [format, updateFormat] = useState<'rgba' | 'hex' | 'hsla'>('hex')

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <ColorPicker.ColorBoard value={color} format={format} onChange={updateColor} />
            </div>

            <div style={{ marginLeft: 10 }}>
                <Select style={{ width: 280 }} value={format} data={['rgba', 'hex', 'hsla']} onChange={updateFormat} />

                <pre style={{ marginTop: 10, padding: '5px', fontSize: '14px', width: 280, background: color }}>
                    color: <strong>{color}</strong>
                </pre>
            </div>
        </div>
    )
}
