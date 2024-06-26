/**
 * cn - FieldSet
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。
 * en - FieldSet
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.
 */
import React from 'react'
import { Form, Input, Button, Icon, Rule } from 'ethan-ui'

const { FontAwesome } = Icon

export default function App() {
    const [index, updateIndex] = React.useState(0)

    const rule = Rule()

    return (
        <Form animation defaultValue={{ name: 'Ethan', friends: [{ age: index, name: index }] }} onChange={console.log}>
            <Form.Item label="Name" name="name">
                <Input defaultValue="Harry Potter" />
            </Form.Item>

            <Form.Item label="Friends" collectErrorInRoot>
                <Form.FieldSet<{ age: number; name: number }>
                    name="friends"
                    rules={[rule.min(1)]}
                    emptyRender={(onAppend) => (
                        <Button
                            key="empty"
                            onClick={() => {
                                const nextIndex = index + 1

                                updateIndex(nextIndex)

                                onAppend({ age: nextIndex, name: nextIndex })
                            }}
                        >
                            Add new friend
                        </Button>
                    )}
                >
                    {({ onAppend, onRemove }) => (
                        <div style={{ display: 'flex', marginBottom: 4 }}>
                            <Form.Item name="name">
                                <Input style={{ width: 180, marginInlineEnd: 8 }} placeholder="Name" />
                            </Form.Item>

                            <Form.Item name="age">
                                <Input style={{ width: 60 }} type="number" title="Friend age" placeholder="Age" />
                            </Form.Item>

                            <div style={{ lineHeight: '32px' }}>
                                <a
                                    style={{ margin: '0 12px' }}
                                    onClick={() => {
                                        const nextIndex = index + 1

                                        updateIndex(nextIndex)

                                        onAppend({ age: nextIndex, name: nextIndex })
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
