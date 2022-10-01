/**
 * cn -
 *    -- 通过给 Form 设置 errors，实现后端校验数据展示。在表单值被改变后，对应后端校验数据会被清空。前端校验优先级大于后端校验。
 * en -
 *    -- By setting an errors on the Form, the back-end validation data is presented. After the form value is changed, the corresponding back-end validation data is cleared.front-end validation priority is greater than back-end validation.
 */
import React, { useState } from 'react'
import { Form, Input, Button, Rule } from 'ethan-ui'

export default function App() {
    const [errors, updateErrors] = useState(undefined)

    const [loading, updateLoading] = useState(false)

    return (
        <Form
            errors={errors}
            disabled={loading}
            onSubmit={async () => {
                updateLoading(true)

                const errorResults = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve({ nickName: 'Nicknames already exist' })
                    }, 2000)
                })

                updateErrors(errorResults)

                updateLoading(false)
            }}
        >
            <Form.Item label="NickName" name="nickName" rules={[Rule().required]}>
                <Input clearable popoverProps={{ placement: 'left-top' }} />
            </Form.Item>

            <Form.Item label={<></>}>
                <Button htmlType="submit" type="primary" loading={loading}>
                    Submit
                </Button>

                <Button htmlType="reset" type="primary" style={{ marginLeft: '10px' }} disabled={loading}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}
