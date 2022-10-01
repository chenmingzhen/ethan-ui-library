/**
 * cn - 点
 *    -- 设置为点
 * en - Dot
 *    -- Set to the dot
 */

import React from 'react'
import { Badge } from 'ethan-ui'

export default () => (
    <div>
        <Badge dot>
            <div style={{ width: 50, height: 50, backgroundColor: '#ddd' }} />
        </Badge>
        <Badge dot style={{ marginLeft: '20px' }}>
            <a href="#">link</a>
        </Badge>
    </div>
)
