/**
 * cn - 信息
 *    -- 设置 showCount, 设定最大长度，用户 focus 时会显示用户已输入文字长度。
 * en - Info
 *    -- Set showCount to true, set the maximum length, and the user's focus shows the length of text that the user has entered.
 */
import React from 'react'
import { Textarea } from 'ethan-ui'

export default function () {
    return <Textarea rows={4} trim placeholder="input something" showCount maxLength={10} />
}
