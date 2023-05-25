import React, { useContext, useEffect, useState } from 'react'
import { menuClass } from '@/styles'
import classnames from 'classnames'
import { MenuItemProps } from './type'
import useMenuPath from './hooks/useMenuPath'
import MenuContext from './context/MenuContext'
import useInlineIndentStyle from './hooks/useInlineIndentStyle'
import { getPathStr } from './util'

const MenuItem: React.FC<MenuItemProps> = function (props) {
    const { dataItem } = props
    const { key, title, disabled } = dataItem
    const { path } = useMenuPath(key)
    const [active, updateActive] = useState(false)
    const { registerMenuItem, unregisterMenuItem, onLeafClick, onMouseEnterOpen, onMouseLeaveClose } =
        useContext(MenuContext)

    useEffect(() => {
        registerMenuItem(key, { path, updateActive } as any)

        return () => {
            unregisterMenuItem(key)
        }
    }, [path])

    const inlineIndentStyle = useInlineIndentStyle(path)
    const className = menuClass('item', disabled === true && 'disabled', active && 'active')

    return (
        <li
            tabIndex={-1}
            className={className}
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
