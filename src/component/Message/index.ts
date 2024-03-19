import React from 'react'
import { destroy, getComponent, closeWithAnimation } from './messager'
import { MessageOption } from './type'
import { AlertType } from '../Alert/type'

const create =
    (type: AlertType) =>
    (
        content: React.ReactNode,
        duration = 3,
        options: MessageOption = { position: 'top', className: '', closeable: false }
    ) => {
        const { position = 'top' } = options

        const find = ['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].indexOf(position)

        if (find < 0) {
            console.warn(
                'Ethan message components need a right position ! please select one from top,middle,top-left,top-right,bottom-left,bottom-right,loading'
            )
        }

        let callback

        getComponent(position).then((messager) => {
            callback = messager.addMessage({
                content,
                type,
                duration,
                ...options,
            })
        })

        // 获取容器时异步操作 需要添加setTimeout加入栈中
        return setTimeout.bind(null, () => {
            callback?.()
        }) as () => void
    }

// 导入此依赖就会执行  create (type)=>这个函数  返回闭包
export default {
    show: create('default'),
    success: create('success'),
    info: create('info'),
    warn: create('warning'),
    warning: create('warning'),
    danger: create('danger'),
    error: create('danger'),
    loading: create('loading'),
    close: (position?: Pick<MessageOption, 'position'>) => {
        if (position) destroy(position)
        else {
            ;['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach((c) => {
                destroy(c)
            })
        }
    },
    closeAll: (position?: Pick<MessageOption, 'position'>) => {
        closeWithAnimation(position)
    },
}
