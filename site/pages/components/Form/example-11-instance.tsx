/**
 * cn - 表单实例
 *    -- 获取表单实例,通过表单实例去操作表单的一些方法, 包含校验, 提交等.(函数组件)
 * en - Form instance
 *    -- Get Form component instance.
 *    -- And then use the form instance to operate some methods of the form, including validate, submit, etc(Function component)
 */
import React from 'react'
import { Button, Form, Input } from 'ethan'

interface FormValues {
    name: string
}

export default function App() {
    const form = Form.useForm<FormValues>()

    return (
        <Form
            form={form}
            onSubmit={data => {
                console.log('onSubmit:', data)
            }}
        >
            <div style={{ margin: '20px 0' }}>
                <Button onClick={() => console.log(form.getValue())}>get value</Button>
                <Button onClick={() => form.validateForm()}>validateForm</Button>
                <Button onClick={() => form.submit()}>submit</Button>
                <Button onClick={() => form.reset()}>reset</Button>
            </div>
            <Form.Item label="name" name="name" rules={[{ required: true, message: 'Name can not be empty' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password can not be empty' }]}
            >
                <Input.Password type="password" />
            </Form.Item>

            <Form.Item label={<></>}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

                <Button htmlType="reset">Reset</Button>
            </Form.Item>
        </Form>
    )
}
