import React from 'react'
import Cascader from '@/component/Cascader'

const data = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
]

export default function() {
  return <Cascader data={data} absolute keygen="value" renderItem={n => `${n.value}`} compressed />
}
