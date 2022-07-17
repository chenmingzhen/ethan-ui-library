/**
 * cn - 基本用法
 *    -- 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据
 * en - Base
 *    -- The form has a two-way binding mechanism built in, automatically sending and collecting data based on the name property of the form element.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox, Radio, Textarea, Select, DatePicker, Upload, Rule } from 'ethan'

const citys = [
    {
        name: 'JiangSu',
        children: [{ name: 'NanJing' }, { name: 'SuZhou' }, { name: 'YangZhou' }],
    },
    {
        name: 'ZheJiang',
        children: [{ name: 'HangZhou' }, { name: 'JiaQing' }, { name: 'WenZhou' }],
    },
]

export default class extends PureComponent {
    constructor(props) {
        super(props)

        this.state = { value: undefined, error: undefined }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                error: {
                    email: 'Test',
                    obj: {
                        one: 'One Test',
                    },
                },
            })
        }, 2000)
    }

    handleChange = value => {
        this.setState({ value })
    }

    render() {
        const { test, required } = Rule({
            test() {
                return Promise.reject(new Error('Test'))
            },
        })
        return (
            <Form error={this.state.error}>
                <Form.Item label="Email" name="email" defaultValue="1" rules={[required]}>
                    <Input clearable popoverProps={{ placement: 'left-top' }} />
                </Form.Item>

                <Form.Item label="Object.one" name="obj.one" defaultValue="one">
                    <Input clearable />
                </Form.Item>

                <Form.Item label="Object.two" name="obj.two" defaultValue="two">
                    <Input clearable />
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input.Password type="password" />
                </Form.Item>

                <Form.Item label="Number" name="number">
                    <Input.Number width={120} max={100} min={10} />
                </Form.Item>

                <Form.Item label="Name" name={['firstName', 'lastName']} defaultValue={['Ethan', 'Chen']}>
                    {React.createElement<any>(({ value = [], onChange }) => {
                        function handleChange(name, v) {
                            if (name === 'firstName') {
                                onChange([v, value[1]])
                            } else {
                                onChange([value[0], v])
                            }
                        }

                        return (
                            <Input.Group style={{ width: 300 }}>
                                <Input
                                    name="firstName"
                                    placeholder="First Name"
                                    value={value[0]}
                                    onChange={handleChange.bind(this, 'firstName')}
                                    tip="firstName"
                                />
                                -
                                <Input
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={value[1]}
                                    onChange={handleChange.bind(this, 'lastName')}
                                />
                            </Input.Group>
                        )
                    })}
                </Form.Item>

                <Form.Item label="" name="file">
                    <Upload.Image
                        action="//jsonplaceholder.typicode.com/posts"
                        accept="image/*"
                        renderResult={f => f.data}
                        limit={3}
                    />
                </Form.Item>

                <Form.Item label="Age" defaultValue={0}>
                    <Input style={{ width: 100 }} type="number" digits={0} />
                </Form.Item>

                <Form.Item label="Favorite Color" defaultValue={['yellow']} name="favoriteColor">
                    <Checkbox.Group keygen data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
                </Form.Item>

                <Form.Item label="Other Color" defaultValue="green" name="otherColor">
                    <Radio.Group keygen data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
                </Form.Item>

                <Form.Item label="Hate Color" name="hateColor" defaultValue="blue">
                    <Select
                        keygen
                        style={{ width: 100 }}
                        clearable
                        data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
                    />
                </Form.Item>

                <Form.Item
                    label="Date"
                    name={['startDate', 'endDate']}
                    defaultValue={[Date.now() - 100000000, Date.now()]}
                >
                    <DatePicker type="datetime" range />
                </Form.Item>

                <Form.Item label="Description" name="desc">
                    <Textarea autoSize />
                </Form.Item>
            </Form>
        )
    }
}
