import Theme from '../enum/themes'

let theme = 'default'
let link

const getParameterByName = (name) => {
    const { search } = window.location

    // [?&] 代表只要匹配到其中一个即可,name=为固定匹配 后面的匹配规则为=号后面不能是&或#开头 然后后面任意字符
    const regex = new RegExp(`[?&]${name}(=([^&#]*))`)
    const results = regex.exec(search)

    /* 
    results
    0: "?theme=default"
    1: "=default"
    2: "default"
    groups: undefined
    index: 0
    input: "?theme=default"
    length: 3
  */
    if (!results) return null

    // 不存在 或者主题名称不匹配 默认返回default
    if (!results[2] || !Theme.map(({ content }) => content).some((it) => it === results[2])) return ''

    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const init = (callback) => {
    // 手动添加link标签进页面
    // 不通过webpack添加
    theme = getParameterByName('theme') || 'default'

    link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', `../../${theme}.css`)

    link.onload = callback

    document.head.appendChild(link)
}

const change = (next) => {
    theme = next
    link.setAttribute('href', `${theme}.css`)
}

export default {
    init,
    change,
    getTheme: () => theme,
}
