import React, { createContext } from 'react'
import { UploadContext } from './type'

const context = createContext<UploadContext>(undefined)

export const { Provider } = context

export const consumer = Origin => props => (
    <context.Consumer>{value => <Origin {...props} {...value} />}</context.Consumer>
)
