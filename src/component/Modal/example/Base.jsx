import React from 'react'
import Modal from '@/component/Modal'
import Button from '@/component/Button'
import immer from 'immer'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      content: 1,
    }
    this.show = this.show.bind(this)
  }

  show() {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState(
      immer(draft => {
        draft.visible = false
        draft.content += 1
      })
    )
    console.log('clicked ok!')
  }

  handleCancel = () => {
    this.setState(
      immer(draft => {
        draft.visible = false
        draft.content += 1
      })
    )
    console.log('clicked cancel')
  }

  render() {
    return (
      <div>
        <Button onClick={this.show}>click me</Button>
        <Modal
          visible={this.state.visible}
          width={500}
          title="Modal Title"
          onClose={this.handleCancel}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="ok" type="primary" onClick={this.handleOk}>
              Ok
            </Button>,
          ]}
        >
          {`you are visited ${this.state.content}`}
        </Modal>
      </div>
    )
  }
}
