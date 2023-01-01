/**
 * cn - 前缀和后缀
 *    -- 在输入框上添加前缀或后缀图标。
 * en - Prefix and suffix
 *    -- Add a prefix or suffix icon to the input.
 */
import React from 'react'
import { FontAwesome, Input } from 'ethan-ui'

export default function () {
    return (
        <>
            <Input style={{ width: '300px' }} prefix={<FontAwesome name="jpy" />} suffix="RMB" size="small" />
            <br />
            <Input
                style={{ width: '300px', marginTop: '10px' }}
                prefix={<FontAwesome name="jpy" />}
                suffix="RMB"
                size="default"
            />
            <br />
            <Input
                disabled
                style={{ width: '300px', marginTop: '10px' }}
                prefix={<FontAwesome name="jpy" />}
                suffix="RMB"
                size="large"
            />
        </>
    )
}
