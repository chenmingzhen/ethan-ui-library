import React from 'react'
import Modal from '@/component/Modal'
import Button from '@/component/Button'

export default function() {
  function info() {
    Modal.info({
      title: 'This is a info message',
      content: 'this is  some information that user must know',
    })
  }

  function success() {
    Modal.success({
      title: 'This is a success message',
      content: 'this is some information that user successful operation',
    })
  }

  function warning() {
    Modal.warn({
      title: 'This is a warning message',
      content: 'this is  some information that user must know',
    })
  }

  function error() {
    Modal.error({
      title: 'This is a error message',
      content: 'this is some information that user attended',
    })
  }

  function show() {
    Modal.show({
      title: 'This is a message',
      content: 'this is show information',
    })
  }

  return (
    <div>
      <Button onClick={info}>info</Button>
      <Button onClick={success}>success</Button>
      <Button onClick={warning}>warning</Button>
      <Button onClick={error}>error</Button>
      <Button onClick={show}>show</Button>
    </div>
  )
}
