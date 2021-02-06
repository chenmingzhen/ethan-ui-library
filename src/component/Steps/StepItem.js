import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { stepsClass } from '@/styles'
import { FontAwesome } from '@/component/Icon'

const StepItem = props => {
  const { icon: Icon, title, description, step, status, width, height } = props
  const [showCustomIcon, setShowCustomIcon] = useState(Icon && Icon.type && Icon.type.displayName === 'EthanIcon')

  const style = useMemo(() => {
    const computed = {}

    width ? (computed.width = `${width}%`) : null
    height ? (computed.height = `${height}%`) : null

    return computed
  }, [width, height])

  useEffect(() => {
    if (!Icon) return

    if (!React.isValidElement(Icon)) {
      console.error('Icon is not a valid Icon ,please check you Icon!')

      setShowCustomIcon(false)

      return
    }

    setShowCustomIcon(true)
  }, [Icon])

  return (
    <div className={stepsClass('step-item', `${status}`)} style={style}>
      <div className={stepsClass('step-item-tail')}>
        <i />
      </div>
      <div className={stepsClass('step-item-icon')}>
        {showCustomIcon && Icon}
        {!showCustomIcon && (
          <div className={stepsClass('step-item-icon-inner')}>
            {status !== 'finish' && status !== 'error' && <span>{step}</span>}
            {status === 'finish' && <FontAwesome name="check-square-o" />}
            {status === 'error' && <FontAwesome name="close" />}
          </div>
        )}
      </div>
      <div className={stepsClass('step-item-main')}>
        <div className={stepsClass('step-item-title')}>{title}</div>
        <div className={stepsClass('step-item-description')}>{description}</div>
      </div>
    </div>
  )
}

StepItem.defaultProps = {
  status: 'wait',
}

StepItem.propTypes = {
  step: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.oneOf(['wait', 'process', 'finish', 'error']),
  icon: PropTypes.element,
}

export default React.memo(StepItem)
