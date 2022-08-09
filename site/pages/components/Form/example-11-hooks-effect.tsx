/**
 * cn -
 *    -- useFormValueEffect 基本用法(无法读取不存在的属性)
 * en -
 *    -- useFormValueEffect basic usage(Cannot read a property that does not exist)
 */
import React from 'react'
import { Button, FontAwesome, Form, Input, Select } from 'ethan'

export default function App() {
    const form = Form.useForm()

    Form.useFormValueEffect(console.log, {
        form,
        deep: ['name', 'contact.phone', 'address', 'friends'],
    })

    return (
        <Form form={form}>
            <Form.Item name="name" label="Name">
                <Input />
            </Form.Item>

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

            <Form.Item label="Address">
                <Form.FieldSet name="address">
                    <div style={{ display: 'flex' }}>
                        <Form.Item noStyle name="province">
                            <Select keygen style={{ width: 100 }} clearable data={['BeiJing', 'ShangHai']} />
                        </Form.Item>
                        <Form.Item noStyle name="street">
                            <Input clearable />
                        </Form.Item>
                    </div>
                </Form.FieldSet>
            </Form.Item>

            <Form.Item label="Friends">
                <Form.FieldSet
                    name="friends"
                    emptyRender={onAppend => (
                        <Button
                            key="empty"
                            onClick={() => {
                                onAppend({ age: 18, name: 'Tom' })
                            }}
                        >
                            Add new friend
                        </Button>
                    )}
                >
                    {({ onAppend, onRemove }) => (
                        <div style={{ display: 'flex', marginBottom: 4 }}>
                            <Form.Item name="name">
                                <Input style={{ width: 180, marginInlineEnd: 8 }} placeholder="Name" />
                            </Form.Item>

                            <Form.Item name="age">
                                <Input style={{ width: 60 }} type="number" title="Friend age" placeholder="Age" />
                            </Form.Item>

                            <div style={{ lineHeight: '32px' }}>
                                <a
                                    style={{ margin: '0 12px' }}
                                    onClick={() => {
                                        onAppend({
                                            age: undefined,
                                            name: undefined,
                                        })
                                    }}
                                >
                                    <FontAwesome name="plus" />
                                </a>
                                <a onClick={onRemove}>
                                    <FontAwesome name="close" />
                                </a>
                            </div>
                        </div>
                    )}
                </Form.FieldSet>
            </Form.Item>
        </Form>
    )
}
