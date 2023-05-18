import { createContext } from 'react'
import { MenuContextProps } from '../type'

const MenuContext = createContext<MenuContextProps>(undefined)

export default MenuContext
