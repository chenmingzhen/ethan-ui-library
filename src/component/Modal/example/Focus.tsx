import React, { Component } from 'react'
import Modal from '@/component/Modal'
import Button from '@/component/Button'
import Message from '@/component/Message'

export default class extends Component {
  confirm = type => {
    Modal.confirm({
      title: 'This is a confirm message',
      content: `the ${type} button will be focus`,
      text: {
        ok: 'ok',
        cancel: 'cancel',
      },
      onOk: () => {
        Message.info('you chose the ok')
      },
      onCancel: () => {
        Message.info('you chose the cancel')
      },
      autoFocusButton: type,
    })
  }

  render() {
    return (
      <div>
        <Button onClick={this.confirm.bind(this, 'cancel')}>cancel</Button>
        <Button onClick={this.confirm.bind(this, 'ok')}>ok</Button>
      </div>
    )
  }
}
