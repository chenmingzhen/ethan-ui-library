import React, { useContext, useEffect } from 'react'
import { menuClass } from '@/styles'
import { MenuItemGroupProps } from './type'
import MenuContext from './context/MenuContext'
import useMenuPath from './hooks/useMenuPath'

const MenuItemGroup: React.FC<MenuItemGroupProps> = function (props) {
    const { dataItem, children } = props
    const { title, key } = dataItem
    const { registerMenuItemGroup, unregisterMenuItemGroup, onDirectionalToggleOpenKeys, subMenuTriggerActions } =
        useContext(MenuContext)
    const { path } = useMenuPath(key)
    const hasHoverTriggerAction = subMenuTriggerActions.includes('hover')

    useEffect(() => {
        registerMenuItemGroup(key, { path })

        return () => {
            unregisterMenuItemGroup(key)
        }
    }, [path])

    return (
        <li tabIndex={-1} className={menuClass('group')}>
            <div
                className={menuClass('group-title')}
                onMouseEnter={() => {
                    if (!hasHoverTriggerAction) return
                    onDirectionalToggleOpenKeys(dataItem, true)
                }}
                onMouseLeave={() => {
                    if (!hasHoverTriggerAction) return

                    onDirectionalToggleOpenKeys(dataItem, false)
                }}
            >
                {title}
            </div>
            <ul className={menuClass('list', 'inline')}>{children}</ul>
        </li>
    )
}

export default React.memo(MenuItemGroup)
