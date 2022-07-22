/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Button, Rule, FontAwesome } from 'ethan'

const rules = Rule({
    isExist: values => {
        const valueMap = {}

        for (const { name } of values) {
            if (!name) continue

            if (valueMap[name]) {
                return Promise.reject(new Error(`Name "${name}" is existed.`))
            }

            valueMap[name] = true
        }

        return Promise.resolve(true)
    },
})

export default class extends PureComponent {
    constructor() {
        super()

        this.state = {
            index: 0,
        }
    }

    renderEmpty = onAppend => (
        <Button
            key="empty"
            onClick={() => {
                this.setState({ index: this.state.index + 1 })

                onAppend({ age: this.state.index, name: this.state.index })
            }}
        >
            Add new friend
        </Button>
    )

    render() {
        return (
            <Form animation>
                <Form.Item label="Name" name="name">
                    <Input defaultValue="Harry Potter" />
                </Form.Item>

                <Form.Item label="Friends">
                    <Form.FieldSet rules={[rules.isExist]} name="friends" emptyRender={this.renderEmpty} keygen="age">
                        {({ onAppend, onRemove }) => (
                            <div style={{ display: 'flex', marginBottom: 4 }}>
                                <Form.Item name="name" rules={[rules.required]}>
                                    <Input style={{ width: 180, marginInlineEnd: 8 }} placeholder="Name" />
                                </Form.Item>

                                <Form.Item name="age">
                                    <Input style={{ width: 60 }} type="number" title="Friend age" placeholder="Age" />
                                </Form.Item>

                                <div style={{ lineHeight: '32px' }}>
                                    <a
                                        style={{ margin: '0 12px' }}
                                        onClick={() => {
                                            this.setState({ index: this.state.index + 1 })

                                            onAppend({
                                                age: this.state.index,
                                                name: this.state.index,
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
}
