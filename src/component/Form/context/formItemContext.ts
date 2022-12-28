import { createContext } from 'react'
import { FormItemContextProps } from '../type'

const FormItemContext = createContext<FormItemContextProps>(undefined)

export const { Provider: FormItemProvider, Consumer: FormItemConsumer } = FormItemContext

export default FormItemContext
