/**
 * cn - 内容
 *    -- 自定义内容
 * en - Content
 *    -- Custom content
 */

import React from 'react'
import { BackTop } from 'ethan/index'

export default () => (
  <BackTop height={300} bottom={180} right={200}>
    <div
      style={{
        background: 'rgb(255, 182, 60)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Up
    </div>
  </BackTop>
)
