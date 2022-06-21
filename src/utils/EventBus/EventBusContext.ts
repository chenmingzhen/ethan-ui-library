import { createContext } from 'react'

const EventBusContext = createContext(undefined)

export const { Provider, Consumer } = EventBusContext

export default EventBusContext
