// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom'
import { popoverClass } from '@/styles'
import ready from '@/utils/dom/ready'

const div = document.createElement('div')
div.style.display = 'none'

ready(() => {
    document.body.appendChild(div)
})

const arrow = document.createElement('div')
arrow.className = popoverClass('arrow')
div.appendChild(arrow)

const inner = document.createElement('div')
inner.className = popoverClass('content')
div.appendChild(inner)

let timer = null
let currentId = null

export function hide(delay = 500) {
    timer = setTimeout(() => {
        div.style.display = 'none'
        div.className = ''
        currentId = undefined
    }, delay)
}

const hide0 = hide.bind(null, 0)

function clickAway(e) {
    if (div.contains(e.target)) return
    hide(0)
    document.removeEventListener('click', clickAway)
}

div.addEventListener('mouseenter', () => {
    if (!timer) return
    clearTimeout(timer)
    document.addEventListener('click', clickAway)
})

div.addEventListener('mouseleave', () => {
    clearTimeout(timer)
    hide()
})

export function show(props, id) {
    const { position, style, content, background, border, noArrow, type } = props

    currentId = id

    if (timer) clearTimeout(timer)

    div.style.cssText = 'dispaly:none'
    Object.keys(style).forEach(k => {
        div.style[k] = style[k]
    })

    if (style.right) div.setAttribute('raw-right', style.right)
    if (style.left) div.setAttribute('raw-left', style.left)
    div.setAttribute('raw-top', style.top)
    div.style.background = background || ''
    inner.style.background = background || ''
    arrow.style.background = background || ''

    div.style.borderColor = border || ''
    arrow.style.borderColor = border || ''

    const className = popoverClass('_', position, type)

    arrow.style.display = noArrow ? 'none' : 'block'

    setTimeout(() => {
        div.style.display = 'block'
        div.className = className
    }, 0)

    let newContent = typeof content === 'function' ? content(hide0) : content
    if (typeof newContent === 'string') newContent = <span className={popoverClass('text')}>{newContent}</span>
    ReactDOM.render(newContent, inner)

    document.addEventListener('click', clickAway)
}

export function move(id, pos) {
    if (id === currentId) {
        // eslint-disable-next-line no-return-assign
        Object.keys(pos).map(key => (div.style[key] = pos[key]))
    }
}

export function isCurrent(id) {
    return id === currentId
}
