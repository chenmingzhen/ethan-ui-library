import { useCallback } from 'react'
import useImmer from '@/hooks/useImmer'
import { getUidStr } from '@/utils/uid'

interface Message {
  id: string

  type: 'success' | 'warn' | 'info' | 'error'

  content: string

  dismiss: boolean

  h: number

  title: string

  className?: string

  position: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

  onClose(): void
}

const useMessage = (type, onDestroy) => {
  const [messages, setMessages] = useImmer<Message[]>([])

  const addMessage = useCallback(
    msg => {
      const id = getUidStr()

      // 大于5个的时候自动dismiss第一个
      if (messages.length > 5) {
        setMessages(draft => {
          draft[0].dismiss = true
        })
      }

      setMessages(draft => {
        draft.push(Object.assign({ id }, msg))
      })

      // message退场时间
      if (msg.loading > 0 && type !== 'loading') {
        setTimeout(() => {
          setMessages(draft => {
            draft.forEach(m => {
              if (m.id === id) m.dismiss = true
            })
          })
        }, msg.duration * 1000)
      }

      // loading类型处理

      return removeLoadingMessage.bind(null, id)
    },
    [type]
  )

  // 普通类型Message
  const removeMessage = useCallback(
    (id: string) => {
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
    },
    [onDestroy]
  )

  // 移除Loading的Message
  const removeLoadingMessage = useCallback(id => {
    setMessages(draft => {
      draft.filter(m => {
        if (m.id !== id) return true

        m.dismiss = true

        return false
      })
    })
  }, [])

  const removeAllMessage = useCallback(() => {
    setMessages(draft => {
      draft.forEach(m => {
        m.dismiss = true
      })
    })
  }, [])

  // 根据alert的动画处理回调函数 手动处理动画
  const closeMessageForAnimation = useCallback(([id, duration, msgHeight]) => {
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
  }, [])

  return { messages, addMessage, removeAllMessage, closeMessageForAnimation }
}

export default useMessage
