/**
 * cn - 基本用法
 *    -- Motion 基本用法
 * en - Base
 *    -- The basic usage.
 */
import React, { useState } from 'react'
import { Button, DatePicker, Motion } from 'ethan-ui'

export default function () {
    const [visible, updateVisible] = useState(false)

    return (
        <div>
            <style>
                {`.example-01-enter-start {opacity: 0;}`}
                {`.example-01-enter-active {opacity: 1;transition: opacity 0.3s linear;}`}
                {`.example-01-enter-end {opacity: 1;}`}
                {`.example-01-leave-start {opacity: 1;}`}
                {`.example-01-leave-active {opacity: 0;transition: opacity 0.3s linear;}`}
                {`.example-01-leave-end {opacity: 0;}`}
                {`.example-01-hidden {opacity: 0 !important;}`}
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

            <Motion name="example-01" visible={visible} leaveClassName="example-01-hidden">
                <div>
                    <DatePicker placeholder="Select Date" />
                </div>
            </Motion>
        </div>
    )
}
