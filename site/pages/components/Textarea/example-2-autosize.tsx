/**
 * cn - 自适应高度
 *    -- autoSize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可
 * en - AutoSize
 *    -- When the autoSize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.
 */
import React from 'react'
import { Textarea } from 'ethan-ui'

const text = `a
u
t
o
s
i
z
e`

export default function () {
    return (
        <div>
            <Textarea rows={2} autoSize maxHeight={200} placeholder="autoSize" />
            <br />
            <Textarea rows={2} autoSize value={text} maxHeight={200} placeholder="autoSize" />
        </div>
    )
}
