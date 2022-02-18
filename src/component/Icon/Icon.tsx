import React from 'react'
import classnames from 'classnames'
import { iconClass } from '@/styles'

export interface IconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    children?: React.ReactNode

    prefix?: string

    type?: 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'

    name?: string

    style?: React.CSSProperties

    fontFamily?: string

    fontSize?: string

    ext?: string
}

const Icon: React.FC<IconProps> = props => {
    const { children, prefix, type, name, fontFamily, fontSize, ext, ...other } = props

    const className = classnames(iconClass('_', type), props.className, `${prefix}-${name}`)

    const style = Object.assign({}, { fontFamily, fontSize }, props.style)

    if (ext === 'js') {
        // https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/ARIA_Techniques/%E4%BD%BF%E7%94%A8aria-hidden%E5%B1%9E%E6%80%A7
        // aria-hidden 把 aria-hidden="true" 加到元素上会把该元素和它的所有子元素从可访问性树上移除。
        return (
            <i {...other} className={className} style={style}>
                <svg className={iconClass('svg')} aria-hidden="true">
                    <use xlinkHref={`#${prefix}-${name}`} />
                </svg>
            </i>
        )
    }

    return (
        <i {...other} className={className} style={style}>
            {children}
        </i>
    )
}

Icon.defaultProps = {
    prefix: 'icon',
    fontFamily: 'iconfont',
    name: '',
    type: 'default',
}

export default React.memo(Icon)

Icon.displayName = 'EthanIcon'
