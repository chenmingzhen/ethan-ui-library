// @ts-nocheck 
import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '@/utils/component'
import { uploadClass } from '@/styles'
import attrAccept from '@/utils/accept'
import Drop from './Drop'

class Dragger extends PureComponent {
  constructor(props) {
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
  }

  getMatchedFile(files = []) {
    const { accept } = this.props
    return Array.prototype.slice.call(files).filter(file => attrAccept(file, accept))
  }

  handleDrop(files) {
    const { addFile } = this.props
    addFile({ files, fromDragger: true })
  }

  render() {
    const { children, disabled, multiple, limit, accept } = this.props
    return (
      <Drop
        className={uploadClass('dragger-wrapper')}
        drop
        disabled={disabled}
        multiple={multiple || limit > 1}
        accept={accept}
        onDrop={this.handleDrop}
      >
        <div className={uploadClass('dragger-area', disabled && 'disabled')}>{children}</div>
      </Drop>
    )
  }
}

Dragger.propTypes = {
  children: PropTypes.any,
  multiple: PropTypes.bool,
  addFile: PropTypes.func,
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  limit: PropTypes.number,
}

export default Dragger
