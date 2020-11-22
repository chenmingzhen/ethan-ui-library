import React from 'react'
import ToolTip from '@/component/Tooltip'

const Demo = () => (
  <>
    <ToolTip tip="Some text." trigger="click" position="right" style={{ fontSize: '20px', background: 'orange' }}>
      <span>Show Tooltip</span>
    </ToolTip>
    <ToolTip tip="Some text." trigger="click" position="left">
      <span>Show Tooltip</span>
    </ToolTip>
  </>
)

export default Demo
