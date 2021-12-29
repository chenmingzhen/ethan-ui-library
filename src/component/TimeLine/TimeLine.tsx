import React, { memo, Children } from 'react'
import { timeLineClass } from '@/styles'
import kindOf from '@/utils/kindOf'
import TimeLineItem, { TimeLineItemProps } from './TimeLineItem'

export interface TimeLineProps {
    className?: string

    style?: React.CSSProperties

    children?: React.ReactElement<TimeLineItemProps>[]
}

const TimeLine: React.FC<TimeLineProps> = ({ style, children, className }) => {
    const filterChildren = React.useCallback(() => {
        const childArray = Children.toArray(children)

        let hasErrorType = false

        const items = childArray.reduce(
            (array: React.ReactElement<TimeLineItemProps>[], child: React.ReactElement<TimeLineItemProps>, index) => {
                const { type } = child

                if (kindOf(type, TimeLineItem)) {
                    array.push(React.cloneElement(child, { key: `__TIMELINE__${index}` }))
                } else {
                    hasErrorType = true
                }

                return array
            },
            []
        )

        if (hasErrorType) {
            console.warn('Ethan Timeline children must all be TimelineItem')
        }

        return items
    }, [children])

    return (
        <div className={timeLineClass('_', className)} style={style}>
            <ul>{filterChildren()}</ul>
        </div>
    )
}

TimeLine.displayName = 'EthanTimeLine'

export default memo(TimeLine)
