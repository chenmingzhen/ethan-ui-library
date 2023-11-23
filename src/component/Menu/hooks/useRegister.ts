import { useRef } from 'react'
import useRefMethod from '@/hooks/useRefMethod'
import {
    RegisterMenuItemOptions,
    RegisterSubMenuOptions,
    MenuItemActions,
    SubMenuActions,
    RegisterMenuItemGroupOptions,
} from '../type'

export default function useRegister() {
    const key2PathMapping = useRef(new Map<React.Key, React.Key[]>()).current
    const menuItemMapping = useRef(new Map<React.Key, MenuItemActions>()).current
    const subMenuMapping = useRef(new Map<React.Key, SubMenuActions>()).current

    /**  */
    const registerMenuItem = useRefMethod((key: string, options: RegisterMenuItemOptions) => {
        const { path, updateActive } = options

        key2PathMapping.set(key, path)
        menuItemMapping.set(key, { updateActive })
    })
    const unregisterMenuItem = useRefMethod((key: string) => {
        key2PathMapping.delete(key)
        menuItemMapping.delete(key)
    })

    /**  */
    const registerSubMenu = useRefMethod((key: string, options: RegisterSubMenuOptions) => {
        const { path, updateOpen, updateInPath } = options

        key2PathMapping.set(key, path)
        subMenuMapping.set(key, { updateInPath, updateOpen })
    })
    const unregisterSubMenu = useRefMethod((key: string) => {
        key2PathMapping.delete(key)
        subMenuMapping.delete(key)
    })

    const registerMenuItemGroup = useRefMethod((key: string, options: RegisterMenuItemGroupOptions) => {
        const { path } = options

        key2PathMapping.set(key, path)
    })
    const unregisterMenuItemGroup = useRefMethod((key: string) => {
        key2PathMapping.delete(key)
    })

    return {
        key2PathMapping,
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
