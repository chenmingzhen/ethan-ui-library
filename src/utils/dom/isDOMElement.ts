export default function(el) {
  return typeof HTMLElement === 'function'
    ? el instanceof HTMLElement
    : el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string'
}

/**
 * nodeType 属性返回以数字值返回指定节点的节点类型。

 如果节点是元素节点，则 nodeType 属性将返回 1。

 如果节点是属性节点，则 nodeType 属性将返回 2。
 */
