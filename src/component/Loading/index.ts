import React from 'react'
import { render } from 'react-dom'
import Loading from './loading'

let ref = null

let timer = null

let root = null

const mount = props => {
  if (timer) clearInterval(timer)

  if (!ref) {
    ref = React.createRef()

    // props会为空 需要手动update 设置值进去
    const loading = React.createElement(Loading, Object.assign({ ref, visible: true, props }))

    root = document.createElement('span')

    document.body.appendChild(root)

    render(loading, root)
  }
}

const loading = () => {
  const { type, update } = ref.current

  if (type !== 'line') return

  timer = setInterval(() => {
    let per = ref.current.percent
    per += Math.floor(Math.random() * +5)

    update({ percent: per })

    if (ref.current.percent >= 100) {
      update({ percent: 100 })
      clearInterval(timer)
    }
  }, 200)
}

export default {
  start(type, text) {
    setTimeout(() => {
      mount()

      const { update } = ref.current

      update({
        error: false,
        type: type || 'line',
        loadingText: text,
        percent: 0,
        visible: true,
        color: '',
      })

      loading()
    })
  },

  finish() {
    if (!ref || !ref.current) return

    const { update } = ref.current

    update({ percent: 100, visible: true })

    setTimeout(() => {
      update({ visible: false })
    }, 500)
    setTimeout(() => {
      update({ percent: 0 })
    }, 800)
  },

  error() {
    mount()

    const { update } = ref.current

    update({ error: true, visible: true, type: 'line' })

    this.finish()
  },

  upload(percent) {
    mount()

    const { update } = ref.current

    update({ percent, visible: true })
  },
  config(props) {
    mount(props)

    const { update } = ref.current

    update(Object.assign(props, { visible: true, error: false }))

    loading()
  },
  destroy() {
    render.unmountComponentAtNode(root)
    ref = null
  },
}
