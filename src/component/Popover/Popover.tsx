// @ts-nocheck
import React from 'react'
import Container from '../Tooltip/Container'
import * as events from './event'
import Panel from './Panel'

const Component = Container(events)

function Popover(props) {
    if (props.content) return <Component {...props} />
    return <Panel {...props} />
}

export default Popover
