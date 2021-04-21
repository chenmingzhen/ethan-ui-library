// @ts-nocheck 
import React from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import Item from './Item'

const Prev = props => {
  const { onChange, current, text, disabled, isSimple } = props
  const prev = current - 1
  const className = text.prev || isSimple ? `no-border arrow` : 'arrow'

  return (
    <Item className={className} page={prev} disabled={disabled || prev < 1} onClick={onChange}>
      {text.prev || icons.AngleLeft}
    </Item>
  )
}

Prev.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.object,
  isSimple: PropTypes.bool,
}

Prev.displayName = 'EthanPaginationPrev'

export default React.memo(Prev)
