import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { menuClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import shallowEqual from '@/utils/shallowEqual'
import { MenuBaseData, MenuProps } from './type'
import MenuContext from './context/MenuContext'
import { parseChildren } from './util'
import useOpenKeys from './hooks/useOpenKeys'
import useRegister from './hooks/useRegister'

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

    const { key2PathMapping, path2KeyMapping, menuItemActionMapping, subMenuActionMapping, ...events } = useRegister()

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

    const onDirectionalToggleOpenKeys = useRefMethod((dataItem: MenuBaseData, open: boolean) => {
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
                inlineIndent,
                subMenuTriggerActions,
                onMenuItemClick,
                onInlineSubMenuClick,
                onDirectionalToggleOpenKeys,
                ...events,
            }}
        >
            <div style={style} className={menuCls}>
                <ul className={menuClass('wrapper')}>{parseChildren(data)}</ul>
            </div>
        </MenuContext.Provider>
    )
}

export default React.memo(Menu)
