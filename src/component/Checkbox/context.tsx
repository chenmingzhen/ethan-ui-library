import React from 'react'
import { CheckboxGroupContext } from './type'

export const CheckboxContext = React.createContext<CheckboxGroupContext>(undefined)

export const { Provider } = CheckboxContext
