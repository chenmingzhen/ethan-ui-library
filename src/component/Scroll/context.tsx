import React from 'react'
import { ScrollContext } from './type'

const context = React.createContext<ScrollContext>(undefined)

const { Consumer } = context

export const { Provider } = context

export const scrollConsumer = Origin => props => (
    <Consumer>
        {(value = {}) => (
            <Origin {...props} scrollElement={value.element} scrollLeft={value.left} scrollTop={value.top} />
        )}
    </Consumer>
)
