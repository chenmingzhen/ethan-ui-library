import React from 'react'
import Icon from './Icon'
import { IconProps } from './type'

const links = {}
const scripts = {}

function createIcon(url, fontFamily, prefix) {
    const ext = url.substring(url.lastIndexOf('.') + 1)

    // 向浏览器添加css脚本或js脚本
    if (ext === 'css' && !links[url]) {
        links[url] = true

        const link = document.createElement('link')

        link.setAttribute('rel', 'stylesheet')

        link.setAttribute('type', 'text/css')

        link.setAttribute('href', url)

        document.head.appendChild(link)
    } else if (ext === 'js' && !scripts[url]) {
        const script = document.createElement('script')

        scripts[url] = script

        script.setAttribute('src', url)

        document.body.appendChild(script)
    }

    const wrapperIcon: React.FC<IconProps> = React.memo((props) => (
        <Icon ext={ext} fontFamily={fontFamily} prefix={prefix} {...props} />
    ))

    ;(wrapperIcon as any).isEthanIcon = true

    return wrapperIcon
}

export default createIcon
