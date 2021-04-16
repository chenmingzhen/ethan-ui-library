import React from 'react'
import Switch from '@/component/Switch/Switch'
import Button from '@/component/Button'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
    }
  }

  handleToggle = () => {
    this.setState(prev => ({
      disabled: !prev.disabled,
    }))
  }

  render() {
    return (
      <div>
        <Switch disabled={this.state.disabled} />
        <Button style={{ marginLeft: 14 }} type="primary" onClick={this.handleToggle}>
          Toggle
        </Button>
      </div>
    )
  }
}
