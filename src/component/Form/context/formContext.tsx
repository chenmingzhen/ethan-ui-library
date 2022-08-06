import { createContext } from 'react'
import { FormContextProps } from '../type'

const formContext = createContext<FormContextProps>(undefined)

export const { Provider: FormProvider } = formContext

export default formContext
