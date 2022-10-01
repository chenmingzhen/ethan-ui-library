/**
 * cn - 样式
 *    -- 通过fontSize,type,style设置样式
 * en - Style
 *    -- Set fontSize,type and style to change Component style
 */
import React from 'react'
import { FontAwesome } from 'ethan-ui'

const margin = { marginRight: 20 }

export default function() {
    return (
        <div>
            <FontAwesome style={margin} name="cab" />
            <FontAwesome style={margin} name="cab" type="info" fontSize={18} />
            <FontAwesome style={margin} name="cab" type="success" fontSize="24px" />
            <FontAwesome style={{ fontSize: 30, color: '#f5222d' }} name="cab" />
        </div>
    )
}
