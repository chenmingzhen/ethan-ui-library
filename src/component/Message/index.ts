import { AlertType } from '@/component/Alert/alert'
import { destroy, getComponent, closeWithAnimation } from './messager'

export interface MessageOption {
    onClose?(): void

    position?: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

    title?: string | number

    className?: string

    top?: string
}

// 构造函数
const create = (type: AlertType) => (content, duration = 3, options: MessageOption = {}) => {
    const { onClose, position = 'top', title, className = '', top = 'auto' } = options

    const find = ['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].indexOf(position)

    if (find < 0) {
        console.warn(
            'Ethan message components need a right position ! please select one from top,middle,top-left,top-right,bottom-left,bottom-right,loading'
        )
    }

    // loading特殊处理
    let callback

    getComponent(position).then(messager => {
        callback = messager.addMessage({
            content,
            duration,
            type,
            onClose,
            title,
            className,
            top,
            position,
        })
    })

    if (type === 'loading') {
        return setTimeout.bind(null, () => {
            callback?.()
        })
    }
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
    close: position => {
        if (position) destroy(position)
        else {
            ;['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(c => {
                destroy(c)
            })
        }
    },
    closeAll: position => {
        closeWithAnimation(position)
    },
}
