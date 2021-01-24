import React from 'react'
import Slider from '@/component/Slider'

export default function() {
  return (
    <>
      <Slider range defaultValue={[0.05, 0.25]} scale={[0, 1]} step={0.05} />
      <Slider
        formatValue={false}
        scale={[0.8, 1, 1.2, 1.4, 1.7, 2, 2.4, 2.8, 3.3, 4, 4.8, 5.6, 6.7, 8, 9.5, 11, 13, 16]}
        step={0}
      />
    </>
  )
}
