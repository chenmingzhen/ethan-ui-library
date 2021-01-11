import React, { Component } from 'react'
import Modal from '@/component/Modal'
import Button from '@/component/Button'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  handleClose = () => {
    this.setState({
      visible: false,
    })
  }

  toggle = visible => {
    this.setState({ visible })
  }

  renderFooter() {
    return (
      <div>
        <Button onClick={this.toggle.bind(this, false)}>Cancel</Button>
        <Modal.Submit>Submit</Modal.Submit>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle.bind(this, true)}>click me</Button>
        <Modal
          visible={this.state.visible}
          title="Form"
          position="right"
          onClose={this.toggle.bind(this, false)}
          footer={this.renderFooter()}
        >
          right
        </Modal>
        <Modal
          visible={this.state.visible}
          title="Form"
          position="left"
          onClose={this.toggle.bind(this, false)}
          footer={this.renderFooter()}
        >
          left
        </Modal>
        <Modal
          visible={this.state.visible}
          title="Form"
          position="bottom"
          onClose={this.toggle.bind(this, false)}
          footer={this.renderFooter()}
        >
          bottom
        </Modal>
        <Modal
          visible={this.state.visible}
          title="Form"
          position="top"
          onClose={this.toggle.bind(this, false)}
          footer={this.renderFooter()}
        >
          top
        </Modal>
      </div>
    )
  }
}
