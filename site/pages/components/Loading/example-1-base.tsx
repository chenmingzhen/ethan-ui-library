/**
 * cn - 基本用法
 *    -- 开始加载,结束加载
 * en - Base
 *    -- Start loading and finish loading.
 */

import React from 'react'
import { Loading, Button } from 'ethan/index'

export default () => (
    <div>
        <Button onClick={() => Loading.start()}>start</Button>
        <Button onClick={() => Loading.finish()} type="success">
            finish
        </Button>
    </div>
)
