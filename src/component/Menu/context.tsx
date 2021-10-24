import React from 'react'
import createReactContext from 'create-react-context'
import { MenuContext } from './type'

const context = createReactContext<MenuContext>(null)

const { Consumer } = context

export const { Provider } = context

export const consumer = Origin => props => (
    <Consumer>
        {({ bindItem, unBindItem }) => <Origin {...props} bindItem={bindItem} unBindItem={unBindItem} />}
    </Consumer>
)
