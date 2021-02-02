import React from 'react'
import createReactContext from 'create-react-context'

const context = createReactContext()
export const { Provider } = context

export const consumer = Origin => props => (
  <context.Consumer>{value => <Origin {...props} {...value} />}</context.Consumer>
)
