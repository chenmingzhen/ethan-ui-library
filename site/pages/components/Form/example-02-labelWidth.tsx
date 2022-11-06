/**
 * cn - 标签
 *    -- 通过 labelWidth 和 labelAlign 改变标签宽度和对齐方式
 * en - Label
 *    -- Set labelWidth and labelAlign to change label with and alignment.
 */
import React from 'react'
import { Form, Input } from 'ethan-ui'

export default function () {
    return (
        <Form labelAlign="right" labelWidth={200} style={{ maxWidth: 500 }}>
            <Form.Item label="Email" name="email">
                <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
                <Input type="password" />
            </Form.Item>
        </Form>
    )
}
