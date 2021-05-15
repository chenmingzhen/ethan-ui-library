// @ts-nocheck
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

const containers = {}
const DURATION = 300

// --------------------method---------------------

const getDiv = id => {
    const mod = containers[id]
    return mod ? mod.div : null
}

// 默认为body
const getContainer = id => {
    const mod = containers[id]
    return mod ? mod.container : null
}

const hasVisible = () => Object.keys(containers).some(k => containers[k].visible)

const isMask = id => {
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

    // 这个unMount多余 考虑去除
    if (unmount) ReactDOM.unmountComponentAtNode(div)
    container.removeChild(div)
}

const close = (props, callback) => {
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

        if (props.destroy) destroy(id, !props.usePortal)

        if (!hasVisible()) {
            const doc = document.body.parentNode
            doc.style.overflow = ''
            doc.style.paddingRight = ''
        }
        if (callback) callback()
    }, DURATION)
}

// 创建divDOM
const createDiv = props => {
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

const open = (props, isPortal) => {
    const { content, onClose, zIndex, ...otherProps } = props
    const div = createDiv(props)

    div.style.display = 'block'

    const parsed = parseInt(zIndex, 10)

    if (!Number.isNaN(parsed)) div.style.zIndex = parsed

    const html = document.body.parentNode

    const scrollWidth = window.innerWidth - document.body.clientWidth
    html.style.overflow = 'hidden'
    html.style.paddingRight = `${scrollWidth}px`

    const handleClose = () => {
        if (onClose) onClose()
        if (!isPortal) close(props)
    }

    const opacityDefault = props.maskOpacity === undefined ? 0.25 : props.maskOpacity
    const maskOpacity = isMask(props.id) ? opacityDefault : 0.01
    div.style.background = props.maskBackground || `rgba(0,0,0,${maskOpacity})`

    containers[props.id].visible = true

    defer(() => {
        if (!otherProps.position) div.classList.add(modalClass('start'))
    })

    setTimeout(() => {
        div.classList.add(modalClass('show'))
    }, 10)

    // 注意 此ReactNode会被存储 Panel的正常更新不会让此组件unMount再Mount 而是Update
    // 见example update
    const panel = (
        <Panel {...otherProps} onClose={handleClose} container={div}>
            {content}
        </Panel>
    )

    if (isPortal) return ReactDOM.createPortal(panel, div)
    if (document.activeElement) document.activeElement.blur()

    ReactDOM.render(panel, div)
    return null
}

// 关闭callback
const closeCallback = (fn, option) => () => {
    let callback

    if (fn) callback = fn()
    // 处理Promise情况
    if (callback && typeof callback.then === 'function') {
        callback.then(() => {
            close(option)
        })
    } else {
        close(option)
    }
}

const btnOk = option => {
    const onClick = closeCallback(option.onOk, option)

    return (
        <Button.Once key="ok" id={`${option.id}-ok`} onClick={onClick} type="primary">
            {getLocale('ok', option.text)}
        </Button.Once>
    )
}

// 取消按钮
const btnCancel = option => {
    const onClick = closeCallback(option.onCancel, option)

    return (
        <Button.Once id={`${option.id}-cancel`} key="cancel" onClick={onClick}>
            {getLocale('cancel', option.text)}
        </Button.Once>
    )
}

// Type类型Modal创建
const createModalMethod = type => option => {
    const props = Object.assign(
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

    if (type === 'confirm') {
        props.footer = [btnCancel(props), btnOk(props)]
    } else {
        props.footer = 'footer' in props ? props.footer : [btnOk(props)]
    }

    open(props)

    return () => close(props)
}

ready(() => {
    // 添加Esc事件
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return

        const ids = Object.keys(containers).reverse()
        const opened = ids.find(id => containers[id].visible && containers[id].props.esc)
        if (!opened) return

        const { props } = containers[opened]
        const { onClose, isPortal } = props
        if (onClose) onClose()
        if (!isPortal) close(props)
    })
})

export { destroy, close, createDiv, open, createModalMethod }
