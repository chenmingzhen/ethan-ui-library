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
