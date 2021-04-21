// @ts-nocheck 
import { memo, useRef } from 'react'
import Render from 'react-dom'
import PropTypes from 'prop-types'
import { useUpdateEffect, useUnmount, useMount } from 'ethan-use-hooks'

const Transfer = props => {
  const { transfer, docOnClick, onResize, onScroll, children } = props

  const popup = useRef()

  const renderPortal = () => {
    transfer && Render.render(children, popup.current)
  }

  useMount(() => {
    if (transfer) {
      popup.current = document.createElement('span')
      document.body.appendChild(popup.current)
      renderPortal()

      onScroll && window.addEventListener('scroll', onScroll)
      onResize && window.addEventListener('resize', onResize)
      docOnClick && document.addEventListener('click', docOnClick)
    }
  })

  useUpdateEffect(() => renderPortal())

  useUnmount(() => {
    if (transfer) {
      Render.unmountComponentAtNode(popup.current)
      document.body.removeChild(popup.current)
      onScroll && window.removeEventListener('scroll', onScroll)
      onResize && window.removeEventListener('resize', onResize)
      docOnClick && document.removeEventListener('click', docOnClick)
    }
  })

  return !transfer ? children : null
}

export default memo(Transfer)

Transfer.defaultProps = {
  transfer: true,
}
Transfer.propTypes = {
  docOnClick: PropTypes.func,
  onResize: PropTypes.func,
  onScroll: PropTypes.func,
  transfer: PropTypes.bool,
  in: PropTypes.bool,
}
