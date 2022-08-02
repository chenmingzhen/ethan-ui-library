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

            <Form.Item<FormValues> noStyle flow={['name']}>
                {({ form }) => {
                    const name = form.get('name')

                    if (!name) {
                        return (
                            <Form.Item label={<></>}>
                                <span>Enter your mobile after your name</span>
                            </Form.Item>
                        )
                    }

                    /** FormItem内部没有对添加key值，如果存在多种可能的实例，需要显式指名Key */
                    return (
                        <Form.Item name="mobile" label="Mobile" key="mobile">
                            <Input type="number" />
                        </Form.Item>
                    )
                }}
            </Form.Item>

            <Form.Item<FormValues> noStyle flow={['name']}>
                {({ form }) => {
                    const name = form.get('name')

                    if (!name) {
                        /** 改变组件的结构，使条件语句中的实例不一样 */
                        return (
                            <>
                                <Form.Item label={<></>}>
                                    <span>Enter your information after your name</span>
                                </Form.Item>
                            </>
                        )
                    }

                    return (
                        <Form.Item name="information" label="Information(preserve)" preserve>
                            <Input />
                        </Form.Item>
                    )
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
