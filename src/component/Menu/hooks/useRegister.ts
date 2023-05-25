import { useRef } from 'react'
import useRefMethod from '@/hooks/useRefMethod'
import {
    RegisterMenuItemOptions,
    RegisterSubMenuOptions,
    MenuItemActions,
    SubMenuActions,
    RegisterMenuItemGroupOptions,
} from '../type'
import { getPathStr } from '../util'

export default function useRegister() {
    const key2PathMapping = useRef(new Map<React.Key, React.Key[]>()).current
    const path2KeyMapping = useRef(new Map<string, React.Key>()).current
    const menuItemMapping = useRef(new Map<React.Key, MenuItemActions>()).current
    const subMenuMapping = useRef(new Map<React.Key, SubMenuActions>()).current

    /**  */
    const registerMenuItem = useRefMethod((key: string, options: RegisterMenuItemOptions) => {
        const { path, updateActive } = options
        const pathStr = getPathStr(path)

        key2PathMapping.set(key, path)
        path2KeyMapping.set(pathStr, key)
        menuItemMapping.set(key, { updateActive })
    })
    const unregisterMenuItem = useRefMethod((key: string) => {
        const path = key2PathMapping.get(key)
        const pathStr = getPathStr(path)

        key2PathMapping.delete(key)
        path2KeyMapping.delete(pathStr)
        menuItemMapping.delete(key)
    })

    /**  */
    const registerSubMenu = useRefMethod((key: string, options: RegisterSubMenuOptions) => {
        const { path, updateOpen, updateInPath } = options
        const pathStr = getPathStr(path)

        key2PathMapping.set(key, path)
        path2KeyMapping.set(pathStr, key)
        subMenuMapping.set(key, { updateInPath, updateOpen })
    })
    const unregisterSubMenu = useRefMethod((key: string) => {
        const path = key2PathMapping.get(key)
        const pathStr = getPathStr(path)

        key2PathMapping.delete(key)
        path2KeyMapping.delete(pathStr)
        subMenuMapping.delete(key)
    })

    const registerMenuItemGroup = useRefMethod((key: string, options: RegisterMenuItemGroupOptions) => {
        const { path } = options
        const pathStr = getPathStr(path)

        key2PathMapping.set(key, path)
        path2KeyMapping.set(pathStr, key)
    })
    const unregisterMenuItemGroup = useRefMethod((key: string) => {
        const path = key2PathMapping.get(key)
        const pathStr = getPathStr(path)

        key2PathMapping.delete(key)
        path2KeyMapping.delete(pathStr)
    })

    return {
        key2PathMapping,
        path2KeyMapping,
        menuItemMapping,
        subMenuMapping,
        /**  */
        registerMenuItem,
        unregisterMenuItem,
        registerSubMenu,
        unregisterSubMenu,
        registerMenuItemGroup,
        unregisterMenuItemGroup,
    }
}
