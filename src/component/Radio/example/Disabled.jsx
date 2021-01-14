import React from 'react'
import Radio from '@/component/Radio'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <div>
      <Radio.Group keygen disabled data={data} defaultValue="blue" renderItem={d => d} />
      <Radio.Group keygen data={data} disabled={d => d === 'yellow'} defaultValue="blue" renderItem={d => d} />
    </div>
  )
}
