/**
 * cn - hooks
 *    -- useFormValueState
 * en - hooks
 *    -- useFormValueState
 */
import React from 'react'
import { Form, Input } from 'ethan'

export default function App() {
    const formDatum = Form.useFormDatum()

    const [name, updateName] = Form.useFormValueState(formDatum, 'name')

    return (
        <>
            <Form datum={formDatum} labelAlign="top">
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>
            </Form>

            <pre style={{ padding: '5px', fontSize: '14px' }}>New name: {name}</pre>

            <Input placeholder="Input to update values outside the form" onChange={updateName} />
        </>
    )
}
