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

    const {
        registerMenuItem,
        unregisterMenuItem,
        onMenuItemClick,
        subMenuTriggerActions,
        onDirectionalToggleOpenKeys,
    } = useContext(MenuContext)

    useIsomorphicLayoutEffect(() => {
        registerMenuItem(key, { path, updateActive } as any)

        return () => {
            unregisterMenuItem(key)
        }
    }, [path])

    const inlineIndentStyle = useInlineIndentStyle(path)

    const className = menuClass('item', disabled === true && 'disabled', active && 'active')
    const hasHoverTriggerAction = subMenuTriggerActions.includes('hover')

    function handleMouseEnter() {
        if (!hasHoverTriggerAction) return
        onDirectionalToggleOpenKeys(dataItem, true)
    }

    function handleMouseLeave() {
        if (!hasHoverTriggerAction) return

        onDirectionalToggleOpenKeys(dataItem, false)
    }

    return (
        <li
            tabIndex={-1}
            className={className}
            data-ck={getPathStr(path)}
            onClick={() => onMenuItemClick(dataItem)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className={classnames(menuClass('title'))} style={inlineIndentStyle}>
                {title}
            </span>
        </li>
    )
}

export default React.memo(MenuItem)
