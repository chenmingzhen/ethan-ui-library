/**
 * cn - 渲染节点
 *    -- 渲染选择器到指定的容器中
 * en - Portal
 *    -- Render the select into the specified container.
 */
import React from 'react'
import { Select } from 'ethan-ui'
import { fetchSync as fetchUser } from 'doc/data/user'

const users = fetchUser(10000)
const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
    return (
        <>
            <div style={{ padding: 10, height: 100, overflow: 'hidden' }}>
                <Select
                    data={data}
                    style={{ width: 100, marginRight: 12 }}
                    onFilter={(text, d) => d.indexOf(text) > -1}
                    placeholder="default"
                />

                <Select
                    multiple
                    data={users}
                    valueKey="id"
                    style={{ width: 200, marginRight: 12 }}
                    placeholder="Select user"
                    onFilter={(text, d) => d.firstName.indexOf(text) > -1}
                    renderItem={(user) => `${user.firstName} ${user.lastName}`}
                    getPopupContainer={() => document.body}
                />

                <Select
                    data={data}
                    style={{ width: 100, marginRight: 12, marginTop: 20 }}
                    onFilter={(text, d) => d.indexOf(text) > -1}
                    placeholder="Render to select-demo-portal"
                    getPopupContainer={() => document.getElementById('select-demo-portal')}
                />
            </div>

            <div id="select-demo-portal" style={{ height: 20, background: '#e8e8e8', position: 'relative' }}>
                select-demo-portal
            </div>
        </>
    )
}
