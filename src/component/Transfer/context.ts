import { createContext } from 'react'
import { TransferContextProps } from './type'

export const TransferContext = createContext<TransferContextProps>(undefined)

export const { Provider, Consumer } = TransferContext
