// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesome } from '@/component/Icon'
import { timeLineClass } from '@/styles'

class TimeLineItem extends React.PureComponent {
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

TimeLineItem.propTypes = {
    icon: PropTypes.element,
}

export default TimeLineItem
