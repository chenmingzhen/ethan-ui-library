import React from 'react'
import Popover from '@/component/Popover'
import Button from '@/component/Button'

export const Normal = () => (
  <div>
    <Popover style={{ padding: '4px 8px' }}>Some text</Popover>
    Hover
  </div>
)

export const ConfirmDemo = () => (
  <Button>
    <Popover.Confirm
      onCancel={() => {
        console.log('cancel')
      }}
      onOk={() =>
        new Promise(resolve => {
          console.log('ok')
          setTimeout(() => resolve(true), 2000)
        })
      }
      text={{ ok: '确认！ ', cancel: '取消！' }}
    >
      Are you sure delete ?
    </Popover.Confirm>
    Delete
  </Button>
)
