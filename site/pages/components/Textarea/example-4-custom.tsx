/**
 * cn - 自定义信息
 *    -- 可以通过设置 tip 为函数去自定义提示信息
 *     -- 如果 info 返回类型为 Error，不会隐藏。
 * en - Custom Info
 *    -- can customize the tip by setting info as a function
 *    -- if the functio return an Error , the info doesn't hide
 */
import React from 'react'
import { Textarea } from 'ethan-ui'

const renderInfo = (value) => {
    if (!value || value.length === 0) return null

    const text = `total is  ${value.length}`

    if (value.length <= 20) return text

    return <span style={{ color: 'red' }}>{text}</span>
}

export default function () {
    return <Textarea rows={4} trim placeholder="input something" tip={renderInfo} />
}
