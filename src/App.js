import React from 'react'
// 外部css
// import './index.css'
import ImageExample from '@/component/Image/example/imageExample'
import ButtonExample from '@/component/Button/example'
import Message from '@/component/Message'

function App() {
  return (
    <>
      <div
        onClick={() => {
          Message.success('Hello world')
        }}
      >
        1
      </div>
      <ButtonExample />
      <ImageExample />
    </>
  )
}

export default App
