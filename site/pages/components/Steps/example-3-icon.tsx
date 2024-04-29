/**
 * cn - 图标
 *    -- 自定义图标
 * en - Icon
 *    -- Custom Icon
 */

import React from 'react'
import { Icon, Steps } from 'ethan-ui'

const Item = Steps.StepItem

export default () => (
    <Steps current="1">
        <Item title="已完成" description="这里是步骤的描述信息" icon={<Icon.FontAwesome name="angle-double-right" />} />
        <Item title="进行中" description="这里是步骤的描述信息" icon={<Icon.FontAwesome name="hand-o-right" />} />
        <Item title="待进行" description="这里是步骤的描述信息" icon={<Icon.FontAwesome name="long-arrow-right" />} />
    </Steps>
)
