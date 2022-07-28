import React from 'react'
import { Form, Input, Select } from 'ethan'

export default function App() {
    const formDatum = Form.useFormDatum()

    Form.useFormValueEffect(console.log, { formDatum, deep: ['name', 'contact.telephone', 'address'] })

    return (
        <>
            <Form datum={formDatum} labelAlign="top">
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>

                <pre>You need precise paths when you use points</pre>

                <Form.Item label="Contact">
                    <div style={{ display: 'flex' }}>
                        <Form.Item noStyle name="contact.phone">
                            <Input clearable placeholder="phone" />
                        </Form.Item>

                        <Form.Item noStyle name="contact.telephone">
                            <Input clearable placeholder="telephone" />
                        </Form.Item>
                    </div>
                </Form.Item>

                <pre>You need precise paths when you use points</pre>

                <Form.Item label="Address">
                    <Form.FieldSet name="address">
                        <div style={{ display: 'flex' }}>
                            <Form.Item noStyle name="province">
                                <Select keygen style={{ width: 100 }} clearable data={['BeiJing', 'ShangHai']} />
                            </Form.Item>
                        </div>
                    </Form.FieldSet>
                </Form.Item>
            </Form>
        </>
    )
}
