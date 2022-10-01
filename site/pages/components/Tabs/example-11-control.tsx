/**
 * cn - 受控
 *    -- 通过 active 和 onChange 可以控制标签状态
 * en - Controlled
 *    -- Set active and onChange property to control active state.
 */
import React, { Component } from 'react'
import { Radio, Tabs, FontAwesome } from 'ethan-ui'

const panelStyle = { padding: 15 }
const contact = (
    <span>
        <FontAwesome name="user" />
        Contact
    </span>
)

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabs: ['home', 'profile', 'contact'],
            active: 'profile',
        }
    }

    handleActiveChange = active => this.setState({ active })

    hideMessage = e => {
        e.stopPropagation()
        this.setState({
            tabs: ['home', 'profile', 'contact'],
            active: 'home',
        })
    }

    render() {
        const { active } = this.state

        return (
            <div>
                <Radio.Group data={this.state.tabs} keygen value={active} onChange={this.handleActiveChange} />

                <br />

                <Tabs active={active} onChange={this.handleActiveChange} shape="line">
                    <Tabs.Panel id="home" style={panelStyle} tab="Home">
                        Content of Tab Pane 1
                    </Tabs.Panel>
                    <Tabs.Panel id="profile" style={panelStyle} tab="Profile">
                        Content of Tab Pane 2
                    </Tabs.Panel>
                    <Tabs.Panel id="contact" style={panelStyle} tab={contact}>
                        Content of Tab Pane 3
                    </Tabs.Panel>
                </Tabs>
            </div>
        )
    }
}
