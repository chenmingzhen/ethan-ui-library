import React from 'react'
import Transfer from '@/component/Transfer'

const data = []

for (let i = 0; i < 10000; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

export default function() {
  return <Transfer data={data} format="id" renderItem="content" keygen="id" titles={['Source', 'Target']} />
}
