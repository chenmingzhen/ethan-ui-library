/**
 * cn - 最大值
 *    -- 当元素高度超过最大高度，才会显示滚动条。
 * en - Max
 *    -- The scrollbar is displayed only when the element height exceeds the max height.
 */
import React, { useState } from 'react'
import { Scroll, Alert, Button } from 'ethan-ui'

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
            <Scroll maxHeight={300} scroll="y" symbol={count}>
                {[...new Array(count).keys()].map((none, index) => (
                    <Alert type="info" style={{ textAlign: 'center' }} key={index}>
                        {index}
                    </Alert>
                ))}
            </Scroll>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Button onClick={handleAdd}>Add Item</Button>

                <Button onClick={handleDelete}>Delete Item</Button>
            </div>
        </div>
    )
}
