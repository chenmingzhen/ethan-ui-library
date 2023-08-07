/**
 * cn - 水平滚动
 *    -- 当元素宽度大于滚动条宽度时，会显示横向滚动条。
 * en - Horizontal
 *    -- When the element width is greater than the scrollbar width, the horizontal scrollbar is displayed.
 */
import React from 'react'
import { Scroll } from 'ethan-ui'

const ScrollItem = ({ children }) => (
    <div
        style={{
            display: 'flex',
            width: 100,
            height: 50,
            margin: 10,
            background: '#fef0f0',
            color: '#f56c6c',
            borderRadius: 4,
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        {children}
    </div>
)

export default function () {
    return (
        <Scroll scroll="x">
            <div style={{ display: 'flex' }}>
                {[...new Array(40).keys()].map((none, index) => (
                    <ScrollItem key={index}>{index}</ScrollItem>
                ))}
            </div>
        </Scroll>
    )
}
