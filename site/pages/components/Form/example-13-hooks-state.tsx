/**
 * cn - Hooks
 *    -- useFormValueState基本用法
 * en - Hooks
 *    -- UseFormValueState basic usage
 */
import React from 'react'
import { Form, Input } from 'ethan'

interface FormValues {
    name: string
}

export default function App() {
    const form = Form.useForm<FormValues>()

    const [name, updateName] = Form.useFormValueState(form, 'name')

    return (
        <>
            <Form form={form} labelAlign="top">
                <Form.Item name="name" label="The name controlled by the form">
                    <Input />
                </Form.Item>
            </Form>

            <pre style={{ padding: '5px', fontSize: '14px' }}>New name: {name}</pre>

            <Input placeholder="The name controlled by the hooks" onChange={updateName} />
        </>
    )
}
