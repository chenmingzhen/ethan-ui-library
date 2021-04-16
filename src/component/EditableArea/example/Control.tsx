import React, { useState } from 'react'
import EditableArea from '@/component/EditableArea'

export default function() {
  const [value, setValue] = useState('')
  return (
    <EditableArea
      value={value}
      placeholder="Input something"
      onChange={val => {
        setValue(val)
      }}
      width={400}
      onBlur={() => {
        console.log('EditableArea: onBlur')
      }}
    />
  )
}
