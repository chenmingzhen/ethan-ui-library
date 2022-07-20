/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Button, Rule, FontAwesome } from 'ethan'

const rules = Rule({
    isExist: (values, _, callback) => {
        const result = []
        const valueMap = {}
        values.forEach(({ name }, i) => {
            if (!name) return
            if (valueMap[name]) result[i] = { name: new Error(`Name "${name}" is existed.`) }
            else valueMap[name] = true
        })
        callback(result.length > 0 ? result : true)
    },
})

export default class extends PureComponent {
    renderEmpty = onAppend => (
        <Button key="empty" onClick={() => onAppend({})}>
            Add new friend
        </Button>
    )

    render() {
        return (
            <Form>
                <Form.Item label="Name" name="name">
                    <Input defaultValue="Harry Potter" />
                </Form.Item>

                <Form.Item label="Friends">
                    <Form.FieldSet
                        /** rules.min(2) */
                        rules={[rules.isExist]}
                        name="friends"
                        empty={this.renderEmpty}
                        // defaultValue={[{ name: 'Hermione Granger', age: 16 }, {}]}
                    >
                        {({ onAppend, onRemove }) => (
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                <Form.Item name="name" rules={[rules.required]}>
                                    <Input style={{ width: 180, marginInlineEnd: 8 }} placeholder="Name" />
                                </Form.Item>

                                <Form.Item name="age">
                                    <Input style={{ width: 60 }} type="number" title="Friend age" placeholder="Age" />
                                </Form.Item>

                                <a style={{ margin: '0 12px' }} onClick={() => onAppend({ age: 16 })}>
                                    <FontAwesome name="plus" />
                                </a>
                                <a onClick={onRemove}>
                                    <FontAwesome name="close" />
                                </a>
                            </div>
                        )}
                    </Form.FieldSet>
                </Form.Item>
            </Form>
        )
    }
}
