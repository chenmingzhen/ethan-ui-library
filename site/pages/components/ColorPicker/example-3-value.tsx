/**
 * cn - 基本用法
 *    -- 基本的使用
 * en - Base
 *    -- Basic usage
 */

import React, { useCallback, useState } from 'react'
import { ColorPicker, Select } from 'ethan-ui'

export default function() {
    const [color, updateColor] = useState('red')

    const handleChange = useCallback(c => {
        console.log('onChange:', c)

        updateColor(c)
    }, [])

    return (
        <div>
            <ColorPicker value={color} onChange={handleChange} format="hsla" />

            <Select<string>
                defaultValue="red"
                data={[
                    'red',
                    'aliceblue',
                    'antiquewhite',
                    'aqua',
                    'aquamarine',
                    'azure',
                    'beige',
                    'bisque',
                    'black',
                    'blanchedalmond',
                    'blue',
                    'blueviolet',
                    'brown',
                    'burlywood',
                    'cadetblue',
                ]}
                style={{ marginTop: 10, width: 150, display: 'block' }}
                placeholder="change color"
                onChange={updateColor}
            />
        </div>
    )
}
