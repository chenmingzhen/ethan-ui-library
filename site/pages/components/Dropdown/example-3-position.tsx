/**
 * cn - 弹出位置
 *    -- 设置 position 属性可以控制下拉菜单弹出的方向和位置
 * en - Position
 *    -- Set position property can control the direction and position of the drop-down menu.
 */
import React from 'react'
import { Button, Dropdown } from 'ethan-ui'

const style = { marginRight: 12, marginBottom: 12 }

export default function () {
    const data = [
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
            <Dropdown style={style} position="right-top" menu={{ data }}>
                <Button>Right Top</Button>
            </Dropdown>

            <Dropdown style={style} position="bottom-left" menu={{ data }}>
                <Button>Bottom left</Button>
            </Dropdown>

            <Dropdown style={style} position="bottom-right" menu={{ data }}>
                <Button>Bottom Right</Button>
            </Dropdown>

            <Dropdown style={style} position="left-top" menu={{ data }}>
                <Button>Left Top</Button>
            </Dropdown>

            <br />

            <Dropdown style={style} position="right-bottom" menu={{ data }}>
                <Button>Right Bottom</Button>
            </Dropdown>

            <Dropdown style={style} position="top-left" menu={{ data }}>
                <Button>Top Left</Button>
            </Dropdown>

            <Dropdown style={style} position="top-right" menu={{ data }}>
                <Button>Top Right</Button>
            </Dropdown>

            <Dropdown style={style} position="left-bottom" menu={{ data }}>
                <Button>Left Bottom</Button>
            </Dropdown>

            <br />
        </div>
    )
}
