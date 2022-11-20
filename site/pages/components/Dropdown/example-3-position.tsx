/**
 * cn - 弹出位置
 *    -- 设置 position 属性可以控制下拉菜单弹出的方向和位置
 * en - Position
 *    -- Set position property can control the direction and position of the drop-down menu.
 */
import React from 'react'
import { Dropdown } from 'ethan-ui'

const style = { marginRight: 12, marginBottom: 12 }

export default function () {
    const menu = [
        {
            content: 'First',
            key: '1',
            children: [
                {
                    content: 'link1',
                    disabled: true,
                    key: '4',
                },
                {
                    content: 'link2',
                    key: '5',
                },
            ],
        },
        {
            content: 'Second',
            key: '2',
            children: [
                {
                    content: 'link3',
                    key: 6,
                },
                {
                    content: 'link4',
                    key: 7,
                    children: [
                        {
                            key: '8',
                            content: 'link5',
                        },
                        {
                            key: '9',
                            content: 'link6',
                        },
                    ],
                },
            ],
        },
    ]

    return (
        <div>
            <Dropdown placeholder="Right Top" style={style} position="right-top" data={menu} />

            <Dropdown placeholder="Bottom Left" style={style} position="bottom-left" data={menu} />

            <Dropdown placeholder="Bottom Right" style={style} position="bottom-right" data={menu} />

            <Dropdown placeholder="Left Top" style={style} position="left-top" data={menu} />

            <br />

            <Dropdown placeholder="Right Bottom" style={style} position="right-bottom" data={menu} />

            <Dropdown placeholder="Top Left" style={style} position="top-left" data={menu} />

            <Dropdown placeholder="Top Right" style={style} position="top-right" data={menu} />

            <Dropdown placeholder="Left Bottom" style={style} position="left-bottom" data={menu} />

            <br />
            <Dropdown placeholder="Auto Position" style={style} position="auto" data={menu} />
        </div>
    )
}
