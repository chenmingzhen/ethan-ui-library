/**
 * cn - 弹出位置
 *    -- 内置了十二个弹出的位置
 * en - Position
 *    -- Twelve pop-up positions are built in.
 */
import React from 'react'
import { Button, Popover } from 'ethan-ui'

const positions = [
    [null, 'bottom-left', 'bottom', 'bottom-right', null],
    ['right-top', null, null, null, 'left-top'],
    ['right', null, null, null, 'left'],
    ['right-bottom', null, null, null, 'left-bottom'],
    [null, 'top-left', 'top', 'top-right', null],
]

const style: React.CSSProperties = {
    width: 100,
    textAlign: 'center',
    lineHeight: '30px',
    margin: 4,
    display: 'inline-block',
    cursor: 'pointer',
}

export default function () {
    return positions.map((row, i) => (
        <div key={i}>
            {row.map((p, j) =>
                p ? (
                    <Popover
                        key={`${i}-${j}`}
                        trigger="mousedown"
                        placement={p}
                        content={<div>Some text</div>}
                        title={p}
                    >
                        <Button style={style}>{p}</Button>
                    </Popover>
                ) : (
                    <div key={j} style={{ ...style, border: 0 }} />
                )
            )}
        </div>
    ))
}
