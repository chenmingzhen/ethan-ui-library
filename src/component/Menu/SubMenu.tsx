import React, { useContext, useEffect, useState } from 'react'
import { menuClass } from '@/styles'
import useMenuPath from './hooks/useMenuPath'
import PathContext from './context/PathContext'
import { SubMenuProps } from './type'
import MenuContext from './context/MenuContext'
import InlineTrigger from './InlineTrigger'
import DirectionalTrigger from './DirectionalTrigger'

const SubMenu: React.FC<SubMenuProps> = function (props) {
    const { dataItem, children } = props
    const { key, disabled, title } = dataItem
    const { path } = useMenuPath(key)
    const [open, updateOpen] = useState(false)
    const [inPath, updateInPath] = useState(false)
    const { registerSubMenu, unregisterSubMenu, mode } = useContext(MenuContext)

    useEffect(() => {
        registerSubMenu(key, { updateInPath, updateOpen, path })

        return () => {
            unregisterSubMenu(key)
        }
    }, [path])

    const className = menuClass('item', 'submenu', disabled === true && 'disabled', open && 'open', inPath && 'in-path')

    function buildTrigger() {
        if (mode === 'inline') {
            return (
                <InlineTrigger
                    dataItem={dataItem}
                    visible={open}
                    path={path}
                    popupContent={children}
                    className={className}
                >
                    {title}
                </InlineTrigger>
            )
        }

        if (mode === 'vertical') {
            return (
                <DirectionalTrigger
                    dataItem={dataItem}
                    visible={open}
                    path={path}
                    popupContent={children}
                    className={className}
                    direction="vertical"
                >
                    {title}
                </DirectionalTrigger>
            )
        }

        if (mode === 'horizontal') {
            return (
                <DirectionalTrigger
                    dataItem={dataItem}
                    visible={open}
                    path={path}
                    popupContent={children}
                    className={className}
                    direction="horizontal"
                >
                    {title}
                </DirectionalTrigger>
            )
        }

        return null
    }

    return <PathContext.Provider value={{ path }}>{buildTrigger()}</PathContext.Provider>
}

export default React.memo(SubMenu)
