import React from 'react'
import data from 'doc/data/tree'
import Icon from '@/component/Icon'
import Tree from '../index'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')

function renderItem(node, isExpanded) {
  let icon
  if (!node.children || node.children.length === 0) {
    icon = <FontAwesome name="file-text-o" />
  } else if (isExpanded) {
    icon = <FontAwesome name="folder-open" style={{ color: '#ffd666' }} />
  } else {
    icon = <FontAwesome name="folder" style={{ color: '#ffd666' }} />
  }

  return (
    <span>
      {icon}
      {node.text}
    </span>
  )
}

export default function() {
  return <Tree data={data} keygen="id" renderItem={renderItem} doubleClickExpand />
}
