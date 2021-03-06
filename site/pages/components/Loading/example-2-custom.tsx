/**
 * cn - 自定义
 *    -- 自定义加载风格和加载进度
 * en - Customize
 *    -- Customize the loading style and loading schedule
 */

import React from 'react'
import { Loading, Button } from 'ethan/index'

export default () => (
  <div>
    <Button
      onClick={() =>
        Loading.config({
          type: 'line',
          color: '#FF9812',
          height: 25,
        })
      }
    >
      customize
    </Button>
    <Button onClick={() => Loading.upload(30)}>upload(30)</Button>
    <Button onClick={() => Loading.upload(80)}>upload(80)</Button>
  </div>
)
