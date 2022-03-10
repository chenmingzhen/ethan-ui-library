/**
 * cn - 大小
 *    -- 通过 size 属性可以设置大小
 * en - Size
 *    -- Set the size through the size property.
 */
import React from 'react'
import { Rate, FontAwesome } from 'ethan'

const star = <FontAwesome name="star" />

export default function() {
    return (
        <div>
            <Rate size={8} background={star} front={star} />
            <br />
            <Rate size={20} background={star} front={star} />
            <br />
            <Rate size={40} background={star} front={star} />
        </div>
    )
}
