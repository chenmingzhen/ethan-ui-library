import React, { useState } from 'react'
import Button from '@/component/Button'
import Steps from '@/component/Steps'

const Item = Steps.StepItem

export default () => {
  const [current, setCurrent] = useState(0)

  const setSteps = action => {
    // eslint-disable-next-line no-nested-ternary
    const newCurrent = action === 'next' ? (current >= 3 ? 3 : current + 1) : current <= 0 ? 0 : current - 1

    setCurrent(newCurrent)
  }

  return (
    <>
      <Steps current={current}>
        <Item title="步骤1" />
        <Item title="步骤2" />
        <Item title="步骤3" />
        <Item title="步骤4" />
      </Steps>
      <br />
      <Button onClick={setSteps.bind(null, 'next')}>下一步</Button>
      <Button onClick={setSteps.bind(null, 'prev')}>上一步</Button>
    </>
  )
}
