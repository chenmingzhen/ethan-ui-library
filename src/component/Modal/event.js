import React from 'react'
import ReactDom from 'react-dom'
import classnames from 'classnames'
import Button from '@/component/Button'
import { getUidStr } from '@/utils/uid'
import { modalClass } from '@/styles'
import { getLocale } from '@/locale'
import { defer } from '@/utils/uid'
import Panel from './Panel'

const containers = {}
const DURATION = 300

// --------------------method---------------------

const getDiv = id => {
  const mod = containers[id]
  return mod ? mod.div : null
}

const getContainer = id => {
  const mod = containers[id]
  return mod ? mod.container : null
}

const hasVisible = () => Object.keys(containers).some(k => containers[k].visible)

const isMask = id => {
  const ids = Object.keys(containers).filter(k => containers[k].visible)
  return ids.length === 0 ? true : ids[0] === id
}

const destroy = (id, unmount) => {
  const div = getDiv(id)
  const container = getContainer(id)

  if (!div || !container) return
  delete containers[id]

  // 从 DOM 中移除已经挂载的 React 组件，清除相应的事件处理器和 state。
  // 如果在 container 内没有组件挂载，这个函数将什么都不做。
  // 如果组件成功移除，则返回 true；如果没有组件被移除，则返回 false。
  if (unmount) ReactDom.unmountComponentAtNode(div)
  container.removeChild(div)
}

const close = (props, callback) => {
  const { id } = props
  const modal = containers[props.id]

  if (!modal || modal.visible === false) return
  modal.visible = false

  const { div } = modal
  div.classList.remove(modal('show', modalClass('start')))
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
