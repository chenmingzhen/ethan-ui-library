/**
 * cn -
 *    -- 当元素高度超过最大宽度，才会显示滚动条。。
 * en -
 *    -- The scrollbar is displayed only when the element height exceeds the max width.
 */
import React, { useState } from 'react'
import { Scroll, Button } from 'ethan-ui'

const ScrollItem = ({ children }) => (
    <div
        style={{
            display: 'flex',
            width: 100,
            height: 50,
            margin: 10,
            background: '#fef0f0',
            color: '#f56c6c',
            borderRadius: 4,
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        {children}
    </div>
)

export default function () {
    const [count, setCount] = useState(3)

    function handleAdd() {
        setCount(count + 1)
    }

    function handleDelete() {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    return (
        <div>
            <Scroll scroll="x" maxWidth={700} symbol={count}>
                <div style={{ display: 'flex' }}>
                    {[...new Array(count).keys()].map((none, index) => (
                        <ScrollItem key={index}>{index}</ScrollItem>
                    ))}
                </div>
            </Scroll>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleAdd}>Add Item</Button>

                <Button onClick={handleDelete}>Delete Item</Button>
            </div>
        </div>
    )
}
