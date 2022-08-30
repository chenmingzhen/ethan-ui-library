import React from 'react'
import { getUidStr } from '@/utils/uid'
import { open, close, destroy } from './events'
import { ModalProps } from './type'

class Modal extends React.Component<ModalProps> {
    id = getUidStr()

    static defaultProps = {
        usePortal: true,
        visible: false,
    }

    get option() {
        const { children, usePortal, visible, ...props } = this.props

        return {
            ...props,
            content: children,
        }
    }

    componentDidMount() {
        if (this.props.visible && !this.props.usePortal) {
            open(this.id, this.option, false)
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.visible) return true

        // 当visiable改变时 从这里卡住render 执行关闭相关
        close(this.id, { ...this.props })

        return false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible && !this.props.usePortal) {
            open(this.id, this.option, false)
        }
    }

    componentWillUnmount() {
        const { usePortal } = this.props

        close(this.id, { ...this.props })

        destroy(this.id, !usePortal)
    }

    render() {
        const { usePortal, visible } = this.props

        // render函数中的ReactNode会被缓存  open中的panel
        if (visible && usePortal) return open(this.id, this.option, true)

        return null
    }
}

export default Modal
