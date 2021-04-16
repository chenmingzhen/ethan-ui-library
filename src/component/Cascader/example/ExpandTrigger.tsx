import React from 'react'
import Cascader from '@/component/Cascader'
import { cascader as data } from 'doc/data/tree'

export default function() {
  return (
    <Cascader
      data={data}
      keygen="id"
      expandTrigger="hover-only"
      renderItem={n => `node ${n.text}`}
      renderResult={n => (n.children && n.children.length > 0 ? '' : n.text)}
      style={{ width: 300 }}
    />
  )
}
