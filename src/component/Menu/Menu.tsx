import React, { useRef, useState } from 'react'
import classnames from 'classnames'
import { menuClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import { isObject } from '@/utils/is'
import { More } from '@/index'
import { debounce } from '@/utils/func'
import { MenuBaseData, MenuProps } from './type'
import MenuContext from './context/MenuContext'
import { INTERNAL_MORE_KEY, parseChildren } from './util'
import useOpenKeys from './hooks/useOpenKeys'
import useRegister from './hooks/useRegister'
import useActionEffect from './hooks/useActionEffect'
import SubMenu from './SubMenu'
import MenuItemGroup from './MenuItemGroup'
import MenuItem from './MenuItem'

function Menu<T extends MenuBaseData = MenuBaseData>(props: MenuProps<T>): JSX.Element {
    const {
        data,
        style,
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

    const onLeafClick = useRefMethod((dataItem: T) => {
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

    const onInlineSubMenuTitleClick = useRefMethod((dataItem: T, open: boolean) => {
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return

        if (open) {
            syncSetOpenKeys([...openKeys, key])
        } else {
            syncSetOpenKeys(openKeys.filter((it) => it !== key))
        }
    })

    const onDirectionalToggleOpenKeys = useRefMethod((dataItem: T, open: boolean) => {
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return

        if (open) {
            delaySetOpenKeys(path)
        } else {
            delaySetOpenKeys([])
        }
    })

    const onMouseEnterOpen = useRefMethod((dataItem: T) => {
        if (!hasHoverTriggerAction) return
        onDirectionalToggleOpenKeys(dataItem, true)
    })

    const onMouseLeaveClose = useRefMethod((dataItem: T) => {
        if (!hasHoverTriggerAction) return
        onDirectionalToggleOpenKeys(dataItem, false)
    })

    const onMouseClickToggle = useRefMethod((dataItem: T, open: boolean) => {
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

    const menuCls = classnames(menuClass('_', mode), className)
    const ulRef = useRef<HTMLUListElement>()

    /** @todo 展开或收缩会导致状态丢失 */
    const handleComputeFinish = useRefMethod(
        debounce(() => {
            if (activePath.length) {
                const activeMenuItemKey = activePath[activePath.length - 1]
                const path = key2PathMapping.get(activeMenuItemKey)

                // /** 如果不存在path，可能是Trigger未展开，导致MenuItem未注册 */
                // if (!path) {
                //     setActivePath([INTERNAL_MORE_KEY, ...activePath])
                // } else {
                //     setActivePath(key2PathMapping.get(activeMenuItemKey))
                // }

                setActivePath(path || [])
            }
        })
    )

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
            <ul className={menuCls} style={style} ref={ulRef}>
                <More
                    data={data}
                    getMoreText={() => '...'}
                    compressed={mode === 'horizontal'}
                    onComputeFinish={handleComputeFinish}
                    getContainerElement={() => ulRef.current}
                    getMoreElement={(container) => container.querySelector(`.${menuClass('more')}`)}
                    renderMore={(rest) => (
                        <SubMenu dataItem={{ key: INTERNAL_MORE_KEY, title: '...', className: menuClass('more') }}>
                            {rest}
                        </SubMenu>
                    )}
                    renderItem={(dataItem, index) => {
                        if (isObject(dataItem)) {
                            const { title, children, key, type, ...restProps } = dataItem
                            const mergedKey = key || index

                            if (type === 'group') {
                                return (
                                    <MenuItemGroup key={mergedKey} {...restProps} dataItem={dataItem}>
                                        {parseChildren(children)}
                                    </MenuItemGroup>
                                )
                            }

                            if (children) {
                                return (
                                    <SubMenu key={mergedKey} {...restProps} dataItem={dataItem}>
                                        {parseChildren(children)}
                                    </SubMenu>
                                )
                            }

                            return (
                                <MenuItem key={mergedKey} {...restProps} dataItem={dataItem}>
                                    {title}
                                </MenuItem>
                            )
                        }

                        return null
                    }}
                />
            </ul>
        </MenuContext.Provider>
    )
}

export default React.memo(Menu) as unknown as typeof Menu
