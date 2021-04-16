import React from 'react'
import Steps from '@/component/Steps'

const Item = Steps.StepItem

export default () => (
  <div>
    <Steps current="1" mini>
      <Item title="已完成" />
      <Item title="进行中" />
      <Item title="待进行" />
    </Steps>
  </div>
)
