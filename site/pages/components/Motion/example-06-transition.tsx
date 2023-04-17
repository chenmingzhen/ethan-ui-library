/**
 * cn - 内置动画组件
 *    -- Motion 基本用法
 * en - Transition Component
 *    -- The basic usage.
 */
import React, { useState } from 'react'
import { Button, Checkbox, DatePicker, Radio, Motion } from 'ethan-ui'

export default function () {
    const [visible, updateVisible] = useState(false)
    const [transitionTypes, setTransitionTypes] = useState<any>(['fade', 'collapse'])
    const [duration, setDuration] = useState<any>('medium')
    const [destroyAfterLeave, setDestroyAfterLeave] = useState(false)

    return (
        <div>
            <div style={{ margin: '10px 0' }}>
                <Checkbox.Group value={transitionTypes} onChange={setTransitionTypes}>
                    <Checkbox value="fade">Fade</Checkbox>
                    <Checkbox value="collapse">Collapse</Checkbox>
                    <Checkbox value="scale-y">ScaleY</Checkbox>
                </Checkbox.Group>
            </div>

            <div style={{ margin: '10px 0' }}>
                <Radio.Group value={duration} onChange={setDuration}>
                    <Radio value="slow">Slow</Radio>
                    <Radio value="medium">Medium</Radio>
                    <Radio value="fast">Fast</Radio>
                </Radio.Group>
            </div>

            <div style={{ margin: '10px 0' }}>
                <Checkbox value={destroyAfterLeave} onChange={setDestroyAfterLeave}>
                    DestroyAfterLeave
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

            <Motion.Transition
                visible={visible}
                transitionTypes={transitionTypes}
                duration={duration}
                destroyAfterLeave={destroyAfterLeave}
                ref={console.log}
            >
                <DatePicker placeholder="Select Date" />
            </Motion.Transition>
        </div>
    )
}
