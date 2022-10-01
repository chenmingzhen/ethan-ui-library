/**
 * cn - 水平布局
 *    -- 设置 inline 属性使 Form 变为水平布局
 * en - Inline
 *    -- Set the inline property to true to make the Form horizontal.
 */
import React from 'react'
import { Form, Input, Checkbox, Button } from 'ethan-ui'

export default function() {
    return (
        <Form inline onSubmit={console.log}>
            <Form.Item label="Email">
                <Input name="email" />
            </Form.Item>

            <Form.Item name="password">
                <Input placeholder="Password" type="password" />
            </Form.Item>

            <Form.Item name="remember" style={{ verticalAlign: 'middle' }}>
                <Checkbox>Remember</Checkbox>
            </Form.Item>

            <Button htmlType="submit" type="primary">
                Submit
            </Button>
        </Form>
    )
}
