import React, { useEffect, useCallback, useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useUpdate } from 'ethan-use-hooks'
import { getProps } from '@/utils/proptypes'
import { getKey } from '@/utils/uid'
import { CHANGE_TOPIC } from '@/utils/Datum/types'
import { checkInputClass } from '@/styles'
import { Provider } from '../Checkbox/context'
import Radio from './Radio'

function RadioGroup(props) {
  // ---------------------------state------------------------------
  const update = useUpdate()
  // ---------------------------lifecycle---------------------------
  useEffect(() => {
    props.datum.subscribe(CHANGE_TOPIC, update)
    return () => {
      props.datum.unsubscribe(CHANGE_TOPIC, update)
    }
  }, [])
  // ----------------------------method------------------------------
  const handleRawChange = useCallback(
    value => {
      props.datum.set(value)
    },
    [props.datum]
  )

  const handleClick = useCallback(
    (val, checked, index) => {
      const { data, datum } = props
      datum.set(data[index])
    },
    [props.data, props.datum]
  )

  const getContent = useCallback(
    d => {
      const { renderItem } = props

      if (typeof renderItem === 'string') {
        return d[renderItem]
      }
      if (typeof renderItem === 'function') {
        return renderItem(d)
      }

      return ''
    },
    [props.renderItem]
  )

  // ----------------------------render------------------------------
  const { block, data, datum, keygen, children, button, size } = props

  const className = useMemo(
    () =>
      classnames(
        checkInputClass(
          'group',
          block && 'block',
          button && 'button',
          button === 'outline' && 'outline',
          button && size
        ),
        props.className
      ),
    [block, button, size, props.className]
  )

  if (data === undefined) {
    return (
      <div className={className}>
        <Provider value={{ onRawChange: handleRawChange, checked: datum.check.bind(datum) }}>{children}</Provider>
      </div>
    )
  }

  return (
    <div className={className}>
      {data.map((d, i) => (
        <Radio
          checked={datum.check(d)}
          disabled={datum.disabled(d)}
          key={getKey(d, keygen, i)}
          htmlValue={i}
          index={i}
          onChange={handleClick}
        >
          {getContent(d)}
        </Radio>
      ))}
      {children}
    </div>
  )
}

RadioGroup.propTypes = {
  ...getProps(PropTypes, 'children', 'keygen', 'size'),
  block: PropTypes.bool,
  data: PropTypes.array,
  button: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  datum: PropTypes.object.isRequired,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

RadioGroup.defaultProps = {
  renderItem: d => d,
}

export default memo(RadioGroup)
