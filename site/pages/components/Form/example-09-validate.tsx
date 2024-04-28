/**
 * cn - 校验
 *    -- 更多组件的检验
 * en - Validate
 *    -- More component validation
 */
import React from 'react'
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Rate,
    Rule,
    Select,
    Slider,
    Upload,
    Transfer,
    Switch,
    DatePicker,
    Icon,
} from 'ethan-ui'

const { FontAwesome } = Icon

const rule = Rule({
    uploadSize(value) {
        if (!value || !value?.[0]) return Promise.reject(new Error('You have to upload file'))

        const { blob } = value[0]

        const { size } = blob

        if (size >= 1024 * 60) return Promise.reject(new Error('The file is too large'))

        return Promise.resolve(true)
    },
})

const transferData = []

for (let i = 1; i < 20; i++) {
    transferData.push({
        id: i,
        content: `content ${i}`,
    })
}

export default function App() {
    return (
        <Form onChange={console.log} onSubmit={console.log} onError={console.log}>
            <Form.Item name="select" label="Select" required rules={[{ required: true, message: 'Can not be empty' }]}>
                <Select placeholder="Please select a country" data={['China', 'U.S.A']} clearable />
            </Form.Item>

            <Form.Item
                name="select-multiple"
                label="Select[multiple]"
                rules={[rule.required('Can not be empty')]}
                required
            >
                <Select
                    multiple
                    placeholder="Please select favorite colors"
                    data={['red', 'green', 'blur']}
                    clearable
                />
            </Form.Item>

            <Form.Item name="checkbox" label="Checkbox" rules={[rule.required('Can not be empty')]} required>
                <Checkbox>Check</Checkbox>
            </Form.Item>

            <Form.Item name="switch" label="Switch" rules={[rule.required('Can not be empty')]} required>
                <Switch />
            </Form.Item>

            <Form.Item label="InputNumber" required>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Item
                        name="input-number"
                        noStyle
                        rules={[
                            rule.required('Can not be empty'),
                            { max: 80, min: 10, type: 'number', message: 'It has to be between 10 and 80' },
                        ]}
                    >
                        <Input.Number style={{ width: 200 }} />
                    </Form.Item>
                    <span style={{ marginLeft: '10px' }}> machines</span>
                </div>
            </Form.Item>

            <Form.Item label="DatePicker" name="date-picker" rules={[rule.required('Can not be empty')]} required>
                <DatePicker clearable />
            </Form.Item>

            <Form.Item label="RatePicker" name="range-picker" rules={[rule.required('Can not be empty')]} required>
                <DatePicker.RangePicker clearable />
            </Form.Item>

            <Form.Item
                name="slider"
                label="Slider"
                required
                rules={[
                    rule.required('Can not be empty'),
                    { min: 10, max: 80, type: 'number', message: 'It has to be between 10 and 80' },
                ]}
            >
                <Slider />
            </Form.Item>

            <Form.Item name="radio-group" label="Radio.Group" rules={[rule.required('Can not be empty')]} required>
                <Radio.Group>
                    <Radio value="a">item 1</Radio>
                    <Radio value="b">item 2</Radio>
                    <Radio value="c">item 3</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="radio-button" label="Radio.Button" rules={[rule.required('Can not be empty')]} required>
                <Radio.Group button>
                    <Radio value="a">item 1</Radio>
                    <Radio value="b">item 2</Radio>
                    <Radio value="c">item 3</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="checkbox-group"
                label="Checkbox.Group"
                rules={[rule.required('Can not be empty')]}
                required
            >
                <Checkbox.Group>
                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                        A
                    </Checkbox>
                    <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                        B
                    </Checkbox>
                    <Checkbox value="C" style={{ lineHeight: '32px' }}>
                        C
                    </Checkbox>
                    <Checkbox value="D" style={{ lineHeight: '32px' }}>
                        D
                    </Checkbox>
                    <Checkbox value="E" style={{ lineHeight: '32px' }}>
                        E
                    </Checkbox>
                    <Checkbox value="F" style={{ lineHeight: '32px' }}>
                        F
                    </Checkbox>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item name="rate" label="Rate" rules={[rule.required('Can not be empty')]} required>
                <Rate size={40} background={<FontAwesome name="star" />} front={<FontAwesome name="star" />} />
            </Form.Item>

            <Form.Item name="transfer" label="Transfer" rules={[rule.required('Can not be empty')]}>
                <Transfer data={transferData} titles={['Source', 'Target']} />
            </Form.Item>

            <Form.Item
                name="upload"
                label="Upload"
                tip="longgggggggggggggggggggggggggggggggggg"
                rules={[rule.uploadSize]}
            >
                <Upload.Image
                    name="logo"
                    beforeUpload={() => Promise.resolve({ status: 'MANUAL' })}
                    width={250}
                    limit={1}
                >
                    <div style={{ textAlign: 'center', width: '100%', padding: 20 }}>
                        <FontAwesome style={{ color: '#409dfd', fontSize: 20 }} name="image" />
                        <br />
                        Click to upload
                    </div>
                </Upload.Image>
            </Form.Item>

            <Form.Item label={<></>}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
