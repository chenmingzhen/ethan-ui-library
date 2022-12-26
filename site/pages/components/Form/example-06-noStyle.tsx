/**
 * cn - 无样式
 *    -- 无样式的FormItem可直接展示组件，但仍然保留收集数据的能力,实现更复杂的组件
 * en - NoStyle
 *    -- FormItem without styles can directly display components, but still retain the ability to collect data and implement more complex components
 */
import React from 'react'
import { Button, FontAwesome, Form, Input, Select, Upload } from 'ethan-ui'

const App = () => (
    <Form labelWidth="80px" onChange={console.log}>
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
        <Form.Item label="BirthDate">
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
                <Input />
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
        <Form.Item
            name="avatar"
            rules={[
                {
                    required: true,
                    message: 'Avatar is required',
                },
            ]}
            label="Avatar"
        >
            {({ value, onChange, error }) => (
                <>
                    <Upload
                        value={value}
                        onChange={onChange}
                        style={{ width: 300 }}
                        beforeUpload={() => Promise.resolve({ status: 'MANUAL' })}
                    >
                        <Button type={error ? 'danger' : 'default'}>
                            <FontAwesome name="cloud-upload " style={{ marginRight: 4 }} />
                            Upload avatar
                        </Button>
                    </Upload>
                </>
            )}
        </Form.Item>
    </Form>
)

export default App
