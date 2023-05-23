import React, { useContext, useState } from 'react'
import { menuClass } from '@/styles'
import { useIsomorphicLayoutEffect } from 'react-use'
import classnames from 'classnames'
import { MenuItemProps } from './type'
import useMenuPath from './hooks/useMenuPath'
import MenuContext from './context/MenuContext'
import useInlineIndentStyle from './hooks/useInlineIndentStyle'
import { getPathStr } from './util'

const MenuItem: React.FC<MenuItemProps> = function (props) {
    const { dataItem } = props
    const { key, title, disabled } = dataItem
    const [active, updateActive] = useState(false)
    const { path } = useMenuPath(key)

    const { bindMenuItem, unbindMenuItem, onMenuItemClick, subMenuTriggerActions, onDirectionalSubMenuToggleOpenKeys } =
        useContext(MenuContext)

    useIsomorphicLayoutEffect(() => {
        bindMenuItem(key, { path, updateActive } as any)

        return () => {
            unbindMenuItem(key)
        }
    }, [path])

    const inlineIndentStyle = useInlineIndentStyle(path)

    const className = menuClass('item', disabled === true && 'disabled', active && 'active')
    const hasHoverTriggerAction = subMenuTriggerActions.includes('hover')

    return (
        <li
            tabIndex={-1}
            className={className}
            data-ck={getPathStr(path)}
            onClick={() => onMenuItemClick(dataItem)}
            onMouseEnter={hasHoverTriggerAction ? () => onDirectionalSubMenuToggleOpenKeys(dataItem, true) : undefined}
            onMouseLeave={hasHoverTriggerAction ? () => onDirectionalSubMenuToggleOpenKeys(dataItem, false) : undefined}
        >
            <span className={classnames(menuClass('title'))} style={inlineIndentStyle}>
                {title}
            </span>
        </li>
    )
}

export default React.memo(MenuItem)
