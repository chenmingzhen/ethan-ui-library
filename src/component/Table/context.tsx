// @ts-nocheck
import React from 'react'
import createReactContext from 'create-react-context'

const context = createReactContext()

export const { Provider } = context

const consumer = Origin => props => (
    <context.Consumer>
        {value => {
            // eslint-disable-next-line react/prop-types
            const mp = Object.assign({}, props, value && props.absolute === undefined && { absolute: true })
            return <Origin {...mp} />
        }}
    </context.Consumer>
)

export default consumer
