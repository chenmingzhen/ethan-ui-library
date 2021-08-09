import React from 'react'
import { messageClass } from '@/styles'
import Alert from '../Alert'
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
    function handleClassName(position = 'top', dismiss) {
        return messageClass('item', `item-${dismiss ? 'dismissed' : 'show'}-${position}`)
    }

    // 退场动画的高度等问题
    function handleStyle(dismiss, h, position) {
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
            {messages.map(({ id, type, content, dismiss, h, title, className, position }) => (
                <div
                    key={id}
                    className={`${handleClassName(position, dismiss)} ${className}`}
                    style={handleStyle(dismiss, h, position)}
                >
                    <Alert
                        /* 自行处理动画效果 */
                        outAnimation
                        onClose={closeMessageForAnimation.bind(this, id)}
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

export default React.memo(React.forwardRef(MessageContainer))