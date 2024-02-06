import React, { useImperativeHandle, useRef } from 'react'
import classnames from 'classnames'
import { menuClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import { isObject } from '@/utils/is'
import { More } from '@/index'
import { debounce } from '@/utils/func'
import { MenuProps, RecursiveMenuWithExtraData } from './type'
import MenuContext from './context/MenuContext'
import { ETHAN_MENU_SEPARATOR, INTERNAL_MORE_KEY } from './util'
import useOpenKeys from './hooks/useOpenKeys'
import useRegister from './hooks/useRegister'
import useActionEffect from './hooks/useActionEffect'
import SubMenu from './SubMenu'
import MenuItemGroup from './MenuItemGroup'
import MenuItem from './MenuItem'
import useActivePath from './hooks/useActivePath'

function Menu<T extends Record<string, any> = Record<string, any>>(props: MenuProps<T>, ref): JSX.Element {
    const {
        data,
        style,
        onClick,
        onSelect,
        activeKey,
        className,
        renderItem,
        onOpenChange,
        defaultOpenKeys,
        defaultActiveKey,
        mode = 'inline',
        inlineIndent = 24,
        subMenuTriggerActions = ['click'],
        chainKey = ETHAN_MENU_SEPARATOR,
    } = props

    const [activePath, setActivePath] = useActivePath({ defaultActiveKey, activeKey, data })
    const { key2PathMapping, menuItemMapping, subMenuMapping, ...registerEvents } = useRegister()
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

    useImperativeHandle(ref, () => ulRef.current)

    /** -------------------------- Menu events-------------------------- */
    const hasClickTriggerAction = subMenuTriggerActions.includes('click')
    const hasHoverTriggerAction = subMenuTriggerActions.includes('hover')

    const onLeafClick = useRefMethod((dataItem: RecursiveMenuWithExtraData<T>) => {
        const path = key2PathMapping.get(dataItem.key)

        if (!path || dataItem.disabled) return

        setActivePath(path)

        onSelect?.(dataItem, path)
        onClick?.(dataItem, path)

        if (mode !== 'inline') {
            syncSetOpenKeys([])
        }
    })

    const onInlineSubMenuTitleClick = useRefMethod((dataItem: RecursiveMenuWithExtraData<T>, open: boolean) => {
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return
        onClick?.(dataItem, path)

        if (open) {
            syncSetOpenKeys([...openKeys, key])
        } else {
            syncSetOpenKeys(openKeys.filter((it) => it !== key))
        }
    })

    const onDirectionalToggleOpenKeys = useRefMethod((dataItem: RecursiveMenuWithExtraData<T>, open: boolean) => {
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return

        if (open) {
            delaySetOpenKeys(path)
        } else {
            delaySetOpenKeys([])
        }
    })

    const onMouseEnterOpen = useRefMethod((dataItem: RecursiveMenuWithExtraData<T>) => {
        if (!hasHoverTriggerAction) return
        onDirectionalToggleOpenKeys(dataItem, true)
    })

    const onMouseLeaveClose = useRefMethod((dataItem: RecursiveMenuWithExtraData<T>) => {
        if (!hasHoverTriggerAction) return
        onDirectionalToggleOpenKeys(dataItem, false)
    })

    const onMouseClickToggle = useRefMethod((dataItem: RecursiveMenuWithExtraData<T>, open: boolean) => {
        if (!hasClickTriggerAction) return
        const { key, disabled } = dataItem
        const path = key2PathMapping.get(key)

        if (!path || disabled) return

        if (open) {
            syncSetOpenKeys(path)
            onClick?.(dataItem, path)
        } else {
            const index = path.indexOf(key)
            const nextOpenKeys = path.slice(0, index)

            syncSetOpenKeys(nextOpenKeys)
            onClick?.(dataItem, path)
        }
    })

    /** -------------------------------------------------------- */

    const menuCls = classnames(menuClass('_', mode), className)
    const ulRef = useRef<HTMLUListElement>()

    const handleComputeFinish = useRefMethod(
        debounce((showCount: number, collapseMapping: Map<React.Key, boolean>) => {
            if (activePath?.length) {
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

    const parseChildren = useRefMethod((children: RecursiveMenuWithExtraData<T>[]) =>
        children?.map(parseDataItem).filter((opt) => opt)
    )

    const parseDataItem = useRefMethod((dataItem: RecursiveMenuWithExtraData<T>) => {
        if (isObject(dataItem)) {
            const { title, children, key, type } = dataItem

            if (type === 'group') {
                return (
                    <MenuItemGroup key={key} dataItem={dataItem}>
                        {parseChildren(children)}
                    </MenuItemGroup>
                )
            }

            if (children) {
                return (
                    <SubMenu key={key} dataItem={dataItem}>
                        {parseChildren(children)}
                    </SubMenu>
                )
            }

            return (
                <MenuItem key={key} dataItem={dataItem}>
                    {renderItem?.(dataItem) ?? title}
                </MenuItem>
            )
        }

        return null
    })

    return (
        <MenuContext.Provider
            value={{
                mode,
                chainKey,
                renderItem,
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
                    renderItem={parseDataItem}
                    compressed={mode === 'horizontal'}
                    onComputeFinish={handleComputeFinish}
                    getContainerElement={() => ulRef.current}
                    getMoreElement={(container) => container.querySelector(`.${menuClass('more')}`)}
                    renderMore={(rest) => (
                        <SubMenu dataItem={{ key: INTERNAL_MORE_KEY, title: '...', className: menuClass('more') }}>
                            {rest}
                        </SubMenu>
                    )}
                />
            </ul>
        </MenuContext.Provider>
    )
}

export default React.memo(React.forwardRef(Menu)) as unknown as typeof Menu
