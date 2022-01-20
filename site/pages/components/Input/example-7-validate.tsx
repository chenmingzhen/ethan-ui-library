/**
 * cn - 校验
 *    -- 设置了 rules，会自动校验输入数据，设置了 popover 会在指定位置弹出
 *    -- 如果没有设置 popover，不会弹出错误提示。
 *    -- 有错误时，提示框不会隐藏。
 * en - Validate
 *    -- When the rules property is set, it will automatically verify the input data. When the popover property is set, it will pop up at the specified location.
 *    -- If the popover property is not set, no error message will pop up.
 *    -- If input is invalid, the message will not be hidden.
 */
import React from 'react'
import { Input, Rule } from 'ethan/index'

const rules = new Rule([
    {
        required: true,
    },
    // {
    //     validator(v, f, cb) {
    //         console.log(v)

    //         if (v) {
    //             cb(new Error('错误'))
    //         } else {
    //             cb(true)
    //         }
    //     },
    // },
])

export default function() {
    return (
        <Input
            placeholder="email"
            rules={[rules.validator, rules.required]}
            tip="Email, required"
            popover="top-left"
            width={300}
        />
    )
}
