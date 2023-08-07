/**
 * cn - 受控
 *    -- 设置 scrollTopRatio、scrollLeftRatio 属性使组件受控。
 * en - Control
 *    -- Set scrollTopRatio、scrollLeftRatio prop to bring the component under control.
 */
import React, { useState } from 'react'
import { Scroll, Alert, Slider } from 'ethan-ui'

export default function () {
    const [scrollTopRatio, setScrollTopRatio] = useState(0)

    return (
        <div>
            <Scroll
                containerHeight={400}
                scroll="y"
                scrollTopRatio={scrollTopRatio}
                onScroll={(evt) => {
                    setScrollTopRatio(evt.scrollTopRatio)
                }}
            >
                {[...new Array(50).keys()].map((none, index) => (
                    <Alert type="info" style={{ textAlign: 'center' }} key={index}>
                        {index}
                    </Alert>
                ))}
            </Scroll>

            <br />

            <Slider
                value={scrollTopRatio}
                step={0.01}
                scale={[0, 1]}
                onChange={(value: number) => {
                    setScrollTopRatio(value)
                }}
            />
        </div>
    )
}
