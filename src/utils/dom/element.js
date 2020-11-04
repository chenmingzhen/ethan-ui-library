import React from 'react'

// https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches
if (Element && !Element.prototype.matches) {
  const proto = Element.prototype
  proto.matches =
    proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
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

export function getParent(el, target) {
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
    event = new CustomEvent(name, { bubbles: false, cancelable: true, detail })
  } else {
    event = document.createEvent('HTMLEvents')
    event.initEvent(name, true, true)
  }

  form.dispatch(event)
}
