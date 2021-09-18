/**
 * cn - 对齐
 *    -- 设置 align
 * en - Align
 *    -- set align
 */
import React from 'react'
import { Tabs, Select } from 'ethan'

const panelStyle = { padding: '12px 0' }

const data = ['left', 'right', 'vertical-left', 'vertical-right']

export default function() {
    const [align, setAlign] = React.useState('right')

    return (
        <div>
            <Select
                keygen
                style={{ width: 240, marginBottom: '25px' }}
                data={data}
                defaultValue={align}
                onChange={setAlign}
            />

            <Tabs defaultActive={1} align={align} shape="line">
                <Tabs.Panel style={panelStyle} tab="Home">
                    Content of Tab Pane 1
                </Tabs.Panel>
                <Tabs.Panel style={panelStyle} tab="Profile">
                    Content of Tab Pane 2
                </Tabs.Panel>
                <Tabs.Panel style={panelStyle} tab="Contact">
                    Content of Tab Pane 3
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}
