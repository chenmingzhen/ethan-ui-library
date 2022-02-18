import React from 'react'
import Icon, { IconProps } from './Icon'

interface EthanFC<T> extends React.FC<T> {
    isEthanIcon: boolean
}

const links = {}
const scripts = {}

function createIcon(url = '', fontFamily = 'iconfont', prefix = 'icon') {
    const ext = url.substr(url.lastIndexOf('.') + 1)

    // 向浏览器添加css脚本或js脚本
    if (ext === 'css' && !links[url]) {
        links[url] = true

        const link = document.createElement('link')

        link.setAttribute('rel', 'stylesheet')

        link.setAttribute('type', 'text/css')

        link.setAttribute('href', url)

        document.head.appendChild(link)
    }
    if (ext === 'js' && !scripts[url]) {
        const script = document.createElement('script')

        scripts[url] = script

        script.setAttribute('src', url)

        document.body.appendChild(script)
    }

    const wrapperIcon: EthanFC<IconProps> = props => (
        <Icon ext={ext} fontFamily={fontFamily} prefix={prefix} {...props} />
    )

    wrapperIcon.isEthanIcon = true

    return wrapperIcon
}

export default createIcon

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'

export const FontAwesome = createIcon(url, 'FontAwesome', 'fa')
