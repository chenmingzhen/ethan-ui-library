/**
 * cn - 移动
 *    -- 移动到指定的位置
 * en - Go
 *    -- Go to the specified progress
 */

import React from 'react'
import { Loading, Button } from 'ethan-ui'

export default () => (
    <div>
        <Button
            onClick={() => {
                Loading.go(20)
            }}
        >
            upload(25)
        </Button>
        <Button
            onClick={() => {
                Loading.go(80)
            }}
        >
            upload(70)
        </Button>
        <Button
            onClick={() => {
                Loading.go(100)
            }}
        >
            upload(100)
        </Button>
    </div>
)
