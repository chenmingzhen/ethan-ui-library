import { getUidStr } from '@/utils/uid'
import useImmerGetSet from '@/hooks/useImmerGetSet'
import React from 'react'
import useRefMethod from '@/hooks/useRefMethod'
import { isFunc } from '@/utils/is'
import Message, { MessageOption } from '../type'

const useMessage = (onDestroy?: () => void) => {
    const [getMessages, setMessages] = useImmerGetSet<Message[]>([])

    const addDismissJob = useRefMethod((id: React.Key, duration: number) => {
        if (duration > 0) {
            const timeout = setTimeout(() => {
                setMessages((draft) => {
                    draft.forEach((m) => {
                        if (m.id === id) {
                            m.dismiss = true
                            m.timer = null
                        }
                    })
                })
            }, duration * 1000)

            return timeout
        }

        return null
    })

    const addMessage = useRefMethod((options: MessageOption): (() => void) => {
        const id = options.id || getUidStr()

        const messages = getMessages()

        const messageIndex = messages.findIndex((message) => message.id === id)

        if (messageIndex > -1) {
            /** 修改Message */
            const oldMessage = messages[messageIndex]

            if (oldMessage && oldMessage.timer) {
                clearTimeout(oldMessage.timer)
            }

            const timer = addDismissJob(id, options.duration)

            setMessages((draft) => {
                const origin = draft[messageIndex]

                draft[messageIndex] = { ...origin, ...options, timer }
            })
        } else {
            /** 新增Message */
            const timer = addDismissJob(id, options.duration)

            setMessages((draft) => {
                draft.push(Object.assign(options, { id, timer }))
            })
        }

        return manualCloseMsg.bind(null, id)
    })

    const manualCloseMsg = useRefMethod((id: React.Key) => {
        setMessages((draft) => {
            draft.forEach((m) => {
                if (m.id !== id) return

                m.dismiss = true
            })
        })
    })

    const closeMessage = useRefMethod((id: React.Key, msgHeight: number) => {
        const transitionDuration = 200

        setMessages((draft) => {
            draft.forEach((m) => {
                if (m.id === id) {
                    m.dismiss = true
                    /** messageHeight + messageMargin */
                    m.h = msgHeight + 20
                }
            })
        })

        // 动画执行完毕 移除message
        setTimeout(() => {
            removeMessage(id)
        }, transitionDuration)
    })

    const removeMessage = useRefMethod((id: React.Key) => {
        const messages = getMessages()

        const nextMessages: Message[] = []

        messages.forEach((message) => {
            if (message.id === id) {
                if (isFunc(message.onClose)) {
                    message.onClose()
                }

                if (message.timer) {
                    clearTimeout(message.timer)
                }

                return
            }

            nextMessages.push(message)
        })

        if (nextMessages.length === 0) {
            /** 如果为最后一个message 清除装组件的dom容器 */
            onDestroy?.()
        } else {
            setMessages(nextMessages)
        }
    })

    const removeAllMessage = useRefMethod(() => {
        const messages = getMessages()

        for (let i = 0; i < messages.length; i++) {
            // 使用唯一id找到对应的message
            const { id } = messages[i]

            setTimeout(() => {
                setMessages((draft) => {
                    const find = draft.find((m) => m.id === id)

                    if (find) {
                        find.dismiss = true
                    }
                })
            }, i * 200)
        }
    })

    return { messages: getMessages(), addMessage, closeMessage, removeAllMessage }
}

export default useMessage
