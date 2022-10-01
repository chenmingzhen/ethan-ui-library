/**
 * cn - 多层 Modal
 *    -- 支持多层叠加 Modal
 * en - Multistage
 *    -- Multi-layer Modal
 */
import React, { useState } from 'react'
import { Modal, Button } from 'ethan-ui'

const pickNumber = (max = 65555, min = 0, fixed = 2) => {
    if (typeof max === 'string') max = parseInt(max, 10)
    if (typeof min === 'string') min = parseInt(min, 10)

    const num = Math.random() * (max - min) + min
    return parseFloat(num.toFixed(fixed))
}

const range = (end, start = 0) => {
    return Array.from({ length: end - start }, (v, k) => k + start)
}

const size = range(11, 0).map(() => [pickNumber(600, 450), pickNumber(450, 320)])

export default function() {
    const [current, updateCurrent] = useState(0)

    function show(count) {
        updateCurrent(count)
    }

    return (
        <div>
            <Button onClick={show.bind(this, 1)}>click me</Button>

            {range(11, 1).map(i => (
                <Modal
                    key={i}
                    visible={current >= i}
                    width={size[i][0]}
                    height={size[i][1]}
                    title={`Modal Title ${i}`}
                    onClose={show.bind(this, i - 1)}
                    footer={<Button onClick={show.bind(this, i - 1)}>Close</Button>}
                >
                    {`Level ${i}`}
                    .
                    <br />
                    {i < 10 && (
                        <>
                            <a onClick={show.bind(this, i + 1)}>Next level</a>
                            <br />
                            <br />
                            <a onClick={show.bind(this, 0)}>Close all</a>
                        </>
                    )}
                </Modal>
            ))}
        </div>
    )
}
