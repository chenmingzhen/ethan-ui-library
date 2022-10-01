/**
 * cn - 迷你
 *    -- 迷你的步骤条
 * en - Mini
 *    -- Mini steps
 */

import React from 'react'
import { Steps } from 'ethan-ui'

const Item = Steps.StepItem

export default () => (
    <Steps current={1} mini>
        <Item title="已完成" />
        <Item title="进行中" />
        <Item title="待进行" />
    </Steps>
)
