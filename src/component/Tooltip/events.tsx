import classnames from 'classnames'
import { tooltipClass } from '@/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { getUidStr } from '@/utils/uid'
import { ToolTipProps } from './Tooltip'

const divMap = new Map<string, { div: HTMLElement; arrow: HTMLElement; inner: HTMLElement }>()

export function createDiv(getContainer?: () => HTMLElement) {
    const uuid = getUidStr()

    const container = getContainer?.() || document.body

    // dom
    const div = document.createElement('div')
    const arrow = document.createElement('div')
    const inner = document.createElement('div')

    div.style.display = 'none'

    arrow.className = tooltipClass('arrow')
    inner.className = tooltipClass('inner')

    div.appendChild(arrow)

    div.appendChild(inner)

    divMap.set(uuid, { div, arrow, inner })

    // document.body.append(div)

    container.appendChild(div)

    return uuid
}

export function destroyDiv(uuid, getContainer?: () => HTMLElement) {
    const { div } = getDiv(uuid)

    if (div) {
        const container = getContainer?.() ?? document.body

        container.removeChild(div)
    }

    divMap.delete(uuid)
}

export function getDiv(uuid) {
    return divMap.get(uuid)
}

function clickAway(uuid) {
    hide(uuid)

    document.removeEventListener('click', clickAway)
}

export function hide(uuid) {
    if (!uuid) return

    const { div, inner } = getDiv(uuid)

    div.style.display = 'none'
    div.className = ''

    ReactDOM.unmountComponentAtNode(inner)
}

/**
 *
 * @param props Container传进来的props
 * @param id 目前显示的toolTip的id
 * @param innerStyle 用户输入的style属性 用于覆盖
 */
export function show(props: ToolTipProps, uuid) {
    const { position, style, tip, trigger, animation = true, className: cn } = props

    const { div, inner } = getDiv(uuid)

    div.style.cssText = 'display:none'
    Object.keys(style).forEach(k => {
        div.style[k] = style[k]
    })

    const className = tooltipClass('_', position, animation && 'animation')

    div.style.display = 'block'
    div.className = classnames(className, cn)

    ReactDOM.render(<>{tip}</>, inner)

    // 点击窗口 隐藏
    if (trigger === 'click') {
        document.addEventListener('click', clickAway.bind(this, uuid))
    }
}
