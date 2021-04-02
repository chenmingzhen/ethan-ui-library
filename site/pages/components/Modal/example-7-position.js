/**
 * cn - 位置（抽屉）
 *    -- 通过 position 可设置 Modal 弹出的位置，这时 Modal 就如 Drawer 一样。现支持 top、right、bottom 和 left 四个位置配置。
 * en - Position
 *    -- Set position property to specify the pop-up position.
 */
import React, { Component } from 'react'
import { Modal, Button, Select } from 'ethan/index'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      position: 'right',
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
    const { position } = this.state
    return (
      <div>
        <Select
          data={['top', 'right', 'bottom', 'left']}
          value={position}
          style={{ width: 100, marginRight: 12 }}
          keygen
          onChange={p => this.setState({ position: p })}
        />
        <Button onClick={this.toggle.bind(this, true)}>click me</Button>
        <Modal
          visible={this.state.visible}
          title="Form"
          key={position}
          position={position}
          onClose={this.toggle.bind(this, false)}
          footer={this.renderFooter()}
        >
          <div>Util Form Finish</div>
        </Modal>
      </div>
    )
  }
}
