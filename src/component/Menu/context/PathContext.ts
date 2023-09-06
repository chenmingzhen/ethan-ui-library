import { createContext } from 'react'
import { PathContextProps } from '../type'

const PathContext = createContext<PathContextProps>(undefined)

export default PathContext
