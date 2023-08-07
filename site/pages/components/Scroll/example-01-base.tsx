/**
 * cn - 基本用法
 *    -- 通过 height 属性设置滚动条高度，若不设置则根据父容器高度自适应。
 * en - Base
 *    -- Use height property to set the height of the scrollbar, or if not set, it adapts according to the parent container height.
 */
import React from 'react'
import { Scroll, Alert } from 'ethan-ui'

export default function () {
    return (
        <Scroll style={{ height: 400 }} scroll="y">
            {[...new Array(20).keys()].map((none, index) => (
                <Alert type="info" style={{ textAlign: 'center' }} key={index}>
                    {index}
                </Alert>
            ))}
        </Scroll>
    )
}
