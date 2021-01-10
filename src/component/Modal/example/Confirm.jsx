import React, { Component } from 'react'
import Button from '@/component/Button'
import Modal from '@/component/Modal'

export default class extends Component {
  confirm = () => {
    Modal.confirm({
      title: 'This is a confirm message',
      content: 'this is some information that user confirm',
      onOk: () =>
        new Promise(resolve => {
          console.log('yes i know')
          setTimeout(() => resolve(true), 2000)
        }),
      text: { ok: 'Yes', cancel: 'No' },
    })
  }

  render() {
    return (
      <div>
        <Button onClick={this.confirm}>confirm</Button>
      </div>
    )
  }
}
