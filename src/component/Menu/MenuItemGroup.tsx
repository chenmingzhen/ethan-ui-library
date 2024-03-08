import React, { useContext, useEffect } from 'react'
import { menuClass } from '@/styles'
import { MenuItemGroupProps } from './type'
import MenuContext from './context/MenuContext'
import useMenuPath from './hooks/useMenuPath'
import useInlineIndentStyle from './hooks/useInlineIndentStyle'
import PathContext from './context/PathContext'

const MenuItemGroup: React.FC<MenuItemGroupProps> = function (props) {
    const { dataItem, children } = props
    const { title, key } = dataItem
    const { path } = useMenuPath(key)
    const {
        componentKey,
        registerMenuItemGroup,
        unregisterMenuItemGroup,
        onMouseEnterOpen,
        onMouseLeaveClose,
        manualExecuteAction,
        renderItem,
    } = useContext(MenuContext)

    const inlineIndentStyle = useInlineIndentStyle(path, true)

    useEffect(() => {
        registerMenuItemGroup(key, { path })

        manualExecuteAction()

        return () => {
            unregisterMenuItemGroup(key)
        }
    }, [path, props.showCount])

    return (
        <PathContext.Provider value={{ path }}>
            <li tabIndex={-1} className={menuClass('group')} data-ck={componentKey}>
                <div
                    style={inlineIndentStyle}
                    className={menuClass('group-title')}
                    onMouseEnter={() => onMouseEnterOpen(dataItem)}
                    onMouseLeave={() => onMouseLeaveClose(dataItem)}
                >
                    {renderItem?.(dataItem) ?? title}
                </div>
                <ul className={menuClass('list', 'inline')}>{children}</ul>
            </li>
        </PathContext.Provider>
    )
}

export default React.memo(MenuItemGroup)
