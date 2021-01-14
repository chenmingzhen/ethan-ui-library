import React from 'react'
import Textarea from '@/component/Textarea'

const text = `a
u
t
o
s
i
z
e`

const renderInfo = value => {
  if (!value || value.length === 0) return null
  const text2 = `total is  ${value.length}`
  if (value.length <= 20) return text2
  return new Error(text2)
}

export default function() {
  return (
    <>
      <Textarea rows={6} placeholder="input something" resize />
      <div>
        <Textarea rows={2} autosize maxHeight={200} placeholder="autosize" />
        <br />
        <Textarea rows={2} autosize value={text} maxHeight={200} placeholder="autosize" />
      </div>
      <Textarea rows={4} trim placeholder="input something" info={10} />
      <Textarea rows={4} trim placeholder="input something" info={renderInfo} />
    </>
  )
}
