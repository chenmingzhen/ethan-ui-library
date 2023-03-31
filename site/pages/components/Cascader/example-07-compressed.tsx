/**
 * cn - 合并结果显示
 *    -- 将选中值合并显示,输入框响应式变化
 * en - Compressed
 *    -- The selected values are displayed in combination, and the input box changes in response.
 */
import React from 'react'
import { Cascader } from 'ethan-ui'
import { cascader as data } from 'doc/data/tree'

export default function () {
    return <Cascader data={data} labelKey="text" valueKey="id" multiple compressed />
}
