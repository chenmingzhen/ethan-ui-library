import React from 'react'
import TimeLine from '@/component/TimeLine'
import { FontAwesome } from '@/component/Icon'

const { Item } = TimeLine

export default () => (
  <div style={{ margin: 50 }}>
    <div>
      <TimeLine>
        <Item>发布1.0版本</Item>
        <Item>发布1.0版本</Item>
        <Item>发布1.0版本</Item>
      </TimeLine>
    </div>
    <div>
      <TimeLine>
        <Item icon={<FontAwesome name="car" />}>发布1.0版本</Item>
        <Item icon={<FontAwesome name="feed" />}>发布1.0版本</Item>
        <Item icon={<FontAwesome name="gear" />}>发布1.0版本</Item>
      </TimeLine>
    </div>
    <div>
      <TimeLine>
        <Item icon={<FontAwesome name="car" />}>发布1.0版本</Item>
        <Item>发布1.0版本</Item>
        <Item>发布1.0版本</Item>
        <div>error</div>
      </TimeLine>
    </div>
  </div>
)
