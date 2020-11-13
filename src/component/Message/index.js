import { destroy, getComponent, closeWithAnimation } from './messager'

// 构造函数
const create = (type) => async (content, duration = 3, options = {}) => {
  const { onClose, position = 'top', title, className = '', top = 'auto' } = options

  const find = ['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'loading'].indexOf(position)

  if (find < 0) {
    console.warn(
      'Ethan message components need a right position ! please select one from top,middle,top-left,top-right,bottom-left,bottom-right,loading'
    )
  }

  // loading特殊处理
  let e
  let i

  await getComponent(position).then((messager) => {
    const { entity, id } = messager.addMessage({
      content,
      duration,
      type,
      onClose,
      title,
      className,
      top,
      position,
    })
    e = entity
    i = id
  })

  if (type === 'loading') {
    return e.removeLoadingMsg.bind(e, i)
  }
  return null
}

// 导入此依赖就会执行  create (type)=>这个函数  返回闭包
export default {
  show: create('default'),
  success: create('success'),
  info: create('info'),
  warn: create('warning'),
  warning: create('warning'),
  danger: create('danger'),
  error: create('danger'),
  loading: create('loading'),
  close: (position) => {
    if (position) destroy(position)
    else {
      ;['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach((c) => {
        destroy(c)
      })
    }
  },
  closeAll: (position) => {
    closeWithAnimation(position)
  },
}
