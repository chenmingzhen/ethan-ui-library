import React from 'react'
import Radio from '@/component/Radio'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  const [current, setCurrent] = React.useState('red')
  return (
    <Radio.Group keygen value={current} onChange={c => setCurrent(c)}>
      {data.map(d => (
        <span
          key={d}
          onClick={() => {
            if (current === d) setTimeout(() => setCurrent(undefined))
          }}
        >
          <Radio htmlValue={d}>{d}</Radio>
        </span>
      ))}
    </Radio.Group>
  )
}
