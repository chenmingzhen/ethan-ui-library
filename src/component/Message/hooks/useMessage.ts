import { useCallback } from 'react'
import useImmer from '@/hooks/useImmer'
import { getUidStr } from '@/utils/uid'
import { AlertType } from '../../Alert/alert'

export interface Message {
  id?: string

  type?: AlertType

  content?: string

  dismiss?: boolean

  h?: number

  title?: string | number

  className?: string

  position?: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

  onClose?(): void

  duration?: number

  top?: string
}

const useMessage = onDestroy => {
  const [messages, setMessages] = useImmer<Message[]>([])

  const addMessage = (msg: Message) => {
    const id = getUidStr()

    setMessages(draft => {
      draft.push(Object.assign({ id }, msg))
    })

    // message退场时间
    if (msg.duration > 0) {
      setTimeout(() => {
        setMessages(draft => {
          draft.forEach(m => {
            if (m.id === id) m.dismiss = true
          })
        })
      }, msg.duration * 1000)
    }

    // 仅为Loading时有效
    // 返回移除消息回调
    return removeLoadingMessage.bind(null, id)
  }

  // 普通类型Message
  const removeMessage = (id: string) => {
    // 存储message的onClose callback
    let callback

    const newMessages = messages.filter(m => {
      if (m.id !== id) return true

      if (m.onClose) callback = m.onClose

      return false
    })

    if (newMessages.length === 0) {
      // 如果为最后一个message 清除装组件的dom容器
      onDestroy?.()
    } else {
      setMessages(newMessages)
    }

    callback?.()
  }

  // 移除Loading的Message
  const removeLoadingMessage = id => {
    setMessages(draft => {
      draft.filter(m => {
        if (m.id !== id) return true

        m.dismiss = true

        return false
      })
    })
  }

  const removeAllMessage = () => {
    setMessages(draft => {
      draft.forEach(m => {
        m.dismiss = true
      })
    })
  }

  // 根据alert的动画处理回调函数 手动处理动画
  const closeMessageForAnimation = (...args) => {
    const [id, duration, msgHeight] = args

    if (!duration) {
      removeMessage(id)

      return
    }

    setMessages(draft => {
      draft.forEach(m => {
        if (m.id === id) {
          m.dismiss = true
          m.h = msgHeight + 20 // messageHeight + messageMargin  固定 非ant的不断往上风格
        }
      })
    })

    // 动画执行完毕 移除message
    setTimeout(() => {
      removeMessage(id)
    }, duration)
  }

  return { messages, addMessage, removeAllMessage, closeMessageForAnimation }
}

export default useMessage
