/**
 * cn - 图标
 *    -- 自定义图标内容
 * en - Icon
 *    -- Customize the icon content
 */

import React from 'react'
import { Icon, TimeLine } from 'ethan-ui'

const { Item } = TimeLine

export default () => (
    <TimeLine>
        <Item icon={<Icon.FontAwesome name="car" />}>Create</Item>
        <Item icon={<Icon.FontAwesome name="feed" />}>Text</Item>
        <Item icon={<Icon.FontAwesome name="gear" />}>Publish</Item>
    </TimeLine>
)
