/**
 * cn - 多列平铺
 *    --
 * en - Multiple columns
 *    --
 */
import React from 'react'
import { Dropdown } from 'ethan-ui'

const groups = []

for (let i = 1; i <= 30; i++) {
    const groupIndex = Math.ceil(i / 5)
    const groupName = String.fromCharCode(65 + groupIndex - 1) // 将数字转换为字母，A对应65的ASCII码

    let group = groups.find((g) => g.key === groupName)

    if (!group) {
        group = { title: groupName, key: groupName, type: 'group', children: [] }
        groups.push(group)
    }

    group.children.push({ title: i, key: i })
}

export default function () {
    const menu = []
    for (let i = 1; i <= 30; i++) {
        menu.push({
            key: `${i}`,
            content: `item${i}`,
        })
    }

    return (
        <Dropdown menu={{ data: groups, style: { width: 55 * 6, display: 'flex' }, onSelect: console.log }}>
            <span>Dropdown</span>
        </Dropdown>
    )
}
