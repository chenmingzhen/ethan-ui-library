/**
 * cn - 样式
 *    -- 改变Tooltip颜色风格和样式
 * en - Style
 *    -- Change Tooltip color style and styles.
 */
import React from 'react'
import { Tooltip } from 'ethan-ui'

const colors = ['red', 'orange', 'cyan', 'green', 'blue', 'purple']

export default function () {
    return (
        <div>
            {colors.map((color) => (
                <Tooltip
                    tip="Some text."
                    trigger="hover"
                    key={color}
                    color={color}
                    style={{ fontSize: 15, fontWeight: 'bold' }}
                >
                    <span
                        style={{
                            borderBottom: `solid 1px ${color}`,
                            paddingBottom: 2,
                            margin: '0 15px',
                            cursor: 'pointer',
                        }}
                    >
                        {color}
                    </span>
                </Tooltip>
            ))}
        </div>
    )
}
