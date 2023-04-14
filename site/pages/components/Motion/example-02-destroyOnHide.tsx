/**
 * cn - 退场后销毁
 *    -- 完成退场动画之后，销毁DOM.
 * en - DestroyOnHide
 *    -- After the leave animation is complete, destroy the DOM.
 */
import React, { useState } from 'react'
import { Button, DatePicker, Motion } from 'ethan-ui'

export default function () {
    const [visible, updateVisible] = useState(false)

    return (
        <div>
            <style>
                {`.example-02-enter-start {opacity: 0;}`}
                {`.example-02-enter-active {opacity: 1;transition: opacity 0.3s linear;}`}
                {`.example-02-enter-end {opacity: 1;}`}
                {`.example-02-leave-start {opacity: 1;}`}
                {`.example-02-leave-active {opacity: 0;transition: opacity 0.3s linear;}`}
                {`.example-02-leave-end {opacity: 0;}`}
            </style>
            <Button
                style={{ marginBottom: 10 }}
                type="primary"
                onClick={() => {
                    updateVisible(!visible)
                }}
            >
                Toggle
            </Button>

            <Motion name="example-02" visible={visible} destroyOnLeave>
                <div>
                    <DatePicker placeholder="Select Date" />
                </div>
            </Motion>
        </div>
    )
}
