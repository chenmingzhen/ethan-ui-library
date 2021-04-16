import React from 'react'
import Rate from '../index'

const text = ['A', 'B', 'C', 'D', 'E']
const front = text.map(t => <span style={{ color: 'red' }}>{t}</span>)
const TextRate = Rate(text, front)

export default function() {
  return <TextRate repeat={false} defaultValue={2} />
}
