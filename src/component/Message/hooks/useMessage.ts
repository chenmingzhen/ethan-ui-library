import { getUidStr } from '@/utils/uid'
import useImmerGetSet from '@/hooks/useImmerGetSet'
import Message from '../type'

const useMessage = (onDestroy?: () => void) => {
    const [getMessages, setMessages] = useImmerGetSet<Message[]>([])

    function addMessage(msg: Message): () => void {
        const id = getUidStr()

        setMessages(draft => {
            draft.push(Object.assign({ id }, msg))
        })

        // message退场时间
        if (msg.duration > 0) {
            setTimeout(() => {
                setMessages(draft => {
                    draft.forEach(m => {
                        if (m.id === id) {
                            // 执行callbackcloseMessageForAnimation
                            m.dismiss = true
                        }
                    })
                })
            }, msg.duration * 1000)
        }

        return manualCloseMsg.bind(this, id)
    }

    function manualCloseMsg(id) {
        setMessages(draft => {
            draft.filter(m => {
                if (m.id !== id) return true

                m.dismiss = true

                return false
            })
        })
    }

    // 根据alert的动画处理回调函数 手动处理动画
    function closeMessageForAnimation(...args) {
        const [id, duration, msgHeight] = args
        if (!duration) {
            this.removeMessage(id)
            return
        }

        setMessages(draft => {
            draft.forEach(m => {
                if (m.id === id) {
                    m.dismiss = true
                    // messageHeight + messageMargin
                    m.h = msgHeight + 20
                }
            })
        })

        // 动画执行完毕 移除message
        setTimeout(() => {
            removeMessage(id)
        }, duration)
    }

    function removeMessage(id) {
        // 存储message的onClose callback
        let callback
        // 使用类组件时 state的message能获取到最新的值 可正常结束动画
        // 但在函数组件的不能获取最新的message
        // 所以使用useImmer+useGetSet的组合
        // immer深拷贝，getset获取最新的值
        const messages = getMessages()

        const currentMessages = messages.filter(m => {
            if (m.id !== id) return true

            if (m.onClose) {
                callback = m.onClose
            }

            return false
        })

        if (currentMessages.length === 0) {
            // 如果为最后一个message 清除装组件的dom容器
            onDestroy?.()
        } else {
            setMessages(currentMessages)
        }

        callback?.()
    }

    function removeAllMessage() {
        const messages = getMessages()

        for (let i = 0; i < messages.length; i++) {
            // 使用唯一id找到对应的message
            const { id } = messages[i]

            setTimeout(() => {
                setMessages(draft => {
                    const find = draft.find(m => m.id === id)

                    if (find) {
                        find.dismiss = true
                    }
                })
            }, i * 200)
        }
    }

    return { messages: getMessages(), addMessage, closeMessageForAnimation, removeAllMessage }
}

export default useMessage
