/**
 * cn - 样式
 *    -- Button 样式
 * en - type
 *    -- Button style
 */
import React, { Component } from 'react'
import { Dropdown, Message, Select, Checkbox } from 'ethan-ui'

const menu = [
    {
        content: 'Submenu',
        children: [
            {
                content: 'Link',
                target: '_blank',
                url: 'https://google.com',
            },
            {
                content: 'Disabled',
                disabled: true,
            },
        ],
    },
    {
        content: 'Message',
        onClick: () => {
            Message.info('Some message.')
        },
    },
]

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'primary',
            size: 'default',
            disabled: false,
            outline: false,
        }
    }

    changeSetting(name, value) {
        this.setState({ [name]: value })
    }

    render() {
        const { type, outline, size, disabled } = this.state
        return (
            <div>
                <div style={{ marginBottom: 20 }}>
                    <span>type: </span>
                    <Select
                        width={140}
                        keygen={(d) => d}
                        data={['primary', 'success', 'warning', 'danger']}
                        value={type}
                        onChange={this.changeSetting.bind(this, 'type')}
                        style={{ marginRight: 20 }}
                    />

                    <span>size: </span>
                    <Select
                        width={100}
                        keygen={(d) => d}
                        data={['small', 'default', 'large']}
                        value={size}
                        onChange={this.changeSetting.bind(this, 'size')}
                        style={{ marginRight: 20 }}
                    />

                    <Checkbox value={outline} onChange={this.changeSetting.bind(this, 'outline')}>
                        outline
                    </Checkbox>

                    <Checkbox value={disabled} onChange={this.changeSetting.bind(this, 'disabled')}>
                        disabled
                    </Checkbox>
                </div>

                <Dropdown
                    placeholder="Dropdown"
                    data={menu}
                    disabled={disabled}
                    buttonProps={{ size, type, outline }}
                />
            </div>
        )
    }
}
