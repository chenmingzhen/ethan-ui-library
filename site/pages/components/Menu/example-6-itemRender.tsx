/**
 * cn - 自定义渲染
 *    -- 设置 renderItem 属性展现稍微复杂的内容
 * en - RenderItem
 *    -- Set the renderItem property to show format content.
 */
import React from 'react'
import { Menu, FontAwesome } from 'ethan'

const Icons = {
    1: <FontAwesome name="home" />,
    3: <FontAwesome name="flag" />,
    6: <FontAwesome name="tag" />,
    2: <FontAwesome name="github" />,
}
const data = [
    {
        key: '1',
        title: 'Navigation One',
    },
    {
        key: '3',
        title: 'Navigation Two',
        children: [
            {
                key: '4',
                title: 'Option 1',
            },
            {
                key: '5',
                title: 'Option 2',
            },
        ],
    },
    {
        key: '6',
        title: 'Navigation Three',
        children: [
            {
                key: '7',
                title: 'Option 3',
            },
            {
                key: '8',
                title: 'Option 4',
                children: [
                    {
                        key: '9',
                        title: 'Optic 1',
                    },
                    {
                        key: '10',
                        title: 'Optic 2',
                    },
                ],
            },
        ],
    },
    {
        key: '2',
        title: 'Navigation Four',
    },
]

function renderItem(item) {
    if (item.title.startsWith('Navigation')) {
        return (
            <span>
                {Icons[item.key]} {item.title}
            </span>
        )
    }
    return item.title
}

export default () => (
    <Menu
        mode="inline"
        data={data}
        renderItem={renderItem}
        style={{ width: 256 }}
        inlineIndent={24}
        defaultOpenKeys={['3']}
        defaultActiveKey="1"
    />
)
