/**
 * cn - 基本用法
 *    -- Rate 为一个函数，创建一个指定图标或文字的 Rate 组件，供多处复用。
 * en - Base
 *    -- Rate is a function that creates a new custom Rate component that specifies an icon or text.
 */
import React from 'react'
import { Rate, FontAwesome } from 'ethan-ui'

const star = <FontAwesome name="star" />

export default function() {
    return <Rate background={star} front={star} />
}
