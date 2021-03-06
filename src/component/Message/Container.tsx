import React from 'react'
import immer from 'immer'
import { messageClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import { PureComponent } from '@/utils/component'
import Alert from '../Alert'
import { AlertType } from '../Alert/alert'

interface Message {
    id?: string

    /**
     * message 类型
     */
    type?: AlertType

    /**
     * message 内容
     */
    content?: React.ReactNode

    /**
     * 是否消失
     */
    dismiss?: boolean

    /**
     * 高度 用于dismiss
     */
    h?: number

    /**
     * Message 标题
     */
    title?: string | number

    className?: string

    /**
     * Message出现的位置
     */
    position?: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

    onClose?(): void

    /**
     * Message显示时长
     */
    duration?: number
}

interface ContainerProps {
    onDestroy(): void
}

interface ContainerState {
    messages: Message[]
}

class Container extends PureComponent<ContainerProps, ContainerState> {
    static displayName = 'EthanMessage'

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
        }

        this.removeMessage = this.removeMessage.bind(this)
    }

    // 退场动画
    handleClassName = (position = 'top', dismiss) => {
        return messageClass('item', `item-${dismiss ? 'dismissed' : 'show'}-${position}`)
    }

    // 退场动画的高度等问题
    handleStyle = (dismiss, h, position) => {
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

    addMessage(msg: Message) {
        const id = getUidStr()

        this.setState(
            immer(state => {
                state.messages.push(Object.assign({ id }, msg))
            })
        )

        // message退场时间
        if (msg.duration > 0) {
            setTimeout(() => {
                this.setState(
                    immer(state => {
                        state.messages.forEach(m => {
                            if (m.id === id) {
                                // 执行callbackcloseMessageForAnimation
                                m.dismiss = true
                            }
                        })
                    })
                )
            }, msg.duration * 1000)
        }

        return this.manualCloseMsg.bind(this, id)
    }

    manualCloseMsg(id) {
        this.setState(
            immer(state => {
                state.messages.filter(m => {
                    if (m.id !== id) return true
                    m.dismiss = true
                    return false
                })
            })
        )
    }

    removeMessage(id) {
        // 存储message的onClose callback
        let callback
        const messages = this.state.messages.filter(m => {
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

    // 根据alert的动画处理回调函数 手动处理动画
    closeMessageForAnimation(...args) {
        const [id, duration, msgHeight] = args
        if (!duration) {
            this.removeMessage(id)
            return
        }

        // duration animation duration time
        this.setState(
            immer(state => {
                state.messages.forEach(m => {
                    if (m.id === id) {
                        m.dismiss = true
                        m.h = msgHeight + 20 // messageHeight + messageMargin  固定 非ant的不断往上风格
                    }
                })
            })
        )
        // 动画执行完毕 移除message
        setTimeout(() => {
            this.removeMessage(id)
        }, duration)
    }

    removeAllMessage() {
        for (let i = 0; i < this.state.messages.length; i++) {
            // setState不一定能获取到最新的 使用唯一id找到对应的message
            const { id } = this.state.messages[i]

            setTimeout(() => {
                this.setState(
                    immer(state => {
                        const find = state.messages.find(m => m.id === id)

                        if (find) {
                            find.dismiss = true
                        }
                    })
                )
            }, i * 200)
        }
    }

    render() {
        const { messages } = this.state
        return (
            <>
                {messages.map(({ id, type, content, dismiss, h, title, className, position }) => (
                    <div
                        key={id}
                        className={`${this.handleClassName(position, dismiss)} ${className}`}
                        style={this.handleStyle(dismiss, h, position)}
                    >
                        <Alert
                            /* 自行处理动画效果 */
                            outAnimation
                            onClose={this.closeMessageForAnimation.bind(this, id)}
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
                ))}
            </>
        )
    }
}

export default Container
