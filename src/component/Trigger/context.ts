import { createContext } from 'react'
import { TriggerContextProps } from './type'

const TriggerContext = createContext<TriggerContextProps>(undefined)

export default TriggerContext
