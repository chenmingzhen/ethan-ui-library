/**
 * cn - 基本用法
 *    -- 简单的步骤条
 * en - Base
 *    -- Simple steps
 */

import React from 'react'
import { Steps } from 'ethan/index'

const Item = Steps.StepItem

export default () => (
  <Steps current="1">
    <Item title="已完成" description="这里是步骤的描述信息" />
    <Item title="进行中" description="这里是步骤的描述信息" />
    <Item title="待进行" description="这里是步骤的描述信息" />
  </Steps>
)
