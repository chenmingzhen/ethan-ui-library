import React from 'react'
import createReactContext from 'create-react-context'

const context = createReactContext()

export const { Provider } = context

function filterProps(props, keys) {
  if (!props) return {}

  const value = {}
  keys.forEach((k) => {
    value[k] = props[k]
  })

  return value
}

export const consumer = (Origin, keys = []) => (props) => (
  <context.Consumer>{(value) => <Origin {...props} {...filterProps(value, keys)} />}</context.Consumer>
)
