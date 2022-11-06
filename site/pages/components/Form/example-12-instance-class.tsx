/**
 * cn -
 *    -- 获取表单实例.(类组件)
 * en -
 *    -- Get Form component instance.(Class component)
 */
import React from 'react'
import { Button, Form, Input } from 'ethan-ui'
import { FormInstance } from '@/component/Form/type'

interface FormValues {
    name: string
}

export default class extends React.PureComponent {
    formRef = React.createRef<FormInstance<FormValues>>()

    render() {
        return (
            <Form
                ref={this.formRef}
                onSubmit={(data) => {
                    console.log('onSubmit:', data)
                }}
            >
                <div style={{ margin: '20px 0' }}>
                    <Button onClick={() => console.log(this.formRef.current.getValue())}>get value</Button>
                    <Button onClick={() => this.formRef.current.validateForm()}>validateForm</Button>
                    <Button onClick={() => this.formRef.current.submit()}>submit</Button>
                    <Button onClick={() => this.formRef.current.reset()}>reset</Button>
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
}
