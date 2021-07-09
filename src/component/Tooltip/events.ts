import classnames from 'classnames'
import { tooltipClass } from '@/styles'
import ready from '@/utils/dom/ready'
import React from 'react'
import { ToolTipProps } from './Tooltip'

// dom
const div = document.createElement('div')
const arrow = document.createElement('div')
const inner = document.createElement('div')

div.style.display = 'none'

arrow.className = tooltipClass('arrow')
inner.className = tooltipClass('inner')

div.appendChild(arrow)

div.appendChild(inner)

function clickAway() {
    hide()

    document.removeEventListener('click', clickAway)
}

export function hide() {
    div.style.display = 'none'
    div.className = ''
}

/**
 *
 * @param props Container传进来的props
 * @param id 目前显示的toolTip的id
 * @param innerStyle 用户输入的style属性 用于覆盖
 */
export function show(props: ToolTipProps, innerStyle: React.CSSProperties) {
    const { position, style, tip, trigger, animation = true, className: cn } = props

    div.style.cssText = 'display:none'
    Object.keys(style).forEach(k => {
        div.style[k] = style[k]
    })

    const className = tooltipClass('_', position, animation && 'animation')

    div.style.display = 'block'
    div.className = classnames(className, cn)

    inner.innerText = tip
    inner.setAttribute('style', '')

    if (innerStyle) {
        Object.keys(innerStyle).forEach(k => {
            inner.style[k] = typeof innerStyle[k] === 'number' ? `${innerStyle[k]}px` : innerStyle[k]
        })
    }

    // 点击窗口 隐藏
    if (trigger === 'click') {
        document.addEventListener('click', clickAway)
    }
}

ready(() => {
    document.body.append(div)
})
