/**
 * cn - 颜色
 *    -- 自定义颜色
 * en - Color
 *    -- Custom color
 */

import React from 'react'
import { Badge } from 'ethan-ui'

export default () => (
    <div>
        <Badge count="100" maxCount="99" color="orange">
            <div style={{ width: 50, height: 50, backgroundColor: '#ddd' }} />
        </Badge>
        <Badge dot color="green" style={{ marginLeft: 60 }}>
            <div style={{ width: 50, height: 50, backgroundColor: '#ddd' }} />
        </Badge>
    </div>
)
