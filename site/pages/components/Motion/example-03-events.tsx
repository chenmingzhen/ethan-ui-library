/**
 * cn - 各个动画阶段的事件
 *    -- 在各个动画阶段修改DOM的样式
 * en - Events
 *    -- Update the style of the DOM at various stages of animation.
 */
import React, { useState } from 'react'
import { Button, Motion } from 'ethan-ui'

export default function () {
    const [visible, updateVisible] = useState(false)

    return (
        <div>
            <style>{`.background-transition {transition: background 0.3s linear;}`}</style>

            <Button
                style={{ marginBottom: 10 }}
                type="primary"
                onClick={() => {
                    updateVisible(!visible)
                }}
            >
                Toggle
            </Button>
            <Motion
                visible={visible}
                onEnterStart={(element) => {
                    console.log('onEnterStart:', element)
                }}
                onEnterActive={(element) => {
                    console.log('onEnterActive')

                    element.style.background = 'yellow'
                }}
                onEnterEnd={(element) => {
                    console.log('onEnterEnd')

                    element.style.background = 'blue'
                }}
                onLeaveStart={(element) => {
                    console.log('onLeaveStart:', element)
                }}
                onLeaveActive={(element) => {
                    console.log('onLeaveActive')

                    element.style.background = 'brown'
                }}
                onLeaveEnd={(element) => {
                    console.log('onLeaveEnd')

                    element.style.background = 'orange'
                }}
            >
                <div className="background-transition">This is a very, very long content</div>
            </Motion>
        </div>
    )
}
