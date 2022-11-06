import React from 'react'
import { MenuContext } from './type'

const context = React.createContext<MenuContext>(null)

const { Consumer } = context

export const { Provider } = context

export const consumer = (Origin) => (props) =>
    (
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
