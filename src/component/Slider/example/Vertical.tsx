import React from 'react'
import Slider from '@/component/Slider'

const formatTemp = v => `${v}℃`

export default function() {
  return (
    <div>
      <Slider vertical defaultValue={50} />
      <Slider range vertical defaultValue={[12, 70]} />
      <Slider vertical defaultValue={18} scale={[0, 20, 40, 60, 100]} formatValue={false} formatScale={formatTemp} />
      <Slider autoHide range vertical defaultValue={[12, 70]} />
      <Slider disabled range vertical defaultValue={[12, 70]} />
    </div>
  )
}
