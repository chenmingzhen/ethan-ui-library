/**
 * cn - 只读
 *    -- 设置 disabled 标示为只读，只读状态下，value可以传入小数
 * en - Disabled
 *    -- Set disabled to true make it be read-only. When disabled, value can be passed in decimals.
 */
import React from 'react'
import { Rate, FontAwesome } from 'ethan-ui'

const star = <FontAwesome name="star" />

export default function () {
    return <Rate value={3.6} disabled background={star} front={star} />
}
