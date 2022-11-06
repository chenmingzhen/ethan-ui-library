import { getUidStr } from './uid'
import { docSize } from './dom/document'
import { eventPassive } from './dom/detect'

export interface LazyParams {
    offset?: number

    container?: HTMLElement

    element: HTMLElement

    render(): void
}

interface Observer extends LazyParams {
    observer?: IntersectionObserver
}

const components = new Map<string, Observer>()

const throttle = 80

let timeout = null

let isLock = false

const winHeight = docSize.height

export function removeStack(id) {
    if (!id || !components.has(id)) return

    const { observer } = components.get(id)

    observer?.disconnect()

    components.delete(id)
}

// 获取容器的getBoundingClientRect
const getRect = (el) => {
    if (!el || !el.getBoundingClientRect) {
        if (el) console.error(`the ${el} is not a element`)

        return { top: 0, bottom: winHeight }
    }

    return el.getBoundingClientRect()
}

function getObserver(obj: Observer, id: string) {
    const { container = null, offset, render } = obj

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // 正在视图层 可以渲染处理
                if (entry.isIntersecting) {
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

    for (const [id, obj] of components) {
        const { element, render, container, offset } = obj

        const rect = element.getBoundingClientRect()

        const containerRect = getRect(container)

        // 出现在容器中才执行下面的代码
        if (rect.bottom + offset < containerRect.top || rect.top - offset > containerRect.bottom) return

        components.delete(id)

        render()

        const scrollEl = obj.container || document

        scrollEl.removeEventListener('scroll', handleScroll)
    }

    isLock = false
}

const handleScroll = () => {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
        dispatch()

        timeout = null
    }, throttle)
}

export function addStack(obj: LazyParams) {
    const id = getUidStr()

    const scrollEl = obj.container || document

    obj.offset = obj.offset || 0

    // http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
    // 浏览器是否存在IntersectionObserver
    if (window.IntersectionObserver) {
        components.set(id, obj)

        // 获取观察类
        const observer = getObserver(obj, id)
        // 开始观察元素
        observer.observe(obj.element)

        return id
    }

    // 不存在IntersectionObserver 兼容性写法
    const rect = obj.element.getBoundingClientRect()

    const containerRect = getRect(obj.container)

    if (rect.bottom + obj.offset < containerRect.top || rect.top - obj.offset > containerRect.bottom) {
        components.set(id, obj)

        scrollEl.addEventListener('scroll', handleScroll, eventPassive)

        return id
    }

    obj.render()

    return null
}

export function throttleWrapper(cb, delay = 80) {
    let timer = null

    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                cb.apply(this, args)
                timer = null
            }, delay)
        }
    }
}
