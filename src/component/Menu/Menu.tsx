import React, { useState } from 'react'
import classnames from 'classnames'
import { menuClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import { MenuBaseData, MenuProps } from './type'
import MenuContext from './context/MenuContext'
import { parseChildren } from './util'
import useOpenKeys from './hooks/useOpenKeys'
import useRegister from './hooks/useRegister'
import useActionEffect from './hooks/useActionEffect'

const Menu: React.FC<MenuProps> = function (props) {
    const {
        data,
        style,
        theme,
        className,
        onOpenChange,
        onSelectChange,
        defaultOpenKeys,
        mode = 'inline',
        inlineIndent = 24,
        subMenuTriggerActions = ['click'],
    } = props

    const [activePath, setActivePath] = useState<React.Key[]>([])
    const { key2PathMapping, path2KeyMapping, menuItemMapping, subMenuMapping, ...registerEvents } = useRegister()
    const { openKeys, syncSetOpenKeys, delaySetOpenKeys } = useOpenKeys({
        subMenuMapping,
        defaultValue: defaultOpenKeys,
        value: props.openKeys,
        onChange: onOpenChange,
    })

    useActionEffect({
        openKeys,
        activePath,
        subMenuMapping,
        key2PathMapping,
        menuItemMapping,
    })

    /** -------------------------- Menu events-------------------------- */
    const hasClickTriggerAction = subMenuTriggerActions.includes('click')
    const hasHoverTriggerAction = subMenuTriggerActions.includes('hover')

    const onLeafClick = useRefMethod((dataItem: MenuBaseData) => {
        const path = key2PathMapping.get(dataItem.key)

        if (!path || dataItem.disabled) return

        setActivePath(path)

        if (onSelectChange) {
            onSelectChange(dataItem, path)
        }

        if (mode !== 'inline') {
            syncSetOpenKeys([])
        }
    })

    const onInlineSubMenuTitleClick = useRefMethod((dataItem: MenuBaseData, open: boolean) => {
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

    const onMouseEnterOpen = useRefMethod((dataItem: MenuBaseData) => {
        if (!hasHoverTriggerAction) return
        onDirectionalToggleOpenKeys(dataItem, true)
    })

    const onMouseLeaveClose = useRefMethod((dataItem: MenuBaseData) => {
        if (!hasHoverTriggerAction) return
        onDirectionalToggleOpenKeys(dataItem, false)
    })

    const onMouseClickToggle = useRefMethod((dataItem: MenuBaseData, open: boolean) => {
        if (!hasClickTriggerAction) return
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return

        if (open) {
            syncSetOpenKeys(path)
        } else {
            const index = path.indexOf(key)
            const nextOpenKeys = path.slice(0, index)

            syncSetOpenKeys(nextOpenKeys)
        }
    })

    /** -------------------------------------------------------- */

    const menuCls = classnames(menuClass('_', mode, theme === 'dark' && 'dark'), className)

    return (
        <MenuContext.Provider
            value={{
                mode,
                onLeafClick,
                inlineIndent,
                onInlineSubMenuTitleClick,
                subMenuTriggerActions,
                onMouseEnterOpen,
                onMouseLeaveClose,
                onMouseClickToggle,
                ...registerEvents,
            }}
        >
            <div style={style} className={menuCls}>
                <ul className={menuClass('wrapper')}>{parseChildren(data)}</ul>
            </div>
        </MenuContext.Provider>
    )
}

export default React.memo(Menu)
