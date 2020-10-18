import React from "react"
import PropTypes from "prop-types"
import immer from "immer"
import { PureComponent } from "@/utils/component"
import { messageClass } from "@/styles"
import { getUidStr } from "@/utils/uid"
import Alert from "../Alert"

class Container extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }

    this.removeMessage = this.removeMessage.bind(this)

    // 0 false  1 2 true
    // 退场动画
    this.handleClassName = (position = "top", dismiss) =>
      messageClass(
        "item",
        `item-${dismiss ? "dismissed" : "show"}-${position}`
      )

    // 退场动画的高度等问题
    this.handleStyle = (dismiss, h, position) => {
      if (!dismiss || h == null) {
        return null
      }
      let styles = {}
      // 退场动画
      switch (position) {
        // 底部的message 退场直接向左或向右 不需要计算高度
        case "bottom-right":
        case "bottom-left":
          break
        default:
          styles = {
            zIndex: -1,
            opacity: 0,
            marginTop: -h,
          }
          break
      }

      return styles
    }
  }

  addMessage(msg) {
    const id = getUidStr()

    // FIXME 点击过快时 无法响应往上
    // 大于5个的时候自动dismiss第一个 
    if (this.state.messages.length > 5) {
      this.setState(
        immer((state) => {
          state.messages[0].dismiss = true
          console.log(state.messages[0])
        })
      )
    }

    this.setState(
      immer((state) => {
        state.messages.push(Object.assign({ id }, msg))
      })
    )

    // message退场时间
    if (msg.duration > 0) {
      setTimeout(() => {
        this.setState(
          immer((state) => {
            state.messages.forEach((m) => {
              if (m.id === id) {
                // 修改dismiss 触发Alert中的componentDidUpdate的handleClose方法
                // 执行callbackcloseMessageForAnimation
                m.dismiss = true
              }
            })
          })
        )
      }, msg.duration * 1000)
    }
  }

  removeMessage(id) {
    // 存储message的onClose callback
    let callback
    const messages = this.state.messages.filter((m) => {
      if (m.id !== id) return true
      if (m.onClose) {
        callback = m.onClose
      }
      return false
    })

    if (messages.length === 0) {
      // 如果为最后一个message 清除装组件的dom容器
      this.props.onDestroy()
    } else {
      this.setState({ messages })
    }

    if (callback) callback()
  }

  //根据alert的动画处理回调函数 手动处理动画
  closeMessageForAnimation(...args) {
    const [id, duration, msgHeight] = args
    if (!duration) {
      this.removeMessage(id)
      return
    }

    // duration animation duration time
    this.setState(
      immer((state) => {
        state.messages.forEach((m) => {
          if (m.id === id) {
            m.dismiss = true
            m.h = msgHeight + 20 // messageHeight + messageMargin  固定 非ant的不断往上风格
          }
        })
      })
    )
    //动画执行完毕 移除message
    setTimeout(() => {
      this.removeMessage(id)
    }, duration)
  }

  /* 暂时未使用 */
  closeEvent(id, duration) {
    if (duration === 0) {
      return this.removeMessage.bind(this, id)
    }

    return undefined
  }

  removeAllMessage() {
    this.setState(
      immer((state) => {
        state.messages.forEach((c) => {
          c.dismiss = true
        })
      })
    )
  }

  render() {
    const { messages } = this.state
    return [
      messages.map(
        ({ id, type, content, dismiss, h, title, className, position }) => (
          <div
            key={id}
            className={`${this.handleClassName(
              position,
              dismiss
            )} ${className}`}
            style={this.handleStyle(dismiss, h, position)}
          >
            <Alert
              /* 自行处理动画效果 */
              outAnimation
              className={messageClass("msg")}
              dismiss={dismiss}
              /* 自行处理动画效果 */
              onClose={this.closeMessageForAnimation.bind(this, id)}
              icon
              iconSize={title ? 20 : 14}
              type={type}
            >
              {title && <h3>{title}</h3>}
              {content}
            </Alert>
          </div>
        )
      ),
    ]
  }
}

Container.propTypes = {
  onDestroy: PropTypes.func.isRequired,
}

Container.displayName = "EthanMessage"

export default Container
