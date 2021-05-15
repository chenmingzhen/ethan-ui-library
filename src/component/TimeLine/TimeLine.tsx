// @ts-nocheck
import React, { memo, Children } from 'react'
import { timeLineClass } from '@/styles'
import kindOf from '@/utils/kindOf'
import TimeLineItem from './TimeLineItem'

const filterChildren = children => {
    const childArray = Children.toArray(children)

    let hasErrorType = false

    const items = childArray.reduce((array, child) => {
        const { type } = child

        if (kindOf(type, TimeLineItem)) {
            array.push(child)
        } else {
            hasErrorType = true
        }

        return array
    }, [])

    if (hasErrorType) {
        console.warn('Ethan Timeline children must all be TimelineItem')
    }

    return items
}

const TimeLine = props => (
    <div className={timeLineClass('_')} style={props.style}>
        <ul>{filterChildren(props.children)}</ul>
    </div>
)

export default memo(TimeLine)
