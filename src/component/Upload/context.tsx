import React, { createContext } from 'react'

const context = createContext(undefined)

export const { Provider } = context

export const consumer = Origin => props => (
    <context.Consumer>{value => <Origin {...props} {...value} />}</context.Consumer>
)
