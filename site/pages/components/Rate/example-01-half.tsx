/**
 * cn - 半星
 *    -- Rate 是否允许半星。
 * en - Semi selection
 *    -- Rate whether to allow semi selection.
 */
import React from 'react'
import { Rate, Icon } from 'ethan-ui'

const star = <Icon.FontAwesome name="star" />

export default function () {
    return <Rate size={24} allowHalf background={star} front={star} />
}
