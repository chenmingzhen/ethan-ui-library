import React from 'react'
import { PureComponent } from '@/utils/component'
import Scroll from './Scroll'
import { ScrollHandlerProps } from './type'

interface ScrollHandlerState {
    left: number
    top: number
}

export default class extends PureComponent<ScrollHandlerProps, ScrollHandlerState> {
    static defaultProps: ScrollHandlerProps = {
        scroll: 'both',
        onScroll() {},
    }

    constructor(props) {
        super(props)

        const { scrollLeft, scrollTop } = props

        this.state = {
            left: scrollLeft || 0,
            top: scrollTop || 0,
        }
    }

    get scrollX() {
        const { scroll } = this.props

        return scroll === 'x' || scroll === 'both'
    }

    get scrollY() {
        const { scroll } = this.props

        return scroll === 'y' || scroll === 'both'
    }

    getRect() {
        const left = this.props.scrollLeft === undefined ? this.state.left : this.props.scrollLeft

        const top = this.props.scrollTop === undefined ? this.state.top : this.props.scrollTop

        return { left, top }
    }

    handleScroll: ScrollHandlerProps['onScroll'] = (x, y, ...others) => {
        const left = this.scrollX ? x : 0
        const top = this.scrollY ? y : 0

        // 设置偏差比例
        this.setState({ left, top })

        if (this.props.onScroll) {
            this.props.onScroll(left, top, ...others)
        }
    }

    render() {
        const { left, top } = this.getRect()

        return (
            <Scroll
                {...this.props}
                left={left}
                top={top}
                scrollX={this.scrollX}
                scrollY={this.scrollY}
                onScroll={this.handleScroll}
            />
        )
    }
}
