/**
 * cn - Animation 写法
 *    -- 除了可以使用transition，还可以使用Animation执行Motion
 * en - Use animation
 *    -- In addition to using transition, you can also use Animation to execute a Motion.
 */
import React, { useState } from 'react'
import { Button, Checkbox, DatePicker, Motion } from 'ethan-ui'

export default function () {
    const [visible, updateVisible] = useState(false)
    const [enter, setEnter] = useState(true)
    const [leave, setLeave] = useState(true)
    const [destroyOnLeave, setDestroyOnLeave] = useState(true)

    return (
        <div>
            <style>
                {`.animation { animation-duration: .3s;animation-fill-mode: both;}`}
                {`.animation-enter { animation-name: fadeIn;animation-play-state: paused;}`}
                {`.animation-enter-active { animation-name: fadeIn;animation-play-state: running;}`}
                {`.animation-leave { animation-name: fadeOut;animation-play-state: paused;}`}
                {`.animation-leave-active { animation-name: fadeOut;animation-play-state: running;}`}
                {`.hidden {opacity: 0 !important;}`}
                {`@keyframes fadeIn {from {opacity: 0;} to {opacity: 1;}}`}
                {`@keyframes fadeOut {from {opacity: 1;} to {opacity: 0;}}`}
            </style>

            <div style={{ margin: '10px 0' }}>
                <Checkbox onChange={setEnter} value={enter}>
                    Enter
                </Checkbox>
                <Checkbox onChange={setLeave} value={leave}>
                    Leave
                </Checkbox>
                <Checkbox onChange={setDestroyOnLeave} value={destroyOnLeave}>
                    DestroyOnLeave
                </Checkbox>
            </div>

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
                name="animation"
                visible={visible}
                leaveClassName="hidden"
                destroyOnLeave={destroyOnLeave}
                enter={enter}
                leave={leave}
            >
                <div>
                    <DatePicker placeholder="Select Date" />
                </div>
            </Motion>
        </div>
    )
}
