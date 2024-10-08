/**
 * cn - 依赖更新
 *    -- 设置dependencies值时，不仅会重新渲染FormItem，还会进行校验操作
 * en - Flow update
 *    -- When the dependencies value is set, the FormItem is not only re-rendered, but also validated
 */
import { FormItemProps } from '@/component/Form/type'
import { Input, Form, Rule, Button } from 'ethan-ui'
import React from 'react'

interface FormValues {
    name: string
    mobile?: string
    telephone?: string
}

const { mandatory } = Rule({
    mandatory(_, formValues: FormValues, props: FormItemProps<FormValues>) {
        const { name } = props

        const { mobile, telephone } = formValues

        if (!mobile && !telephone) {
            return Promise.reject(new Error('手机、固话必须填写一项'))
        }

        const mobileRegExp = new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)

        if (name === 'mobile' && !mobileRegExp.test(mobile) && !telephone) {
            return Promise.reject(new Error('请输入真实11位手机号码'))
        }

        return Promise.resolve(true)
    },
})

export default function () {
    return (
        <Form labelWidth={60} labelAlign="right">
            <Form.Item
                label="姓名"
                name="name"
                required
                rules={[
                    {
                        required: true,
                        message: '收货人姓名不能为空',
                    },
                ]}
            >
                <Input autoComplete="new-password" width={165} />
            </Form.Item>

            <Form.Item label="手机" name="mobile" rules={[mandatory]} dependencies={['telephone']}>
                <Input autoComplete="new-password" width={165} />
            </Form.Item>
            <Form.Item label="固话" name="telephone" rules={[mandatory]} dependencies={['mobile']} className="ml5">
                <Input autoComplete="new-password" width={165} />
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
