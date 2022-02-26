import { createContext } from 'react'
import { PaginationContext } from '../type'

const paginationContext = createContext<PaginationContext>(null)

export const { Provider: PaginationProvider } = paginationContext

export default paginationContext
