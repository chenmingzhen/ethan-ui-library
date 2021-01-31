import React from 'react'
import Cascader from '@/component/Cascader'
import Radio from '@/component/Radio'
import { cascader as data } from 'doc/data/tree'

const modeList = [
  { value: 0, text: 'mode=0 (full)' },
  { value: 1, text: 'mode=1 (half)' },
  { value: 2, text: 'mode=2 (child only)' },
  { value: 3, text: 'mode=3 (shallow)' },
]

function getValue(list, value) {
  const [node] = list
  if (!node) return
  value.push(node.id)
  if (node.children) getValue(node.children, value)
}

export default class extends React.Component {
  constructor(props) {
    super(props)

    const value = []

    getValue(data, value)

    this.state = { mode: 1, value }
  }

  handleChange = value => {
    this.setState({ value })
  }

  handleModeChange = mode => {
    this.setState({ mode, value: [] })
  }

  renderItem = node => `node ${node.id}`

  render() {
    const { mode, value } = this.state

    return (
      <div>
        <Radio.Group
          keygen="value"
          value={mode}
          format="value"
          onChange={this.handleModeChange}
          data={modeList}
          renderItem="text"
        />

        <br />

        <Cascader
          data={data}
          keygen="id"
          mode={mode}
          onChange={this.handleChange}
          renderItem={this.renderItem}
          value={value}
        />
      </div>
    )
  }
}
