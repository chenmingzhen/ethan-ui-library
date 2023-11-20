import { createContext } from 'react'
import { MoreContextProps, MoreItemContextProps } from './type'

const MoreContext = createContext<MoreContextProps>(undefined)

export const MoreItemContext = createContext<MoreItemContextProps>(undefined)

export default MoreContext
