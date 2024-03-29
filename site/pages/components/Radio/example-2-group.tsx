/**
 * cn -
 *    -- 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。
 * en -
 *    -- A series of radios group by Radio.Group.
 */
import React from 'react'
import { Radio } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
    return (
        <Radio.Group defaultValue="yellow">
            {data.map((d) => (
                <Radio key={d} value={d}>
                    {d}
                </Radio>
            ))}
        </Radio.Group>
    )
}
