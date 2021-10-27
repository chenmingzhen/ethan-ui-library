import React from 'react'
import createReactContext from 'create-react-context'
import { MenuContext } from './type'

const context = createReactContext<MenuContext>(null)

const { Consumer } = context

export const { Provider } = context

export const consumer = Origin => props => (
    <Consumer>
        {({ bindItem, unbindItem, checkActive, checkInPath, checkOpen }) => (
            <Origin
                {...props}
                bindItem={bindItem}
                unBindItem={unbindItem}
                checkActive={checkActive}
                checkInPath={checkInPath}
                checkOpen={checkOpen}
            />
        )}
    </Consumer>
)
