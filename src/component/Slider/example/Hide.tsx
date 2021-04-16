import React from 'react'
import Slider from '@/component/Slider'

export default function() {
  return <Slider autoHide defaultValue={4} scale={[1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]} step={1} />
}
