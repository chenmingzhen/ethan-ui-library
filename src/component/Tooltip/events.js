import classnames from 'classnames'
import { tooltipClass } from '@/styles'
import ready from '@/utils/dom/ready'

const div = document.createElement('div')
let timer
div.style.display = 'none'

ready(() => {
  document.body.append(div)
})

const arrow = document.createElement('div')
arrow.className = tooltipClass('arrow')
div.appendChild(arrow)

const inner = document.createElement('div')
inner.className = tooltipClass('inner')
div.appendChild(inner)

let currentId

export function hide() {
  if (timer) clearTimeout(timer)
  div.style.display = 'none'
  div.className = ''
  currentId = undefined
}

function clickAway() {
  hide()
  document.removeEventListener('click', clickAway)
}

/**
 *
 * @param props Container传进来的props
 * @param id 目前显示的toolTip的id
 * @param innerStyle 用户输入的style属性 用于覆盖
 */
export function show(props, id, innerStyle) {
  const { position, style, tip, trigger, animation, className: cn } = props

  currentId = id

  div.style.cssText = 'display:none'
  Object.keys(style).forEach(k => {
    div.style[k] = style[k]
  })

  // const className = tooltipClass('_', 'in', position, animation && 'animation')
  const className = tooltipClass('_', position, animation && 'animation')

  // fix safari
  // timer = setTimeout(() => {
  //   div.style.display = 'block'
  //   div.className = classnames(className, cn)
  // }, 0)
  div.style.display = 'block'
  div.className = classnames(className, cn)

  inner.innerText = tip
  inner.setAttribute('style', false)
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

/**
 * 更新位置
 * @param id
 * @param pos
 */
export function move(id, pos) {
  if (id === currentId) {
    // eslint-disable-next-line no-return-assign
    Object.keys(pos).map(key => (div.style[key] = pos[key]))
  }
}

export function isCurrent(id) {
  return id === currentId
}
