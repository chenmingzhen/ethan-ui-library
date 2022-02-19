import React from 'react'
import { FontAwesome } from '@/component/Icon'
import { timeLineClass } from '@/styles'
import { PureComponent } from '@/utils/component'

export interface TimeLineItemProps {
    icon?: React.ReactNode

    children: React.ReactNode

    style?: React.CSSProperties
}

class TimeLineItem extends PureComponent<TimeLineItemProps> {
    static displayName = 'EthanTimeLineItem'

    render() {
        const { icon: Icon, children, style } = this.props

        return (
            <li className={timeLineClass('item')} style={style}>
                <div className={timeLineClass('dot')}>{Icon || <FontAwesome name="circle-thin" />}</div>
                <div className={timeLineClass('content')}>{children}</div>
            </li>
        )
    }
}

export default TimeLineItem
