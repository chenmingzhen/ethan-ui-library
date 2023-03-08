/**
 * cn - 创建选项
 *    -- 设置 onCreate 属性可以通过输入创建选项
 * en - Create by input
 *    -- Set the onCreate property can create options by inputting.
 */
import React from 'react'
import { Select } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const data2 = [
    { id: 'red', color: 'red' },
    { id: 'orange', color: 'orange' },
    { id: 'yellow', color: 'yellow' },
    { id: 'green', color: 'green' },
    { id: 'cyan', color: 'cyan' },
    { id: 'blue', color: 'blue' },
    { id: 'violet', color: 'violet' },
]

export default function () {
    return (
        <div>
            <Select
                style={{ width: 240, marginBottom: 12 }}
                data={data}
                placeholder="input color"
                onCreate
                defaultValue="brown"
                onChange={(v) => {
                    console.log('onChange:', v)
                }}
            />
            <br />
            <Select
                style={{ width: 400, marginBottom: 12 }}
                data={data}
                multiple
                placeholder="input color"
                onCreate={(t) => t}
                onChange={(v) => {
                    console.log('onChange:', v)
                }}
            />
            <br />
            <Select
                style={{ width: 400 }}
                data={data2}
                multiple
                placeholder="input color"
                labelKey="color"
                valueKey="id"
                onCreate={(t) => ({ color: t, id: `${Date.now()}` })}
                onChange={(v) => {
                    console.log('onChange:', v)
                }}
            />
        </div>
    )
}
