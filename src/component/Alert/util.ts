import { Children } from 'react'
import kindOf from '@/utils/kindOf'
import Alert from './alert'

// 在原节点后面添加第一个子元素节点实现无缝
const cloneChildren = children => {
  const length = Children.count(children)
  const clonedChildren = new Array(length)

  Children.forEach(children, (child, index) => {
    clonedChildren[index] = child
    if (index === 0) {
      clonedChildren[length] = child
    }
  })

  return length > 1 ? clonedChildren : [children]
}

// 获取有效的渲染节点
const getRenderChildrenFromProps = children => {
  const childArray: any[] = Children.toArray(children)

  const items = childArray.reduce((alertItemArray, child) => {
    const { type } = child

    if (kindOf(type, Alert)) {
      alertItemArray.push(child)
    }
    return alertItemArray
  }, [])

  const renderItems = cloneChildren(items)

  return { items, renderItems }
}

export { getRenderChildrenFromProps, cloneChildren }
