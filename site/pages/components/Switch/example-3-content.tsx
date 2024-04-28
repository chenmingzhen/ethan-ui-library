/**
 * cn - 内容
 *    -- 为每个状态添加描述
 * en - Base
 *    -- Description for every status.
 */
import React from 'react'
import { Switch, Icon } from 'ethan-ui'

export default function () {
    return (
        <div>
            <Switch defaultChecked content={['开', '关']} />
            <br />
            <Switch content={[<Icon.FontAwesome name="btc" />, <Icon.FontAwesome name="yen" />]} />
        </div>
    )
}
