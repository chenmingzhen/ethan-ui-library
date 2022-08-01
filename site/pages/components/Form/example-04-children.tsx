/**
 * cn - 函数Children
 *    -- Form.Item children 为函数时，会提供一些操作Form的参数
 * en - Function children
 *    -- When form. Item children is a function, it provides some parameters to manipulate the Form.
 */
import React from 'react'
import { Button, Form, Input } from 'ethan'

interface FormValues {
    mobile: number

    telephone: number
}

export default function App() {
    return (
        <Form onSubmit={console.log}>
            <Form.Item<FormValues> name="name" label="name">
                <Input clearable />
            </Form.Item>

            <Form.Item<FormValues> name="mobile" label="Mobile" flow={['name']}>
                {({ onChange, value, form }) => {
                    const name = form.get('name')

                    if (!name) {
                        return <span>Name is required</span>
                    }

                    return <Input value={value} onChange={onChange} type="number" />
                }}
            </Form.Item>

            <Form.Item label={<></>}>
                <Button htmlType="submit" type="primary">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
