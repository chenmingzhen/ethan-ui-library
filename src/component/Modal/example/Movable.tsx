import React from 'react'
import Modal from '@/component/Modal'
import Button from '@/component/Button'

export default () => {
  const [show, setShow] = React.useState(false)
  return (
    <div>
      <Button onClick={() => setShow(true)}>Moveable modal</Button>
      <Modal
        moveable
        resizable
        visible={show}
        title="Moveable"
        onClose={() => setShow(false)}
        footer={<Button onClick={() => setShow(false)}>Confirm</Button>}
      >
        drag title to move
      </Modal>
    </div>
  )
}
