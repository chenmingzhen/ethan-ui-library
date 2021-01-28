import React from 'react'
import Transfer from '@/component/Transfer'

const data = []

for (let i = 1; i < 20; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

export default function() {
  return (
    <Transfer onFilter={(t, d) => d.content.indexOf(t) > -1} data={data} format="id" renderItem="content" keygen="id" />
  )
}
