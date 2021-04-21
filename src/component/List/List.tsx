// @ts-nocheck 
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '@/utils/proptypes'
import { listClass } from '@/styles'

class List extends Component {
  render() {
    const className = classnames(listClass('_'), this.props.className)
    const { show, getRef, ...props } = this.props
    // children in here
    return <div ref={getRef} {...props} className={className} style={this.props.style} />
  }
}

List.propTypes = {
  ...getProps(PropTypes),
  show: PropTypes.bool,
}

List.defaultProps = {
  ...defaultProps,
  show: false,
}

List.displayName = 'EthanList'

export default List
