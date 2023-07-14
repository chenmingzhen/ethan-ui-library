import React, { useContext, useEffect } from 'react'
import { menuClass } from '@/styles'
import { MenuItemGroupProps } from './type'
import MenuContext from './context/MenuContext'
import useMenuPath from './hooks/useMenuPath'
import useInlineIndentStyle from './hooks/useInlineIndentStyle'

const MenuItemGroup: React.FC<MenuItemGroupProps> = function (props) {
    const { dataItem, children } = props
    const { title, key } = dataItem
    const { path } = useMenuPath(key)
    const { registerMenuItemGroup, unregisterMenuItemGroup, onMouseEnterOpen, onMouseLeaveClose } =
        useContext(MenuContext)

    const inlineIndentStyle = useInlineIndentStyle(path, true)

    useEffect(() => {
        registerMenuItemGroup(key, { path })

        return () => {
            unregisterMenuItemGroup(key)
        }
    }, [path])

    return (
        <li tabIndex={-1} className={menuClass('group')}>
            <div
                style={inlineIndentStyle}
                className={menuClass('group-title')}
                onMouseEnter={() => onMouseEnterOpen(dataItem)}
                onMouseLeave={() => onMouseLeaveClose(dataItem)}
            >
                {title}
            </div>
            <ul className={menuClass('list', 'inline')}>{children}</ul>
        </li>
    )
}

export default React.memo(MenuItemGroup)