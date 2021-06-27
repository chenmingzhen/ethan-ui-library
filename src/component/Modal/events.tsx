import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Button from '@/component/Button'
import { getUidStr } from '@/utils/uid'
import { modalClass } from '@/styles'
import { getLocale } from '@/locale'
import { defer } from '@/utils/uid'
import ready from '@/utils/dom/ready'
import Panel from './Panel'
import ModalProps from './type'

interface ContainerMap {
    [id: string]: {
        div: HTMLElement

        container: HTMLElement

        props: EventOption

        visible?: boolean
    }
}

interface EventOption extends ModalProps {
    content: React.ReactNode

    id: string
}

const containers: ContainerMap = {}

// less进退场动画时间为300
const DURATION = 300

const getDiv = id => containers[id]?.div

// 默认为body
const getContainer = id => containers[id]?.container

// 是否有Modal显示中
const hasVisible = () => Object.keys(containers).some(k => containers[k].visible)

// 是否为遮罩
const shoudldAddMaskOpacity = id => {
    const ids = Object.keys(containers).filter(k => containers[k].visible)

    return ids.length === 0 ? true : ids[0] === id
}

// portal状态直接移除
const destroy = (id, unmount) => {
    const div = getDiv(id)
    const container = getContainer(id)

    if (!div || !container) return

    delete containers[id]

    // 从 DOM 中移除已经挂载的 React 组件，清除相应的事件处理器和 state。
    // 如果在 container 内没有组件挂载，这个函数将什么都不做。
    // 如果组件成功移除，则返回 true；如果没有组件被移除，则返回 false。

    unmount && ReactDOM.unmountComponentAtNode(div)

    container.removeChild(div)
}

const close = (props: Omit<EventOption, 'content'>) => {
    const { id } = props

    const modal = containers[props.id]

    if (!modal || modal.visible === false) return

    modal.visible = false

    const { div } = modal

    div.classList.remove(modalClass('show'), modalClass('start'))

    if (!props.position) div.classList.add(modalClass('end'))

    setTimeout(() => {
        div.style.display = 'none'
        div.classList.remove(modalClass('end'))

        props.destroy && destroy(id, !props.usePortal)

        if (!hasVisible()) {
            const doc = document.body.parentNode as HTMLElement

            doc.style.overflow = ''
            doc.style.paddingRight = ''
        }
    }, DURATION)
}

// 创建divDOM
const createDiv = (props: EventOption) => {
    const { id, position, container = document.body, rootClassName } = props
    let div = getDiv(id)

    if (div) return div

    const parent = typeof container === 'function' ? container() : container

    if (!(parent instanceof HTMLElement))
        throw new TypeError('Container must be HTMLElement,please check your attr of container')

    div = document.createElement('div')
    parent.appendChild(div)
    div.className = classnames(modalClass('_', position && 'position'), rootClassName)

    // 存储当前Modal的信息
    containers[id] = { div, container: parent, props }

    return div
}

const open = (props: EventOption, usePortal?: boolean) => {
    const { content, onClose, zIndex, ...otherProps } = props

    const div = createDiv(props)

    div.style.display = 'block'

    div.style.zIndex = String(zIndex)

    const html = document.body.parentNode as HTMLElement

    // 滚动条宽度
    const scrollWidth = window.innerWidth - document.body.clientWidth

    html.style.overflow = 'hidden'
    html.style.paddingRight = `${scrollWidth}px`

    const handleClose = () => {
        onClose?.()

        !usePortal && close(props)
    }

    const opacity = props.maskOpacity ?? 0.25

    const maskOpacity = shoudldAddMaskOpacity(props.id) ? opacity : 0

    div.style.background = props.maskBackground || `rgba(0,0,0,${maskOpacity})`

    containers[props.id].visible = true

    defer(() => {
        !otherProps.position && div.classList.add(modalClass('start'))
    })

    setTimeout(() => {
        div.classList.add(modalClass('show'))
    }, 100)

    // https://developer.mozilla.org/ja/docs/Web/API/Document/activeElement
    ;(document.activeElement as HTMLElement)?.blur()

    const panel = (
        <Panel {...otherProps} onClose={handleClose} container={div}>
            {content}
        </Panel>
    )

    if (usePortal) {
        return ReactDOM.createPortal(panel, div)
    }

    ReactDOM.render(panel, div)

    return null
}

const createModalMethod = type => option => {
    let props = Object.assign(
        {
            width: 420,
            esc: true,
        },
        option,
        {
            id: getUidStr(),
            destroy: true,
            type,
            from: 'method',
        }
    )

    function handleCloseCallback(fn: () => void) {
        let callback

        if (fn) callback = fn()

        if (callback && typeof callback.then === 'function') {
            callback.then(() => {
                close(props)
            })
        } else {
            close(props)
        }
    }

    function update(configUpdate: ModalProps | ((prevConfigUpdate: ModalProps) => void)) {
        if (typeof configUpdate === 'function') {
            configUpdate(props)
        } else {
            props = {
                ...props,
                ...configUpdate,
            }
        }

        buildFooter()

        open(props)
    }

    function buildFooter() {
        const btnOk = (
            <Button
                key="ok"
                type="primary"
                id={`${props.id}-ok`}
                onClick={handleCloseCallback.bind(this, props.onOk)}
                {...props.okButtonProps}
            >
                {getLocale('ok', props.text)}
            </Button>
        )

        const btnCancel = (
            <Button
                key="cancel"
                id={`${props.id}-cancel`}
                onClick={handleCloseCallback.bind(this, props.onCancel)}
                {...props.cancelButtonProps}
            >
                {getLocale('cancel', props.text)}
            </Button>
        )

        if (type === 'confirm' && !option.footer) {
            props.footer = [btnCancel, btnOk]
        } else {
            props.footer = 'footer' in props ? props.footer : [btnOk]
        }
    }

    buildFooter()

    open(props)

    return {
        update,
        close: close.bind(this, props) as () => void,
    }
}

ready(() => {
    // 添加Esc事件
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return

        const ids = Object.keys(containers).reverse()
        const opened = ids.find(id => containers[id].visible && containers[id].props.esc)

        if (!opened) return

        const { props } = containers[opened]

        const { onClose, usePortal } = props

        onClose?.()

        if (!usePortal) close(props)
    })
})

export { destroy, close, createDiv, open, createModalMethod }
