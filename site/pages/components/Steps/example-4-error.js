/**
 * cn - 错误
 *    -- 步骤出现错误
 * en - Error
 *    -- Error in steps
 */

import React from 'react'
import { Steps } from 'ethan/index'

const Item = Steps.StepItem

export default () => (
  <Steps current="1" status="error">
    <Item title="已完成" description="这里是步骤的描述信息" />
    <Item title="进行中" description="这里是步骤的描述信息" />
    <Item title="待进行" description="这里是步骤的描述信息" />
  </Steps>
)
