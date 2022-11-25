/**
 * cn - 基本用法
 *    -- 表单内置了类似双向绑定的机制，根据FormItem的 name 属性自动下发、收集数据
 * en - Base
 *    -- The form has a two-way binding mechanism built in, automatically sending and collecting data based on the name property of the FormItem.
 */
import React, { useCallback } from 'react'
import { Form, Input, Checkbox, Radio, Textarea, Select, Upload, Button, ColorPicker } from 'ethan-ui'
import { EthanFile } from '@/component/Upload/type'
import { action } from 'doc/config'

interface FormValues {
    email: string
    password: string
    number: number
    file: EthanFile
    age: number
    favoriteColor: string[]
    otherColor: string
    hateColor: string
    currentColor: string
}

export default function App() {
    const handleChange = useCallback((changeValues: Partial<FormValues>, allValues: FormValues) => {
        console.log('onChange:', changeValues, allValues)
    }, [])

    const handleReset = useCallback(() => {
        console.log('onReset')
    }, [])

    return (
        <Form<FormValues> onChange={handleChange} onReset={handleReset}>
            <Form.Item label="Email" name="email">
                <Input clearable popoverProps={{ placement: 'left-top' }} />
            </Form.Item>

            <Form.Item label="Password" name="password">
                <Input.Password type="password" />
            </Form.Item>

            <Form.Item label="Number" name="number">
                <Input.Number width={120} max={100} min={10} />
            </Form.Item>

            <Form.Item label="Age" name="age">
                <Input style={{ width: 100 }} type="number" digits={0} />
            </Form.Item>

            <Form.Item label="Favorite Color" name="favoriteColor">
                <Checkbox.Group keygen data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
            </Form.Item>

            <Form.Item label="Other Color" name="otherColor">
                <Radio.Group keygen data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
            </Form.Item>

            <Form.Item label="Hate Color" name="hateColor">
                <Select
                    keygen
                    style={{ width: 100 }}
                    clearable
                    data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
                />
            </Form.Item>

            <Form.Item label="CurrentColor" name="currentColor">
                <ColorPicker />
            </Form.Item>

            <Form.Item label="Description" name="desc">
                <Textarea autoSize />
            </Form.Item>

            <Form.Item label={<></>} name="file">
                <Upload.Image action={action} accept="image/*" limit={3} />
            </Form.Item>

            <Form.Item label={<></>}>
                <Button htmlType="submit" type="primary">
                    Submit
                </Button>

                <Button htmlType="reset" type="primary" style={{ marginLeft: '10px' }}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}
