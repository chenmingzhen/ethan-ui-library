import { getUidStr } from './uid'
import { docSize } from './dom/document'
import { eventPassive } from './dom/detect'

const components = {}
const throttle = 80
let timeout = null
let isLock = false

const winHeight = docSize.height

export function removeStack(id) {
  if (!id || !components[id]) return
  const { observer } = components[id]
  if (observer && observer.disconnect) observer.disconnect()
  delete components[id]
}

// 获取容器的getBoundingClientRect
const getRect = (el) => {
  if (!el || !el.getBoundingClientRect) {
    if (el) console.error(`the ${el} is not a element`)
    return { top: 0, bottom: winHeight }
  }
  return el.getBoundingClientRect()
}

function getObserver(obj, id) {
  const { container = null, offset, render } = obj
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        // 正在视图层 可以渲染处理
        if (en.isIntersecting) {
          render()
          removeStack(id)
        }
      })
    },
    { root: container, rootMargin: `${offset}px` }
  )
  obj.observer = observer
  return observer
}

// dispatch执行render
export function dispatch() {
  if (isLock) return
  isLock = true

  // 处理
  Object.keys(components).forEach((k) => {
    const { element, render, container, offset } = components[k]
    const rect = element.getBoundingClientRect()
    const containerRect = getRect(container)
    // 出现在容器中才执行下面的代码
    if (rect.bottom + offset < containerRect.top || rect.top - offset > containerRect.bottom) return

    delete components[k]
    render()
  })

  isLock = false
}

const handleScroll = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    dispatch()
    timeout = null
  }, throttle)
}

export function addStack(obj) {
  const id = getUidStr()
  const scrollEl = obj.container || document
  obj.offset = obj.offset || 0
  // http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
  // 浏览器是否存在IntersectionObserver
  if (window.IntersectionObserver) {
    components[id] = obj
    // 获取观察类
    const observer = getObserver(obj, id)
    // 开始观察元素
    observer.observe(obj.element)
    return id
  }
  scrollEl.addEventListener('scroll', handleScroll, eventPassive)
  const rect = obj.element.getBoundingClientRect()
  const containerRect = getRect(obj.container)

  if (rect.bottom + obj.offset < containerRect.top || rect.top - obj.offset > containerRect.bottom) {
    components[id] = obj
    return id
  }

  obj.render()
  return null
}
