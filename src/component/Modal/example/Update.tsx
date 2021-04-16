import React, { useState } from 'react'
import Modal from '@/component/Modal'
import Button from '@/component/Button'

export default () => {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setShow(!show)
        }}
      >
        click me
      </Button>
      <Modal
        visible={show}
        width={500}
        title="Modal Title"
        onClose={() => {
          setShow(false)
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setShow(false)
            }}
          >
            Cancel
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              setShow(false)
            }}
          >
            Ok
          </Button>,
        ]}
      >
        <div
          onClick={() => {
            setCount(count + 1)
          }}
        >
          count:
          {count}
        </div>
      </Modal>
    </>
  )
}
