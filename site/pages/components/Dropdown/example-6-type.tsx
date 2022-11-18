/**
 * cn - 样式
 *    -- Button 样式
 * en - type
 *    -- Button style
 */
import React, { Component } from 'react'
import { Dropdown, Select, Checkbox } from 'ethan-ui'

const menu = [
    {
        content: 'Submenu',
        key: 'Submenu',
        children: [
            {
                content: (
                    <a target="_blank" href="https://google.com" rel="noreferrer">
                        Link to Google
                    </a>
                ),
                key: 'Link to Google',
            },
            {
                content: 'Disabled',
                disabled: true,
                key: 'Disabled',
            },
        ],
    },
    { content: <a href="/">Home</a>, key: 'Home' },
    {
        content: 'Message',
        key: 'Message',
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
                        data={['primary', 'success', 'warning', 'danger', 'link']}
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
