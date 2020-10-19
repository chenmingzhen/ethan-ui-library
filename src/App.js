import React from 'react'
import Message from '@/component/Message'

function App() {
  const hide = Message.loading('Hello', 0, {
    onClose: () => {
      console.log('这里取消异步请求')
    },
    position: 'bottom-right',
  })
  return (
    <>
      <div
        onClick={() => {
          hide.then((method) => {
            method()
          })
        }}
      >
        1
      </div>
      <div
        onClick={() => {
          Message.loading('Hello', 0, {
            onClose: () => {
              console.log('这里取消异步请求')
            },
            position: 'bottom-right',
            title: 'Title',
          })
        }}
      >
        2
      </div>
      <div
        onClick={() => {
          Message.loading('Hello', 0, {
            onClose: () => {
              console.log('这里取消异步请求')
            },
            position: 'top-right',
          })
        }}
      >
        3
      </div>
      <div
        onClick={() => {
          Message.closeAll()
        }}
      >
        4
      </div>
    </>
  )
}

export default App
