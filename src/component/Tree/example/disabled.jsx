import React, { Component } from 'react'
import data from 'doc/data/tree'
import Tree from '../index'

export default class extends Component {
  handleChange = value => {
    console.log(value)
  }

  isDisabled = node => node.id === '1-0'

  renderItem = node => `node ${node.id}`

  render() {
    return (
      <Tree
        data={data}
        defaultExpanded={['1', '2']}
        disabled={this.isDisabled}
        keygen="id"
        onChange={this.handleChange}
        renderItem={this.renderItem}
      />
    )
  }
}
