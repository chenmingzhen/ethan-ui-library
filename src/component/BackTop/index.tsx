// @ts-nocheck 
import React, { useRef, useState, memo } from 'react'
import PropTypes from 'prop-types'
import { backTopClass } from '@/styles'
import { FontAwesome } from '@/component/Icon'
import Transition from '@/component/Transition'
import { useUnmount } from 'ethan-use-hooks'
import Transfer from './transfer'

const BackTop = props => {
  const [visible, setVisible] = useState(false)
  const backTopTimer = useRef()
  const isUnmount = useRef(false)
  const { right, bottom } = props

  const onScroll = () => {
    const top = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY
    const newVisible = top >= props.height
    !isUnmount.current && setVisible(newVisible)
  }

  const onClick = () => {
    props.onClick && props.onClick()

    if (backTopTimer.current) {
      clearInterval(backTopTimer.current)
    }

    const height = 80

    backTopTimer.current = setInterval(() => {
      const oTop = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY
      if (oTop > 0) {
        document.documentElement.scrollTop = oTop - height
        document.body.scrollTop = document.documentElement.scrollTop

        if (window.setScroll) window.setScroll(-height)
      } else {
        clearInterval(backTopTimer.current)
      }

      // if (height <= 15) height = 15
      // else height -= 1
    }, 10)
  }

  const style = { right: `${right}px`, bottom: `${bottom}px` }

  useUnmount(() => {
    isUnmount.current = true
    if (backTopTimer.current) clearInterval(backTopTimer.current)
  })

  return (
    <Transfer onScroll={onScroll}>
      <Transition show={visible}>
        <div className={backTopClass('_')} onClick={onClick} style={style}>
          {props.children ? (
            props.children
          ) : (
            <div className={backTopClass('content')}>
              <FontAwesome name="angle-double-up" />
            </div>
          )}
        </div>
      </Transition>
    </Transfer>
  )
}

BackTop.defaultProps = {
  height: 100,
}
BackTop.propTypes = {
  onClick: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

BackTop.displayName = 'EthanBackTop'

export default memo(BackTop)
