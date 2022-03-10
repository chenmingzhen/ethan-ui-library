/**
 * cn - 颜色
 *    -- 在创建组件时设置颜色
 * en - Icon color
 *    -- Set the color when the component is created.
 */
import React from 'react'
import { Rate, FontAwesome } from 'ethan'

const heartBg = <FontAwesome name="heart-o" />
const heart = <FontAwesome name="heart" style={{ color: '#ff4d4f' }} />

export default function() {
    return <Rate defaultValue={2} background={heartBg} front={heart} />
}
