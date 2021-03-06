/**
 * cn - 基本用法
 *    -- 开始加载,结束加载和错误加载
 * en - Base
 *    -- Start loading , end loading and error Loading
 */

import React from 'react'
import { Loading, Button } from 'ethan/index'

export default () => (
  <div>
    <Button onClick={() => Loading.start()}>start</Button>
    <Button onClick={() => Loading.finish()} type="success">
      finish
    </Button>
    <Button onClick={() => Loading.error()} type="danger">
      error
    </Button>
  </div>
)
