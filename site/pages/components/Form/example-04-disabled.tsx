/**
 * cn - 禁用
 *    -- 使用 disabled 属性使表单内支持 disabled 属性的组件禁用，通常用在表单数据加载或提交时
 * en - Disabled
 *    -- Use the disabled property to make the Form support to disable component.
 */
import React from 'react'
import { Form, Input, Checkbox, Button } from 'ethan-ui'

export default function () {
    return (
        <Form disabled>
            <Form.Item label="Email" name="email">
                <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
                <Input type="password" />
            </Form.Item>

            <Form.Item label="Age">
                <Input style={{ width: 100 }} name="age" type="number" digits={0} defaultValue={0} />
            </Form.Item>

            <Form.Item label="Favorite Color" name="favoriteColor">
                <Checkbox.Group data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
            </Form.Item>

            <Form.Item label={<></>}>
                <Button loading>Submit</Button>
            </Form.Item>
        </Form>
    )
}
