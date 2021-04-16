import React from 'react'
import Slider from '@/component/Slider'

const pad = i => (i < 10 ? `0${i}` : i)
const format = v => {
  const value = v + 540
  const hours = Math.floor(value / 60)
  return `${pad(hours)}:${pad(value - hours * 60)}`
}

export default function() {
  return (
    <Slider
      range
      defaultValue={[33, 216]}
      scale={[0, 60, 120, 180, 240, 300, 360, 420, 480, 540]}
      formatScale={format}
      formatValue={format}
    />
  )
}
