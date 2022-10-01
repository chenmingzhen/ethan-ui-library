/**
 * cn - 额外数据
 *    -- 继承MenuBaseData拓展更多属性
 * en - Extra Data
 *    -- Extend more attributes by inheriting MenuBaseData.
 */
import React from 'react'
import { Menu } from 'ethan-ui'
import { MenuBaseData } from '@/component/Menu/type'

interface ExtraMenuData extends MenuBaseData {
    /** 若有children，此项必填 覆盖MenuBaseData的初始children类型 */
    children?: ExtraMenuData[]

    extra: string
}

const data: ExtraMenuData[] = [
    {
        key: '1',
        extra: 'Navigation One',
    },
    {
        key: '2',
        extra: 'Navigation Two',
        children: [
            {
                key: '3',
                extra: 'Option 1',
            },
            {
                key: '4',
                extra: 'Option 2',
            },
        ],
    },
    {
        key: '5',
        extra: 'Navigation Three',
        children: [
            {
                key: '6',
                extra: 'Option 3',
            },
            {
                key: '7',
                extra: 'Option 4',
                children: [
                    {
                        key: '8',
                        extra: 'Optic 1',
                    },
                    {
                        key: '9',
                        extra: 'Optic 2',
                    },
                ],
            },
        ],
    },
    {
        key: '10',
        extra: 'Navigation Four',
    },
]

export default () => (
    <Menu
        data={data}
        style={{ width: 256 }}
        inlineIndent={24}
        defaultOpenKeys={['2']}
        defaultActiveKey="1"
        renderItem={({ extra }) => extra}
    />
)
