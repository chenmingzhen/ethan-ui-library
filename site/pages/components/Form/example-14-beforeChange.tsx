/**
 * cn - 改变前回调
 *    -- 使用beforeChange可以在改变回传到onChange中的value
 * en - beforeChange
 *    -- Use beforeChange to set the value in the change back to onChange
 */
import React from 'react'
import { Form, Input, Select } from 'ethan'

interface FormValues {
    money: string

    unit: string
}

export default function App() {
    return (
        <Form>
            <Form.Item<FormValues>
                name="money"
                label="money"
                beforeChange={(value, prevValue = '', form) => {
                    if (typeof value === 'string') {
                        const { unit } = form.getValue()

                        const regExpStr = `${unit}`

                        value = value.replace(new RegExp(regExpStr, 'g'), '')

                        if (
                            !value ||
                            value === unit ||
                            (prevValue.includes('元') && unit === '磅') ||
                            (prevValue.includes('磅') && unit === '元')
                        ) {
                            value = ''
                        } else {
                            value = `${value}${unit}`
                        }
                    }

                    return value
                }}
            >
                <Input />
            </Form.Item>

            <Form.Item<FormValues> name="unit" label="unit" defaultValue="元">
                <Select data={['元', '磅']} />
            </Form.Item>
        </Form>
    )
}
