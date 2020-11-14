import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'

const Demo = () => {
  const [time, setTime] = useState(new Date().getTime())

  const click = useCallback(() => {
    setTime(new Date().getTime())
  }, [time])
  return <div onClick={click}>{time}</div>
}

ReactDOM.render(<Demo />, document.getElementById('root'))
