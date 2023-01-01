/**
 * cn -
 *  . -- Input.Number 组件，可以通过鼠标和上下键辅助输入
 * en -
 *  . -- Input.Number component can be assisted by mouse and up and down keyboard.
 */
import React from 'react'
import { Input } from 'ethan-ui'

export default function () {
    return (
        <Input.Number
            width={120}
            min={23}
            max={100}
            digits={2}
            clearable
            onEnterPress={(value) => {
                console.log('onEnterPress:', value)
            }}
            onChange={(value) => {
                console.log('onChange:', value)
            }}
            onInput={(value) => {
                console.log('onInput:', value)
            }}
        />
    )
}
