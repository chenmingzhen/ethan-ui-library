import { createContext } from 'react'
import { MoreContextProps } from './type'

const MoreContext = createContext<MoreContextProps>(undefined)

export default MoreContext
