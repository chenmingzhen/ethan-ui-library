/**
 * cn - 自定义
 *    -- 自定义加载的样式
 * en - Customize
 *    -- Customize the loading style
 */

import React from 'react'
import { Loading, Button } from 'ethan-ui'

const colors = ['red', 'orange', 'cyan', 'green', 'blue', 'purple']
const linearGradientColors = [
    'linear-gradient(to right, #9b59b6, #e74c3c)',
    'linear-gradient(to right, #ff6b6b, #ffb347)',
    'linear-gradient(to right, #16a085, #1abc9c)',
    'linear-gradient(to right, #f1c40f, #3498db)',
]

export default () => {
    function handleClick(color: string, height: number) {
        Loading.setConfig({
            color,
            height,
        })

        Loading.start()
    }

    return (
        <div>
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
            </div>

            <div>
                {linearGradientColors.map((color) => (
                    <Button
                        key={color}
                        type="link"
                        onClick={() => {
                            handleClick(color, 5)
                        }}
                    >
                        {color}
                    </Button>
                ))}
            </div>

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
