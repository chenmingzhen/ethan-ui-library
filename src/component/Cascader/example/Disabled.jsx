import React from 'react'
import Cascader from '@/component/Cascader'
import { cascader as data } from 'doc/data/tree'

const isDisabled = d => d.id === '1-0' || d.id === '2'

export default function() {
  return <Cascader data={data} keygen="id" disabled={isDisabled} mode={2} renderItem={n => `node ${n.text}`} />
}
