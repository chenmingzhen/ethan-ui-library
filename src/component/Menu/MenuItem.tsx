import React, { useContext, useEffect, useState } from 'react'
import { menuClass } from '@/styles'
import classnames from 'classnames'
import { MenuItemProps } from './type'
import useMenuPath from './hooks/useMenuPath'
import MenuContext from './context/MenuContext'
import useInlineIndentStyle from './hooks/useInlineIndentStyle'
import { getPathStr } from './util'

const MenuItem: React.FC<MenuItemProps> = function (props) {
    const { dataItem, showCount } = props
    const { key, title, disabled, className } = dataItem
    const { path } = useMenuPath(key)
    const [active, updateActive] = useState(false)
    const { registerMenuItem, unregisterMenuItem, onLeafClick, onMouseEnterOpen, onMouseLeaveClose } =
        useContext(MenuContext)

    useEffect(() => {
        registerMenuItem(key, { path, updateActive } as any)

        return () => {
            unregisterMenuItem(key)
        }
    }, [path.join(','), showCount])

    const inlineIndentStyle = useInlineIndentStyle(path)
    const ms = classnames(menuClass('item', disabled === true && 'disabled', active && 'active'), className)

    return (
        <li
            tabIndex={-1}
            className={ms}
            data-ck={getPathStr(path)}
            onClick={() => onLeafClick(dataItem)}
            onMouseEnter={() => onMouseEnterOpen(dataItem)}
            onMouseLeave={() => onMouseLeaveClose(dataItem)}
        >
            <span className={classnames(menuClass('title'))} style={inlineIndentStyle}>
                {title}
            </span>
        </li>
    )
}

export default React.memo(MenuItem)
