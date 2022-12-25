import { createContext } from 'react'
import { FieldSetContextProps } from '../type'

export const FieldSetContext = createContext<FieldSetContextProps>(undefined)

export const { Provider: FieldSetProvider, Consumer: FieldSetConsumer } = FieldSetContext
