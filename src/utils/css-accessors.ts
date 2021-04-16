import { capitalize } from './strings'
import { entries } from './objects'
import cssInject from './vars-inject'

// 这里统一将vars-inject中的conf记录到accessors中
// 通过给浏览器添加dom之后 将style赋值上去 再Promise删除dom
// 方便获取样式

function setOptions(options, setter) {
  if (!options) return
  for (const [key, value] of entries(options)) {
    if (key === setter) continue
    this[key] = value
  }
}

function getDOMStyle(dom) {
  document.body.appendChild(dom)
  const style = window.getComputedStyle(dom)
  // 异步 会压入栈中执行
  Promise.resolve().then(() => {
    dom.parentElement.removeChild(dom)
  })
  return style
}

function getStyleAttr(className, key = 'color') {
  const div = document.createElement('div')
  div.className = className
  return getDOMStyle(div)[key]
}

// obj {setButton:()=>setOptions.call(value, options, "setButton"}
// data injects["button"]
function genAccessors(obj, data) {
  data.conf.forEach(item => {
    const { name, className, attr, parser = v => v } = item
    Object.defineProperty(obj, name, {
      enumerable: true,
      get: () => {
        if (item.value) return item.value
        const res = getStyleAttr(className, attr)
        return parser(res)
      },
      // eslint-disable-next-line no-return-assign
      set: v => {
        if (item.value) item.value = v
        data[name] = v
      },
    })
  })
}

const accessors = {
  table: {},
  tag: {},
  pagination: {},
  button: {},
  color: {},
  tooltip: {},
  input: {},
  select: {},
  datepicker: {},
  slider: {},
  menu: {},
  form: {},
  checkbox: {},
  radio: {},
  alert: {},
  message: {},
  card: {},
  modal: {},
  popover: {},
  tree: {},
  dropdown: {},
  common: {},
  switch: {},
}

for (const [key, value] of entries(accessors)) {
  const setterName = `set${capitalize(key)}`
  value[setterName] = options => setOptions.call(value, options, setterName)
  genAccessors(value, cssInject[key])
}

// open seeing inject
// console.log(accessors)

export default accessors
