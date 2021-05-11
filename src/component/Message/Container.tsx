import React, { useImperativeHandle, memo, forwardRef } from 'react'
import { messageClass } from '@/styles'
import useMessage, { Message } from './hooks/useMessage'
import Alert from '../Alert'

interface MessageContainerProps {
  onDestroy(): void
}

type Empty = () => void

export interface MessageContainerInstance {
  addMessage(msg: Message): Empty

  removeAllMessage(): void
}

export default memo(
  forwardRef<MessageContainerInstance, MessageContainerProps>(({ onDestroy }, ref) => {
    const { messages, addMessage, removeAllMessage, closeMessageForAnimation } = useMessage(onDestroy)

    const handleClassName = (position = 'top', dismiss) =>
      messageClass('item', `item-${dismiss ? 'dismissed' : 'show'}-${position}`)

    const handleStyle = (dismiss, h, position) => {
      if (!dismiss || h == null) {
        return null
      }
      let styles = {}
      // 退场动画
      switch (position) {
        // 底部的message 退场直接向左或向右 不需要计算高度
        case 'bottom-right':
        case 'bottom-left':
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

    useImperativeHandle(ref, () => ({ addMessage, removeAllMessage }))

    return (
      <>
        {[
          messages.map(({ id, type, content, dismiss, h, title, className, position }) => (
            <div
              key={id}
              className={`${handleClassName(position, dismiss)} ${className}`}
              style={handleStyle(dismiss, h, position)}
            >
              <Alert
                /* 自行处理动画效果 */
                outAnimation
                onClose={closeMessageForAnimation.bind(null, id)}
                className={messageClass('msg')}
                dismiss={dismiss}
                icon
                iconSize={title ? 20 : 14}
                type={type}
              >
                {title && <h3>{title}</h3>}
                {content}
              </Alert>
            </div>
          )),
        ]}
      </>
    )
  })
)
