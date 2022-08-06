/**
 * cn - Hooks
 *    -- useFormValueState基本用法
 * en - Hooks
 *    -- UseFormValueState basic usage
 */
import React from 'react'
import { Form, Input } from 'ethan'

export default function App() {
    const form = Form.useForm()

    const [name, updateName] = Form.useFormValueState(form, 'name')

    return (
        <>
            <Form form={form} labelAlign="top">
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>
            </Form>

            <pre style={{ padding: '5px', fontSize: '14px' }}>New name: {name}</pre>

            <Input placeholder="Input to update values outside the form" onChange={updateName} />
        </>
    )
}
