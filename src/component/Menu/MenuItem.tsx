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
    const { itemData } = props
    const { key, title, disabled } = itemData
    const [active, updateActive] = useState(false)
    const { path } = useMenuPath(key)
    const { bindMenuItem, unbindMenuItem, onMenuItemClick, componentKey, onMouseEnter, onMouseLeave } =
        useContext(MenuContext)

    useIsomorphicLayoutEffect(() => {
        bindMenuItem(key, { path, updateActive } as any)

        return () => {
            unbindMenuItem(key)
        }
    }, [path])

    function handleMenuItemClick(e: React.MouseEvent) {
        if (disabled) return

        onMenuItemClick(key, itemData)

        // 阻止事件冒泡并且阻止该元素上同事件类型的监听器被触发
        // 阻止剩下的事件处理程序被执行。
        // 阻止document click的执行
        e.nativeEvent.stopImmediatePropagation()
    }

    const inlineIndentStyle = useInlineIndentStyle(path)

    const className = menuClass('item', disabled === true && 'disabled', active && 'active')

    function handleMouseEnter() {
        onMouseEnter(itemData)
    }

    function handleMouseLeave() {
        onMouseLeave(itemData)
    }

    return (
        <li
            className={className}
            data-ck={getPathStr(path)}
            tabIndex={-1}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className={classnames(menuClass('title'))} style={inlineIndentStyle} onClick={handleMenuItemClick}>
                {title}
            </span>
        </li>
    )
}

export default React.memo(MenuItem)
