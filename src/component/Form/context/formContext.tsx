import { createContext } from 'react'
import { FormContextProps } from '../type'

export const { Provider: FormProvider, Consumer: FormConsumer } = createContext<FormContextProps>(undefined)
