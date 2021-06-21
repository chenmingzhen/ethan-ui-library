import React from 'react'
import { getUidStr } from '@/utils/uid'
import { open, close, destroy } from './events'
import ModalProps from './type'

interface ModalExtendsProps extends ModalProps {
    usePortal?: boolean

    visible?: boolean
}

class Modal extends React.Component<ModalExtendsProps> {
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
            id: this.id,
        }
    }

    componentDidMount() {
        if (this.props.visible && !this.props.usePortal) {
            open(this.option, false)
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.visible) return true

        // 当visiable改变时 从这里卡住render 执行关闭相关
        close({ ...this.props, id: this.id })

        return false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible && !this.props.usePortal) {
            open(this.option, false)
        }
    }

    componentWillUnmount() {
        const { usePortal } = this.props

        close({ id: this.id, ...this.props })

        destroy(this.id, !usePortal)
    }

    render() {
        const { usePortal, visible } = this.props

        // render函数中的ReactNode会被缓存  open中的panel
        if (visible && usePortal) return open(this.option, true)

        return null
    }
}

export default Modal
