import React, { useContext, useEffect, useState } from 'react'
import { menuClass } from '@/styles'
import classnames from 'classnames'
import { MenuItemProps } from './type'
import useMenuPath from './hooks/useMenuPath'
import MenuContext from './context/MenuContext'
import useInlineIndentStyle from './hooks/useInlineIndentStyle'
import { getPathStr } from './util'
import { MoreItemContext } from '../More/context'

const MenuItem: React.FC<MenuItemProps> = function (props) {
    const { dataItem, children } = props
    const { key, disabled, className } = dataItem
    const { path } = useMenuPath(key)
    const [active, updateActive] = useState(false)
    const {
        registerMenuItem,
        unregisterMenuItem,
        onLeafClick,
        onMouseEnterOpen,
        onMouseLeaveClose,
        manualExecuteAction,
    } = useContext(MenuContext)

    const moreItemContext = useContext(MoreItemContext) || {}

    useEffect(() => {
        registerMenuItem(key, { path, updateActive } as any)

        manualExecuteAction()

        return () => {
            unregisterMenuItem(key)
        }
    }, [path.join(',')])

    const inlineIndentStyle = useInlineIndentStyle(path)
    const ms = classnames(menuClass('item', disabled === true && 'disabled', active && 'active'), className)

    return (
        <li
            {...moreItemContext}
            tabIndex={-1}
            className={ms}
            data-ck={getPathStr(path)}
            onClick={() => onLeafClick(dataItem)}
            onMouseEnter={() => onMouseEnterOpen(dataItem)}
            onMouseLeave={() => onMouseLeaveClose(dataItem)}
        >
            <span className={classnames(menuClass('title'))} style={inlineIndentStyle}>
                {children}
            </span>
        </li>
    )
}

export default React.memo(MenuItem)
