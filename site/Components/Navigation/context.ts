import { createContext } from 'react'

export interface Heading {
    id: string
    level: number
    children: string[]
}

interface NavigationContextProps {
    setHeadings: (headings: Heading[]) => void
}

const NavigationContext = createContext<NavigationContextProps>(undefined)

export default NavigationContext
