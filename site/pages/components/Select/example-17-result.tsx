/**
 * cn - 自定义结果
 *    --  使用 renderResult 去自定义选中的结果。
 * en -  result
 *    --  use renderResult. to format the result
 */
import React from 'react'
import { Select } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
    return <Select renderResult={(c) => `I love ${c}`} style={{ width: 240 }} data={data} defaultValue="" />
}
