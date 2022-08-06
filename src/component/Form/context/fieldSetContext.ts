import { createContext } from 'react'
import { FieldSetContextProps } from '../type'

export const { Provider: FieldSetProvider, Consumer: FieldSetConsumer } = createContext<FieldSetContextProps>(undefined)
