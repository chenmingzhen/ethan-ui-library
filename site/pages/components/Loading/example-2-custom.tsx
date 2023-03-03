/**
 * cn - 自定义
 *    -- 自定义加载的样式
 * en - Customize
 *    -- Customize the loading style
 */

import React from 'react'
import { Loading, Button } from 'ethan-ui'

const colors = ['red', 'orange', 'cyan', 'green', 'blue', 'purple']

export default () => {
    React.useEffect(
        () => () => {
            /** Clear Custom config  */
            Loading.config(null)
        },
        []
    )

    function handleClick(color: string, height: number) {
        Loading.config({
            color,
            height,
        })

        Loading.start()
    }

    return (
        <div>
            {colors.map((color, index) => (
                <Button
                    key={color}
                    type="link"
                    style={{ color }}
                    onClick={() => {
                        handleClick(color, index + 1)
                    }}
                >
                    {color}
                </Button>
            ))}

            <Button
                type="danger"
                onClick={() => {
                    Loading.finish()
                }}
            >
                finish
            </Button>
        </div>
    )
}
