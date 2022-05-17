import { createContext } from 'react'
import { CardContext } from './type'

export const context = createContext<CardContext>(null)

export const { Provider } = context
