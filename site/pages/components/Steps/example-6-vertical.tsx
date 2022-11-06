/**
 * cn - 垂直
 *    -- 设置 vertical 属性，修改组件为垂直方向
 * en - Vertical
 *    -- Set the vertical property to change the component vertical.
 */

import React from 'react'
import { FontAwesome, Steps } from 'ethan-ui'

const Item = Steps.StepItem

const Example = () => {
    const [current, setCurrent] = React.useState(0)

    const setSteps = (index) => setCurrent(index)

    return (
        <Steps current={current} vertical>
            <Item title="步骤1" onClick={setSteps} />
            <Item title="步骤2" onClick={setSteps} />
            <Item title="步骤3" onClick={setSteps} />
            <Item title="步骤4" onClick={setSteps} />
        </Steps>
    )
}

export default () => (
    <div style={{ display: 'flex' }}>
        <Steps current="1" vertical>
            <Item title="已完成" description="这里是步骤的描述信息" />
            <Item title="进行中" description="这里是步骤的描述信息" />
            <Item title="待进行" description="这里是步骤的描述信息" />
        </Steps>

        <Steps current={1} vertical mini>
            <Item title="已完成" />
            <Item title="进行中" />
            <Item title="待进行" />
        </Steps>

        <Steps current="1" vertical>
            <Item title="已完成" description="这里是步骤的描述信息" icon={<FontAwesome name="angle-double-right" />} />
            <Item title="进行中" description="这里是步骤的描述信息" icon={<FontAwesome name="hand-o-right" />} />
            <Item title="待进行" description="这里是步骤的描述信息" icon={<FontAwesome name="long-arrow-right" />} />
        </Steps>

        <Steps current="1" vertical status="error" style={{ height: '500px' }}>
            <Item title="已完成" description="这里是步骤的描述信息" />
            <Item title="进行中" description="这里是步骤的描述信息" />
            <Item title="待进行" description="这里是步骤的描述信息" />
        </Steps>

        <Example />
    </div>
)
