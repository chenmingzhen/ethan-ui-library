/**
 * cn - 没样式
 *    -- 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据
 * en - NoStyle
 *    -- The form has a two-way binding mechanism built in, automatically sending and collecting data based on the name property of the form element.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Select } from 'ethan'

const App = () => {
    return (
        <Form labelWidth="80px">
            <Form.Item label="Username">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Item
                        name="username"
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Username is required',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: 160,
                            }}
                            placeholder="Please input"
                        />
                    </Form.Item>
                    <a href="" style={{ marginLeft: '10px' }}>
                        Need Help?
                    </a>
                </div>
            </Form.Item>
            <Form.Item label="Address">
                <Input.Group>
                    <Form.Item
                        name="address.province"
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Province is required',
                            },
                        ]}
                    >
                        <Select placeholder="Select province" data={['Zhejiang', 'Jiangsu']} keygen clearable />
                    </Form.Item>
                    <Form.Item
                        name="address.street"
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Street is required',
                            },
                        ]}
                    >
                        <Input placeholder="Input street" />
                    </Form.Item>
                </Input.Group>
            </Form.Item>
            <Form.Item
                label="BirthDate"
                style={{
                    marginBottom: 0,
                }}
            >
                <Form.Item
                    name="year"
                    rules={[
                        {
                            required: true,
                            message: 'Year is required',
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                        marginBottom: 0,
                    }}
                >
                    <Input placeholder="Input birth year" />
                </Form.Item>
                <Form.Item
                    name="month"
                    rules={[
                        {
                            required: true,
                            message: 'Month is required',
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                        margin: '0 8px',
                    }}
                >
                    <Input placeholder="Input birth month" />
                </Form.Item>
            </Form.Item>
        </Form>
    )
}

export default App
