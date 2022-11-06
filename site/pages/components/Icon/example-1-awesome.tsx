/**
 * cn - 基本用法
 *    -- 基本用法
 * en - Base
 *    -- Base
 */
import React from 'react'
import { Icon } from 'ethan-ui'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')
const margin = { marginRight: 20 }

export default function () {
    return (
        <div>
            <FontAwesome style={margin} name="camera-retro" />
            <FontAwesome style={margin} name="camera-retro" type="info" />
            <FontAwesome style={margin} name="camera-retro" type="success" />
            <FontAwesome style={margin} name="camera-retro" type="danger" />
        </div>
    )
}
