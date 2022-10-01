/**
 * cn - 数字隐藏
 *    -- 数字模式超出隐藏
 * en - Overflow
 *    -- Digital mode beyond hidden
 */

import React from 'react'
import { Badge } from 'ethan-ui'

export default () => (
    <div>
        <Badge count="100" maxCount="99">
            <div style={{ width: 50, height: 50, backgroundColor: '#ddd' }} />
        </Badge>
        <Badge count="1000" maxCount="999" style={{ marginLeft: 60 }}>
            <div style={{ width: 50, height: 50, backgroundColor: '#ddd' }} />
        </Badge>
    </div>
)
