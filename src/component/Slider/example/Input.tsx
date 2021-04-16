import React from 'react'
import Slider from '@/component/Slider'
import Input from '@/component/Input'

const container = {
  display: 'flex',
  alignItems: 'center',
}

const slider = {
  flex: 1,
  marginRight: 28,
}

export default function() {
  const [value, setValue] = React.useState(50)
  return (
    <div style={container}>
      <Slider value={value} onChange={n => setValue(n)} style={slider} />
      <Input.Number width={100} value={value} onChange={n => setValue(n)} />
    </div>
  )
}
