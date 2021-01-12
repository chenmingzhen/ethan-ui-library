import React from 'react'
import Modal from '@/component/Modal'
import Button from '@/component/Button'
import { getUidStr } from '@/utils/uid'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Modal
        zoom
        title="zoom"
        footer={[
          <Button type="primary" onClick={() => setVisible(false)} key={getUidStr()}>
            Ok
          </Button>,
        ]}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        Set the zoom property to enable zoom animation
      </Modal>
    </div>
  )
}
