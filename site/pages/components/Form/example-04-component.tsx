/**
 * cn - 自定义表单组件
 *    -- 提供受控的value和onChange使组件成为自定义表单组件
 * en - Customized Form Controls
 *    -- Providing controlled values and onChange makes the component a customized form component.
 */
import React from 'react'
import { Button, Form, Input, Select } from 'ethan-ui'

interface PriceInputProps {
    value?: { number?: number; currency?: string }
    onChange?: (value: { number?: number; currency?: string }) => void
}

const PriceInput: React.FC<PriceInputProps> = ({ value = {}, onChange }) => {
    function handleNumberChange(num) {
        if (onChange) {
            onChange({ ...value, number: num })
        }
    }

    function handleCurrencyChange(cur) {
        if (onChange) {
            onChange({ ...value, currency: cur })
        }
    }

    return (
        <span>
            <Input type="number" value={value.number} onChange={handleNumberChange} style={{ width: 100 }} />
            <Select
                value={value.currency}
                style={{ width: 80, margin: '0 8px' }}
                onChange={handleCurrencyChange}
                renderItem="label"
                data={[
                    { label: 'RMB', value: 'rmb' },
                    { label: 'Dollar', value: 'dollar' },
                ]}
                format="value"
            />
        </span>
    )
}

export default function App() {
    const defaultValue = {
        price: {
            number: 0,
            currency: 'rmb',
        },
    }

    return (
        <Form defaultValue={defaultValue} onSubmit={console.log}>
            <Form.Item name="price" label="Price">
                <PriceInput />
            </Form.Item>

            <Form.Item label={<></>}>
                <Button htmlType="submit" type="primary">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
