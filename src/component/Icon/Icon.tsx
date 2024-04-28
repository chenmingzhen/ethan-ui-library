import React from 'react'
import classnames from 'classnames'
import { iconClass } from '@/styles'
import { styles } from '@/utils/style/styles'
import { IconProps } from './type'

const Icon: React.FC<IconProps> = (props) => {
    const { children, prefix, type = 'default', name = '', fontFamily, fontSize, ext, ...other } = props
    const className = classnames(iconClass('_', type), props.className, `${prefix}-${name}`)
    /** 由于各个字体库的命名空间风格不同，统一使用style注入fontFamily */
    /** FontAwesome是使用prefix(fa)作为根类名 */
    /** iconfont是使用fontFamily(iconfont)作为根类名 */
    const style = styles({ fontSize, fontFamily }, props.style)

    if (ext === 'js') {
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

Icon.displayName = 'EthanIcon'

export default React.memo(Icon)
