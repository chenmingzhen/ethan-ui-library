import React from 'react'
import { CheckboxGroupContext } from './type'

export const CheckboxContext = React.createContext<CheckboxGroupContext>(undefined)

export const { Provider } = CheckboxContext

export const consumer = (Origin) => (props) =>
    <CheckboxContext.Consumer>{(value) => <Origin {...props} {...value} />}</CheckboxContext.Consumer>
