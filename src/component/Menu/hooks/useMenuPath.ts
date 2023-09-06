import { useContext } from 'react'
import PathContext from '../context/PathContext'

export const MENU_PATH_SEPARATOR = '__ETHAN__MENU__SEPARATOR__'

export default function useMenuPath(key: React.Key) {
    const { path: parentPath } = useContext(PathContext) || { path: [] }

    const path = [...parentPath, key]

    return { path }
}
