import React from 'react'
import ReactDOM from 'react-dom'
import { messageClass } from '@/styles'
import MessageContainer, { MessageContainerInstance } from './MessageContainer'
import { MessagePositionType } from './type'

// 存放同一position类型的div容器
const elements = new Map<string, HTMLDivElement>()
// 存放同一position类型的组件容器
const components = new Map<string, MessageContainerInstance>()

function getElement(type: MessagePositionType) {
    const div = document.createElement('div')

    div.className = messageClass('_', type)

    document.body.appendChild(div)

    elements.set(type, div)

    return div
}

export function destroy(type: MessagePositionType) {
    // 卸载组件 装组件的容器
    if (elements.has(type)) {
        const element = elements.get(type)
        ReactDOM.unmountComponentAtNode(element)
        document.body.removeChild(element)

        elements.delete(type)
    }

    if (components.has(type)) {
        components.delete(type)
    }
}

export function closeWithAnimation(type: MessagePositionType) {
    if (type) {
        const container = components.get(type)

        if (container) container.removeAllMessage()
    } else {
        components.forEach((container) => {
            container.removeAllMessage()
        })
    }
}

export function getComponent(type: MessagePositionType): Promise<MessageContainerInstance> {
    return new Promise((resolve) => {
        const component = components.get(type)

        // 判断有无这个type(position)的容器  每个type对应一个所有组件容器
        if (component) {
            resolve(component)
        } else {
            // 如果该position为第一次创建 则resolve Container的实例回去
            ReactDOM.render(
                <MessageContainer
                    /* resolve这个实例回去 并记录在组件容器中 */
                    ref={(comp) => {
                        components.set(type, comp)
                        resolve(comp)
                    }}
                    onDestroy={() => {
                        destroy(type)
                    }}
                />,
                getElement(type)
            )
        }
    })
}
