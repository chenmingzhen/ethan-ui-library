import React from 'react'
import { messageClass } from '@/styles'
import Alert from '../Alert/alert'
import useMessage from './hooks/useMessage'
import Message from './type'

export interface MessageContainerInstance {
    removeAllMessage(): void

    addMessage(msg: Message): () => void
}

interface MessageContainerProps {
    onDestroy(): void
}

const MessageContainer: React.ForwardRefRenderFunction<MessageContainerInstance, MessageContainerProps> = (
    props,
    ref
) => {
    const { messages, addMessage, closeMessageForAnimation, removeAllMessage } = useMessage(props.onDestroy)

    React.useImperativeHandle(ref, () => ({ removeAllMessage, addMessage }))

    // 退场动画
    function getClassName(position = 'top', dismiss: boolean) {
        return messageClass('item', `item-${dismiss ? 'dismissed' : 'show'}-${position}`)
    }

    // 退场动画的高度等问题
    function getStyle(dismiss: boolean, h: number, position: Message['position']) {
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

    return (
        <>
            {messages.map(({ id, type, content, dismiss, h, title, className, position, closeable }) => (
                <div
                    key={id}
                    className={`${getClassName(position, dismiss)} ${className}`}
                    style={getStyle(dismiss, h, position)}
                >
                    <Alert
                        onClose={closeable}
                        onDismiss={closeMessageForAnimation.bind(this, id)}
                        className={messageClass('msg')}
                        dismiss={dismiss}
                        icon
                        iconSize={title ? 20 : 14}
                        type={type}
                        duration={200}
                    >
                        {title && <h3>{title}</h3>}
                        {content}
                    </Alert>
                </div>
            ))}
        </>
    )
}

export default React.memo(React.forwardRef(MessageContainer))
