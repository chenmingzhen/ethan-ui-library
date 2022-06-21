import React from 'react'
import { InjectComponent } from '../utilityTypes'
import { Consumer } from './EventBusContext'

export default function WithEvent<T>(Origin: InjectComponent<T>): InjectComponent<Omit<T, 'eventBus'>> {
    return props => {
        return <Consumer>{eventBus => <Origin {...props} eventBus={eventBus} />}</Consumer>
    }
}
