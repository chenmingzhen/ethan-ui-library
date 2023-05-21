import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { menuClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import useMergedValue from '@/hooks/useMergedValue'
import shallowEqual from '@/utils/shallowEqual'
import { getUidStr } from '@/utils/uid'
import { debounce } from '@/utils/func'
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

    const [menuElement, setMenuElement] = useState<HTMLElement>()
    const [activePath, setActivePath] = useState<React.Key[]>([])
    const [openKeys, setOpenKeys] = useMergedValue<React.Key[]>({
        defaultStateValue: [],
        options: {
            defaultValue: defaultOpenKeys,
            value: props.openKeys,
            onChange: onOpenChange,
        },
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

            /** @todo hasOpen */
        })
    })

    const handleMenuItemClick = useRefMethod((key: React.Key, itemData: MenuBaseData) => {
        const path = key2PathMapping.get(key)

        if (path) {
            setActivePath(path)

            if (onClick) {
                onClick(itemData)
            }

            if (mode === 'inline') {
                /** 关闭该路径 */
            } else {
                setOpenKeys([])
            }
        }
    })

    const onInlineSubMenuClick = useRefMethod((dataItem: MenuBaseData, open: boolean) => {
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return

        if (open) {
            setOpenKeys([...openKeys, key])
        } else {
            setOpenKeys(openKeys.filter((it) => it !== key))
        }
    })

    const onDirectionalSubMenuClick = useRefMethod((dataItem: MenuBaseData, open: boolean) => {
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return

        if (open) {
            /** 仅打开当前路径 */
            setOpenKeys(path)
        } else {
            const pathStr = getPathStr(key2PathMapping.get(key))
            const nextOpenKeys = []

            path2KeyMapping.forEach((currentKey, currentPathStr) => {
                if (!currentPathStr.startsWith(pathStr) && openKeys.includes(currentKey)) {
                    nextOpenKeys.push(currentKey)
                }
            })

            setOpenKeys(nextOpenKeys)
        }
    })

    useEffect(() => {
        dispatchMenuItemActions()
        dispatchSubMenuActions()
    }, [openKeys, activePath])

    /** 避免MouseLeave和MouseEnter执行两次setOpenKeys，从而导致异常 */
    const ensureSetKeysAtOnce = useRefMethod(
        debounce((keys) => {
            setOpenKeys(keys)
        }, 100)
    )

    const onMouseEnter = useRefMethod(({ key }) => {
        const path = key2PathMapping.get(key)

        ensureSetKeysAtOnce(path)
    })

    const onMouseLeave = useRefMethod(() => {
        ensureSetKeysAtOnce([])
    })

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
                onMenuItemClick: handleMenuItemClick,
                componentKey,
                onMouseEnter,
                onMouseLeave,
                onInlineSubMenuClick,
                onDirectionalSubMenuClick,
            }}
        >
            <div style={style} className={menuCls} ref={setMenuElement}>
                <ul className={menuClass('wrapper')}>{parseChildren(data)}</ul>
            </div>
        </MenuContext.Provider>
    )
}

export default React.memo(Menu)
