/**
 * cn - 基本用法
 *    -- 基本的 ClampLines
 * en - Base
 *    -- Basic ClampLines
 */
import React, { useState } from 'react'
import { ClampLines, Input, Textarea } from 'ethan-ui'

const raw =
    '🍎In this article we will say hello to React. We will discover a little bit of detail about its background and use cases, set up a basic React toolchain on our local computer, and create and play with a simple starter app — learning a bit about how React works in the process.'

export default function () {
    const [lines, updateLines] = useState(2)

    const [text, updateText] = useState(raw)

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <ClampLines text={text} lines={lines} style={{ width: 400, marginRight: 50 }} />

            <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 10 }}>
                    <span>Lines:</span>

                    <Input.Number value={lines} onChange={updateLines} digits={0} width={100} />
                </div>

                <Textarea value={text} onChange={updateText} autoSize />
            </div>
        </div>
    )
}
