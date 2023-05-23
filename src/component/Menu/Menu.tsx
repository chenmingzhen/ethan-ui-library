import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { menuClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import shallowEqual from '@/utils/shallowEqual'
import { getUidStr } from '@/utils/uid'
import {
    BindMenuItemOptions,
    BindSubMenuOptions,
    MenuBaseData,
    MenuItemActions,
    MenuProps,
    SubMenuActions,
} from './type'
import MenuContext from './context/MenuContext'
import { getPathStr, parseChildren } from './util'
import useOpenKeys from './hooks/useOpenKeys'

const Menu: React.FC<MenuProps> = function (props) {
    const {
        className,
        style,
        mode = 'inline',
        theme,
        data,
        inlineIndent = 24,
        subMenuTriggerActions = ['click'],
        defaultOpenKeys,
        onOpenChange,
        onClick,
    } = props

    const [activePath, setActivePath] = useState<React.Key[]>([])
    const { openKeys, syncSetOpenKeys, delaySetOpenKeys } = useOpenKeys({
        defaultValue: defaultOpenKeys,
        value: props.openKeys,
        onChange: onOpenChange,
    })
    const componentKey = useRef(getUidStr()).current
    const key2PathMapping = useRef(new Map<React.Key, React.Key[]>()).current
    const path2KeyMapping = useRef(new Map<string, React.Key>()).current
    const menuItemActionMapping = useRef(new Map<React.Key, MenuItemActions>()).current
    const subMenuActionMapping = useRef(new Map<React.Key, SubMenuActions>()).current

    /**  */
    const bindMenuItem = useRefMethod((key: string, options: BindMenuItemOptions) => {
        const { path, updateActive } = options
        const pathStr = getPathStr(path)

        key2PathMapping.set(key, path)
        path2KeyMapping.set(pathStr, key)
        menuItemActionMapping.set(key, { updateActive })
    })
    const unbindMenuItem = useRefMethod((key: string) => {
        const path = key2PathMapping.get(key)
        const pathStr = getPathStr(path)

        key2PathMapping.delete(key)
        path2KeyMapping.delete(pathStr)
        menuItemActionMapping.delete(key)
    })

    /**  */
    const bindSubMenu = useRefMethod((key: string, options: BindSubMenuOptions) => {
        const { path, updateOpen, updateInPath } = options
        const pathStr = getPathStr(path)

        key2PathMapping.set(key, path)
        path2KeyMapping.set(pathStr, key)
        subMenuActionMapping.set(key, { updateInPath, updateOpen })
    })
    const unbindSubMenu = useRefMethod((key: string) => {
        const path = key2PathMapping.get(key)
        const pathStr = getPathStr(path)

        key2PathMapping.delete(key)
        path2KeyMapping.delete(pathStr)
        subMenuActionMapping.delete(key)
    })

    /** 触发SubMenu和MenuItem状态更新 */
    const dispatchMenuItemActions = useRefMethod(() => {
        menuItemActionMapping.forEach((actions, key) => {
            const path = key2PathMapping.get(key)

            actions.updateActive(shallowEqual(activePath, path))
        })
    })

    const dispatchSubMenuActions = useRefMethod(() => {
        subMenuActionMapping.forEach((actions, key) => {
            const path = key2PathMapping.get(key)

            actions.updateOpen(openKeys.includes(key))
            actions.updateInPath(path.every((r) => activePath.includes(r)))
        })
    })

    const onMenuItemClick = useRefMethod((dataItem: MenuBaseData) => {
        const path = key2PathMapping.get(dataItem.key)

        if (!path || dataItem.disabled) return

        setActivePath(path)

        if (onClick) {
            onClick(dataItem)
        }

        if (mode !== 'inline') {
            syncSetOpenKeys([])
        }
    })

    const onInlineSubMenuClick = useRefMethod((dataItem: MenuBaseData, open: boolean) => {
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return

        if (open) {
            syncSetOpenKeys([...openKeys, key])
        } else {
            syncSetOpenKeys(openKeys.filter((it) => it !== key))
        }
    })

    const onDirectionalSubMenuToggleOpenKeys = useRefMethod((dataItem: MenuBaseData, open: boolean) => {
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return

        if (open) {
            delaySetOpenKeys(path)
        } else {
            delaySetOpenKeys([])
        }
    })

    useEffect(() => {
        dispatchMenuItemActions()
        dispatchSubMenuActions()
    }, [openKeys, activePath])

    const isVertical = mode === 'vertical'
    const menuCls = classnames(menuClass('_', isVertical ? 'vertical' : mode, theme === 'dark' && 'dark'), className)

    return (
        <MenuContext.Provider
            value={{
                mode,
                bindMenuItem,
                unbindMenuItem,
                bindSubMenu,
                unbindSubMenu,
                inlineIndent,
                subMenuTriggerActions,
                onMenuItemClick,
                componentKey,
                onInlineSubMenuClick,
                onDirectionalSubMenuToggleOpenKeys,
            }}
        >
            <div style={style} className={menuCls}>
                <ul className={menuClass('wrapper')}>{parseChildren(data)}</ul>
            </div>
        </MenuContext.Provider>
    )
}

export default React.memo(Menu)
