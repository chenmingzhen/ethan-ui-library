/**
 * cn - 图标
 *    -- 自定义图标内容
 * en - Icon
 *    -- Customize the icon content
 */

import React from 'react'
import { FontAwesome, TimeLine } from 'ethan/index'

const { Item } = TimeLine

export default () => (
  <TimeLine>
    <Item icon={<FontAwesome name="car" />}>Create</Item>
    <Item icon={<FontAwesome name="feed" />}>Text</Item>
    <Item icon={<FontAwesome name="gear" />}>Publish</Item>
  </TimeLine>
)
