import { createContext } from 'react'
import { FormItemContextProps } from '../type'

export const { Provider: FormItemProvider, Consumer: FormItemConsumer } = createContext<FormItemContextProps>(undefined)
