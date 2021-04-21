// @ts-nocheck 
import React, { memo, useCallback, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useUpdate } from 'ethan-use-hooks'
import { paginationClass } from '@/styles'
import Input from '../Input'

const inputStyle = { width: 60, display: 'inline-block' }

const Jumper = props => {
  const { total, pageSize, onChange, current, text, size, isSimple } = props
  const autoFocus = useRef(false)
  const max = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])
  const update = useUpdate()

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        let tCurrent = parseInt(e.target.value, 10)
        autoFocus.current = true

        // 无穷大
        if (!Number.isFinite(tCurrent)) return
        if (tCurrent < 1) tCurrent = 1

        if (tCurrent > max) tCurrent = max

        if (tCurrent === current) {
          update()
        }

        onChange(tCurrent)
      }
    },
    [onChange, max, current]
  )

  let txt = text.jumper ? text.jumper.split('{input}') : []

  if (isSimple) {
    const spanClass = paginationClass('simple-span')
    txt = [
      [],
      [
        <span key="separator" className={spanClass}>
          /
        </span>,
        <span key="pageMax" className={spanClass}>
          {max}
        </span>,
      ],
    ]
  }

  return (
    <div className={paginationClass('section')}>
      {txt[0]}
      <Input
        value={current}
        autoFocus={autoFocus.current}
        onKeyDown={handleKeyDown}
        digits={0}
        type="number"
        style={inputStyle}
        size={size}
        className={paginationClass(isSimple && 'simple-input')}
        delay={400}
      />
      {txt[1]}
    </div>
  )
}

Jumper.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
  size: PropTypes.string,
  isSimple: PropTypes.bool,
}

export default memo(Jumper)
