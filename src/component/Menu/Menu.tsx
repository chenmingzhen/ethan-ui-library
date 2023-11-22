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

    const { manualExecuteAction } = useActionEffect({
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

    const handleComputeFinish = useRefMethod(
        debounce((showCount: number, collapseMapping: Map<React.Key, boolean>) => {
            if (activePath.length) {
                const realRootKey = activePath[0] !== INTERNAL_MORE_KEY ? activePath[0] : activePath[1]
                const collapse = collapseMapping.get(realRootKey)

                if (collapse && activePath[0] !== INTERNAL_MORE_KEY) {
                    /** 若折叠且上个状态是非折叠，需要添加折叠path */
                    setActivePath([INTERNAL_MORE_KEY, ...activePath])
                } else if (!collapse && activePath[0] === INTERNAL_MORE_KEY) {
                    /** 若无折叠且上个状态是折叠，需要移除折叠path */
                    const nextActivePath = [...activePath]

                    nextActivePath.shift()

                    setActivePath(nextActivePath)
                } else {
                    setActivePath(activePath)
                }
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
                manualExecuteAction,
                onMouseEnterOpen,
                onMouseLeaveClose,
                onMouseClickToggle,
                ...registerEvents,
            }}
        >
            <ul className={menuCls} style={style} ref={ulRef}>
                <More
                    data={data}
                    keyName="key"
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
                            const { title, children, key, type } = dataItem
                            const mergedKey = key || index

                            if (type === 'group') {
                                return (
                                    <MenuItemGroup key={mergedKey} dataItem={dataItem}>
                                        {parseChildren(children)}
                                    </MenuItemGroup>
                                )
                            }

                            if (children) {
                                return (
                                    <SubMenu key={mergedKey} dataItem={dataItem}>
                                        {parseChildren(children)}
                                    </SubMenu>
                                )
                            }

                            return (
                                <MenuItem key={mergedKey} dataItem={dataItem}>
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
