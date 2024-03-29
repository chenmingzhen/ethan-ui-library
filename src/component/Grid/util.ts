import config from '@/config'
import { GridProps } from '.'

const CACHES = {}

const RESPONSIVE = {
    sm: '568',
    md: '768',
    lg: '992',
    xl: '1200',
}

const GridClassName = `${config.prefix}-grid`

const GridFullClassName = `${config.prefix}-grid-full`

const defaultResponsive = 'md'

function createStyle(text: string, id: string) {
    const queryStyle = document.head.querySelector(`#${id}`)

    if (queryStyle) {
        return
    }

    const style = document.createElement('style')

    style.type = 'text/css'

    style.id = id

    style.innerHTML = text

    document.head.append(style)
}

function generateGrid(width: number, className: string, responsive: GridProps['responsive']) {
    const minWidth = RESPONSIVE[responsive]

    const text = `@media screen and (min-width: ${minWidth}px) { .${className}{width: ${width}%} }`

    createStyle(text, className)
}

function generateOffset(width: number, className: string, responsive: GridProps['responsive']) {
    const minWidth = RESPONSIVE[responsive]

    const text = `@media screen and (min-width: ${minWidth}px) { .${className}{margin-left: ${width}%} }`

    createStyle(text, className)
}

function generate(w, type, res) {
    let width = w

    const responsive = res || defaultResponsive

    if (!width || width <= 0) {
        return ''
    }

    if (width > 1) {
        width = 1
    }

    // toFixed整数取整 参数为保留的小数位
    width = (width * 100).toFixed(4)

    width = width.substr(0, width.length - 1)

    const className = `${config.prefix}-${type}-${responsive}-${width.replace('.', '-')}`

    if (!CACHES[className]) {
        if (type === 'grid') {
            generateGrid(width, className, responsive)
        } else {
            generateOffset(width, className, responsive)
        }

        CACHES[className] = true
    }

    return className
}

export function getGrid(opt) {
    let options = opt

    if (!options) {
        return ''
    }

    if (typeof options === 'number') {
        options = { width: options }
    }

    const { width, offset, responsive } = options

    const gridClass = generate(width, 'grid', responsive)

    const offsetClass = generate(offset, 'offset', responsive)

    return `${GridClassName} ${GridFullClassName} ${gridClass} ${offsetClass}`
}

/**
 * text-rendering:https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-rendering
 *
 */

function init() {
    const text = []

    text.push(`
.${GridClassName} {
  position: relative;
  display: inline-block;
  zoom: 1;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  text-rendering: auto;
  box-sizing: border-box;
}`)

    text.push(`.${GridFullClassName}{width:100%}`)

    createStyle(text.join(''), GridClassName)
}

init()
