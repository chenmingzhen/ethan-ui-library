import React from 'react'
import Steps from '@/component/Steps'

const Item = Steps.StepItem

export default () => (
  <div style={{ margin: '20px' }}>
    <Steps current="1">
      <Item title="已完成" description="这里是步骤的描述信息" />
      <Item title="进行中" description="这里是步骤的描述信息" />
      <Item title="待进行" description="这里是步骤的描述信息" />
    </Steps>
  </div>
)