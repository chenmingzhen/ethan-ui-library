/**
 * cn - 附加文字
 *    -- text 属性可以为每个选项附加文字
 * en - Text
 *    -- Set text property to append text to each item.
 */
import React from 'react'
import { Rate, FontAwesome } from 'ethan'

const star = <FontAwesome name="star" />

export default function() {
    return (
        <Rate
            defaultValue={4}
            text={['poor', 'fair', 'good', 'very good', 'excellent']}
            background={star}
            front={star}
        />
    )
}
