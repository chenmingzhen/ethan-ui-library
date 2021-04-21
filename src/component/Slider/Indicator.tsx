// @ts-nocheck 
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import draggable from '@/hoc/draggable'
import { sliderClass } from '@/styles'

const Indicator = props => {
  const event = useMemo(() => (props.disabled ? undefined : props.onDragStart), [props.disabled, props.onDragStart])
  return <div onMouseDown={event} className={sliderClass('indicator')} />
}

Indicator.propTypes = {
  disabled: PropTypes.bool,
  onDragStart: PropTypes.func.isRequired,
}

export default draggable(memo(Indicator))
