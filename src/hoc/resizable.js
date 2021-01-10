import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { resizableClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import { curry } from '@/utils/func'

export default curry(
  Origin =>
    class Resizable extends React.PureComponent {
      // eslint-disable-next-line react/static-property-placement
      static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
        resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
      }

      constructor(props) {
        super(props)
        this.state = {
          x: 0,
          y: 0,
        }
        this.resizableId = getUidStr()
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
      }

      componentDidMount() {
        this.appendHandler()
      }

      componentDidUpdate() {
        if (this.props.resizable) {
          this.appendHandler()
        }
      }

      componentWillUnmount() {
        if (this.handlers) {
          this.handlers.forEach((action, handler) => handler.removeEventListener('mousedown', action))
        }
      }

      getStyle() {
        const { x, y } = this.state
        if (!this.size) return undefined
        return {
          width: this.size.width + x,
          height: this.size.height + y,
        }
      }

      handleMouseUp() {
        this.active = undefined
        document.removeEventListener('mousemove', this.handleMouseMove)
        document.removeEventListener('mouseup', this.handleMouseUp)
        document.removeEventListener('mouseleave', this.handleMouseUp)
      }

      handleMouseMove(e) {
        let x = e.movementX
        let y = e.movementY
        if (!this.active) return
        this.setState(
          immer(draft => {
            x += draft.x
            y += draft.y
            if (this.active.indexOf('e') >= 0) draft.x = x
            if (this.active.indexOf('s') >= 0) draft.y = y
          })
        )
      }

      handleMouseDown(dir) {
        this.active = dir
        document.addEventListener('mousemove', this.handleMouseMove)
        document.addEventListener('mouseup', this.handleMouseUp)
        document.addEventListener('mouseleave', this.handleMouseUp)
      }

      appendHandler() {
        const { resizable } = this.props
        if (!resizable || this.appended) return
        this.appended = true
        this.el = document.querySelector(`.${resizableClass(this.resizableId)}`)

        if (!this.el) return
        this.size = {
          width: this.el.clientWidth,
          height: this.el.clientHeight,
        }

        this.handlers = new Map()
        // ❗❗❗ different github version
        // 这里添加;的原因是 因为上面Map() 这里是数组 上面又没有 怕压缩出错 加一个分号
        ;['e', 's', 'se'].forEach(dir => {
          const handler = document.createElement('div')
          const action = this.handleMouseDown.bind(this, dir)
          handler.className = resizableClass('handler', `handler-${dir}`)
          handler.addEventListener('mousedown', action)
          this.el.appendChild(handler)
          this.handlers.set(handler, action)
        })
      }

      render() {
        const { resizable, className, style, ...others } = this.props
        if (!resizable) return <Origin {...this.props} />

        const ms = Object.assign({}, style, this.getStyle())
        const mc = classnames(className, resizableClass('_', this.resizableId))

        return <Origin {...others} style={ms} className={mc} />
      }
    }
)
