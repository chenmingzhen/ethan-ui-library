/**
 * cn - 多种效果
 *    -- 演示多种不同的motions
 * en - Multiple motions
 *    -- Demonstrate various motions.
 */

import React, { useState } from 'react'
import { Motion, Checkbox, Button } from 'ethan-ui'

export default function () {
    const [visible, setVisible] = useState(false)
    const [enter, setEnter] = useState(true)
    const [leave, setLeave] = useState(true)

    return (
        <div>
            <style>
                {`.example-04-container {transform-origin: 50% 0%;transform: scaleY(1);opacity: 1;}`}
                {`.example-04-enter-start {transform: scaleY(0);opacity: 0;}`}
                {`.example-04-enter-active {transform: scaleY(1);transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.15s ease-in-out;opacity: 1;}`}
                {`.example-04-enter-end {transform: scaleY(1);opacity: 1;}`}
                {`.example-04-leave-start {transform: scaleY(1);opacity: 1;}`}
                {`.example-04-leave-active {transform: scaleY(0);opacity: 0;transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.15s ease-in-out;}`}
                {`.example-04-leave-end {transform: scaleY(0);opacity: 0;}`}
                {`.example-04-hidden {opacity: 0 !important;}`}
            </style>

            <div>
                <Checkbox onChange={setEnter} value={enter}>
                    Enter
                </Checkbox>
                <Checkbox onChange={setLeave} value={leave}>
                    Leave
                </Checkbox>
            </div>

            <div style={{ margin: '10px 0' }}>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisible(!visible)
                    }}
                >
                    Toggle
                </Button>
            </div>

            <Motion name="example-04" visible={visible} enter={enter} leave={leave} leaveClassName="example-04-hidden">
                <div className="example-04-container" style={{ width: 200, background: 'orange' }}>
                    This is a very, very long content
                </div>
            </Motion>
        </div>
    )
}
