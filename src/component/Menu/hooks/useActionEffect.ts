import shallowEqual from '@/utils/shallowEqual'
import { useEffect } from 'react'
import { MenuItemActions, SubMenuActions } from '../type'

interface UseActionEffectProps {
    openKeys: React.Key[]
    activePath: React.Key[]
    key2PathMapping: Map<React.Key, React.Key[]>
    subMenuMapping: Map<React.Key, SubMenuActions>
    menuItemMapping: Map<React.Key, MenuItemActions>
}

/** 触发SubMenu和MenuItem状态更新 */
export default function useActionEffect(props: UseActionEffectProps) {
    const { menuItemMapping, subMenuMapping, key2PathMapping, activePath, openKeys } = props

    useEffect(() => {
        menuItemMapping.forEach((actions, key) => {
            const path = key2PathMapping.get(key)

            actions.updateActive(shallowEqual(activePath, path))
        })

        subMenuMapping.forEach((actions, key) => {
            const path = key2PathMapping.get(key)

            actions.updateOpen(openKeys.includes(key))
            actions.updateInPath(path.every((r) => activePath.includes(r)))
        })
    }, [openKeys, activePath])
}
