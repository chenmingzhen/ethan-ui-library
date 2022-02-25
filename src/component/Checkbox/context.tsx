import React from 'react'
import { CheckHandlerContext } from './type'

const context = React.createContext<CheckHandlerContext>(undefined)

export const { Provider } = context

export const consumer = Origin => props => (
    <context.Consumer>{value => <Origin {...props} {...value} />}</context.Consumer>
)
