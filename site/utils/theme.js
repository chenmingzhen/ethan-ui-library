let theme = 'default'
let link

export const THEMES = ['default', 'antd']

const getParameterByName = name => {
  const { search } = window.location
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(search)

  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const init = callback => {
  // 手动添加link标签进页面
  // 不通过webpack添加
  theme = getParameterByName('theme') || 'ethan'
  link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', `../../${theme}.css`)
  link.onload = callback

  document.head.appendChild(link)
}

const change = next => {
  theme = next
  link.setAttribute('href', `${theme}.css`)
}

export default {
  init,
  change,
  getTheme: () => theme,
}
