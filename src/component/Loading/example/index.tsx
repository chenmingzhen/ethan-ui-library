import React from 'react'
import Button from '@/component/Button'
import Loading from '@/component/Loading'

export default () => {
  const handleStart = () => {
    Loading.start('line')
  }

  const handleFinish = () => {
    Loading.finish()
  }

  const handleError = () => {
    Loading.error()
  }

  const handleConfig = () => {
    Loading.config({
      type: 'line',
      color: 'green',
      height: 6,
    })
  }

  const handleUpload = () => {
    Loading.upload(50)
  }

  const handleAllScreen = () => {
    Loading.start('three-bounce', 'Loading...')
    setTimeout(() => {
      Loading.finish()
    }, 200000)
  }

  const handleAllScreenConfig = () => {
    Loading.config({
      type: 'wave',
      size: '100px',
      color: '#21F000',
      loadingText: 'Loading...',
    })

    setTimeout(() => {
      Loading.finish()
    }, 200000)
  }

  return (
    <div>
      <Button onClick={handleStart}>start</Button>
      <Button onClick={handleFinish}>finish</Button>
      <Button onClick={handleError}>error</Button>
      <Button onClick={handleConfig}>config</Button>
      <Button onClick={handleUpload}>upload50%</Button>
      <Button onClick={handleAllScreen}>allScreen</Button>
      <Button onClick={handleAllScreenConfig}>allScreenConfig</Button>
    </div>
  )
}
