import React, { Component } from 'react'
import tree from 'doc/data/tree'
import Tree from '../index'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { data: tree }
    this.defaultExpanded = ['1']
  }

  handleDrop = (data, key, targetKey, position) => {
    console.log(data, key, targetKey, position)
    this.setState({ data })
  }

  renderItem = node => (
    <div>
      <span>node </span>
      <span id={`node-id-${node.id}`}>{node.text}</span>
    </div>
  )

  render() {
    return (
      <Tree
        data={this.state.data}
        keygen="id"
        defaultExpanded={this.defaultExpanded}
        onDrop={this.handleDrop}
        dragImageSelector={d => `#node-id-${d.id}`}
        dragImageStyle={{ color: 'red' }}
        renderItem={this.renderItem}
        dragHoverExpand
      />
    )
  }
}
