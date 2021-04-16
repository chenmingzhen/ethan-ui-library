import React from 'react'
import Radio from '@/component/Radio'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

function renderItem(color) {
  const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }
  return <span style={style}>{color}</span>
}

export default function() {
  return <Radio.Group keygen data={data} defaultValue="blue" renderItem={renderItem} />
}
