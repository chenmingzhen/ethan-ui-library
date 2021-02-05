import React from 'react'
import Steps from '@/component/Steps'
import { FontAwesome } from '@/component/Icon'

const Item = Steps.StepItem

export default () => (
  <div style={{ margin: '20px' }}>
    <Steps current="1">
      <Item title="已完成" description="这里是步骤的描述信息" icon={<FontAwesome name="angle-double-right" />} />
      <Item title="进行中" description="这里是步骤的描述信息" icon={<FontAwesome name="hand-o-right" />} />
      <Item title="待进行" description="这里是步骤的描述信息" icon={<FontAwesome name="long-arrow-right" />} />
    </Steps>
  </div>
)
