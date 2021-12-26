import { MemoExoticComponent } from 'react'
import TimeLine, { TimeLineProps } from './TimeLine'
import TimeLineItem from './TimeLineItem'

export interface TimeLineComponent extends MemoExoticComponent<React.FC<TimeLineProps>> {
    Item: typeof TimeLineItem
}

const ComputedTimeLine = (TimeLine as unknown) as TimeLineComponent

ComputedTimeLine.Item = TimeLineItem

export default ComputedTimeLine
