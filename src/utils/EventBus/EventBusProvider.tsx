import React from 'react'
import { PureComponent } from '../component'
import EventBus from './index'
import { Provider } from './EventBusContext'

export default class EventBusProvider<T extends Record<string, any>> extends PureComponent {
    eventBus = new EventBus<T>()

    render() {
        const { children } = this.props

        return <Provider value={this.eventBus}>{children}</Provider>
    }
}
