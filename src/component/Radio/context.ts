import React from 'react'
import { RadioGroupContextProps } from './type'

export const RadioGroupContext = React.createContext<RadioGroupContextProps>(undefined)

export const { Provider } = RadioGroupContext
