import React from 'react'
import { debounce } from '../func'

/** @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches */
if (Element && !Element.prototype.matches) {
    const proto = Element.prototype
    proto.matches =
        /** @ts-ignore */
        proto.matchesSelector ||
        /** @ts-ignore */
        proto.mozMatchesSelector ||
        /** @ts-ignore */
        proto.msMatchesSelector ||
        /** @ts-ignore */
        proto.oMatchesSelector ||
        proto.webkitMatchesSelector
}

// 利用React的顶级容器API 遍历children 查询children它的每一个子项 对是string类型的包裹一层span
export function wrapSpan(children) {
    if (!children) return children
    return React.Children.map(children, (item) => {
        if (typeof item === 'string') return <span>{item}</span>
        return item
    })
}

export function getParent(el, target): HTMLElement | null {
    if (!target) {
        return null
    }

    let temp = el
    while (temp) {
        if (typeof target === 'string') {
            if (temp.matches && temp.matches(target)) {
                return temp
            }
        } else if (temp === target) {
            return temp
        }

        temp = temp.parentElement
    }

    return null
}

export function dispatchEvent(form, name, detail) {
    if (!form) return
    let event

    // 自定义事件 兼容性写法
    if (CustomEvent) {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent
        event = new CustomEvent(name, { bubbles: false, cancelable: true, detail })
    } else {
        event = document.createEvent('HTMLEvents')
        event.initEvent(name, true, true)
    }

    form.dispatch(event)
}

export function cssSupport(attr, value) {
    const element = document.createElement('div')

    if (attr in element.style) {
        element.style[attr] = value

        return element.style[attr] === value
    }

    return false
}

export function getCursorOffset() {
    /** @see https://developer.mozilla.org/zh-cn/docs/web/api/selection/anchoroffset */
    if (window.getSelection) {
        return window.getSelection().anchorOffset
    }

    return null
}

function select(element) {
    if (element && element.innerText.length === 0) {
        element.focus()
        return
    }
    // getSelection()方法的功能：返回当前DOM对象选中的文本信息
    // createRange https://www.cnblogs.com/lijinwen/p/6254148.html
    if (window.getSelection && document.createRange) {
        if (element) element.focus()
        const range = document.createRange()
        // selectNodeContents() 方法把范围边界设置为一个节点的子节点。
        if (element) range.selectNodeContents(element)
        // 返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置。
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
    }
}

function end(element) {
    if (!element) return
    element.focus()
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        // https://www.cnblogs.com/perseverancevictory/p/3665814.html

        // 从element的起点开始记录 或将光标移动最后面
        element.selectionStart = -1
        return
    }
    if (window.getSelection) {
        const range = window.getSelection()
        // Selection.selectAllChildren()把指定元素的所有子元素设为选中区域，并取消之前的选中区域。
        // https://developer.mozilla.org/zh-cn/docs/web/api/selection/selectallchildren
        range.selectAllChildren(element)
        // Selection.collapseToEnd() 方法的作用是取消当前选区，并把光标定位在原选区的最末尾处，如果此时光标所处的位置是可编辑的，且它获得了焦点，则光标会在原地闪烁。
        range.collapseToEnd()
    }
}

// 仍处于容器中的情况 连接符为_
// 2 => 2_1 => 2_1_1
// 2_1_1 => 2_1 =>2
// 仍处于容器中的情况
// 2 -> 21 => 211
// 211 -> 21 -> 2

// 判断点击的内容是否在容器或容器内
export function isDescendent(el: HTMLElement, elementComponentKey: string, chainKey?: string) {
    if (!(el instanceof HTMLElement)) return false

    /** @deprecated 废弃，逐步过渡 */
    if (el.getAttribute('data-id') === elementComponentKey) return true

    const targetComponentKey = el.getAttribute('data-ck')

    if (chainKey && targetComponentKey) {
        if (targetComponentKey === elementComponentKey) {
            return true
        }
        if (targetComponentKey.length > elementComponentKey.length) {
            /** 判断目标是否为下游组件 */
            return targetComponentKey.startsWith(elementComponentKey + chainKey)
        }

        return elementComponentKey.startsWith(targetComponentKey + chainKey)
    }

    if (el.getAttribute('data-ck') === elementComponentKey) return true
    if (!el.parentElement) return false

    return isDescendent(el.parentElement, elementComponentKey, chainKey)
}

export interface AddResizeObserverOptions {
    /** 观察变化的方向 */
    direction: 'x' | 'y' | 'xy'
    /** 回调函数节流时长 */
    callbackDebounce?: number
    /** 是否开启观察后马上执行一次回调事件 */
    executeOnObserver?: boolean
}

export function addResizeObserver(
    element: HTMLElement | Element,
    callback: (rect: DOMRect, element: Element) => void,
    options: AddResizeObserverOptions
) {
    let lastClientWidth
    let lastClientHeight
    let count = 0
    const { direction, callbackDebounce, executeOnObserver = true } = options
    const debounceCallback = callbackDebounce ? debounce(callback, callbackDebounce) : callback

    if (window.ResizeObserver) {
        if (direction) {
            lastClientWidth = element.clientWidth
            lastClientHeight = element.clientHeight
        }

        const observerCallback: ResizeObserverCallback = (entries) => {
            count += 1
            if (!executeOnObserver && count === 1) return

            const rect = entries[0].contentRect
            const { width, height } = rect

            if (direction === 'x') {
                if (lastClientWidth !== width) {
                    debounceCallback(rect, element)
                }
            } else if (direction === 'y') {
                if (lastClientHeight !== height) {
                    debounceCallback(rect, element)
                }
            } else if (lastClientWidth !== width || lastClientHeight !== height) {
                debounceCallback(rect, element)
            }

            lastClientWidth = width
            lastClientHeight = height
        }

        let observer = new ResizeObserver(observerCallback)

        observer.observe(element)

        return () => {
            if ('cancel' in debounceCallback) {
                debounceCallback.cancel()
            }

            observer.disconnect()

            observer = null
        }
    }
}

export function mockAnchorClick(url: string, target = '_blank') {
    const a = document.createElement('a')

    a.setAttribute('href', url)

    if (target === '_download') {
        a.setAttribute('download', '')
    } else {
        a.setAttribute('target', target)
    }

    a.click()
}

export const focusElement = { select, end, wrapSpan }
