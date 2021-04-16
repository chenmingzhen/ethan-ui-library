import React, { Component } from 'react'
import Button from '@/component/Button'
import Tree from '@/component/Tree'
import data, { allIds } from 'doc/data/tree'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { expanded: ['1'] }

    this.collapseAll = this.handleExpand.bind(this, [])
    this.expandAll = this.handleExpand.bind(this, [...allIds])
  }

  handleExpand = expanded => {
    this.setState({ expanded })
  }

  renderItem = node => `node ${node.id}`

  render() {
    return (
      <div>
        <div style={{ marginBottom: 12 }}>
          <Button onClick={this.expandAll}>Expand all</Button>
          <Button onClick={this.collapseAll}>Collapse all</Button>
        </div>
        <Tree
          data={data}
          keygen="id"
          line={false}
          expanded={this.state.expanded}
          onExpand={this.handleExpand}
          renderItem={this.renderItem}
        />
      </div>
    )
  }
}
