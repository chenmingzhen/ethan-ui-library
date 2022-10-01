/**
 * cn - 最大值
 *    -- 通过 max 属性设置选项最大值，默认为 5
 * en - Max
 *    -- Set the maximum value of the option through the max attribute. The default value is 5.
 */
import React from 'react'
import { Rate, FontAwesome } from 'ethan-ui'

const star = <FontAwesome name="star" />

export default function() {
    return <Rate max={10} defaultValue={3} background={star} front={star} />
}
