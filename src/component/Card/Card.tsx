// @ts-nocheck
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '@/utils/proptypes'
import { dispatchEvent } from '@/utils/dom/element'
import { cardClass } from '@/styles'
import { compose } from '@/utils/func'
import resizable from '@/hoc/resizable'
import moveable from '@/hoc/moveable'
import { Provider } from './context'

// 将onCollapse
// collapsible
// collapsed
// formStatus
// onSubmit
// setFormStatus
// 状态通过context往下传递
class Card extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            collapsed: props.defaultCollapsed,
            formStatus: '',
        }

        this.bindElement = this.bindElement.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCollapse = this.handleCollapse.bind(this)
        this.setFormStatus = this.setFormStatus.bind(this)
    }

    // 获取是否折叠状态
    getCollapsed() {
        const { collapsible, collapsed } = this.props
        if (!collapsible) return undefined
        return collapsed !== undefined ? collapsed : this.state.collapsed
    }

    setFormStatus(status) {
        if (status !== this.state.formStatus) {
            this.setState({ formStatus: status })
        }
    }

    bindElement(el) {
        this.element = el
        const { forwardedRef } = this.props
        if (forwardedRef) forwardedRef(el)
    }

    handleCollapse() {
        const collapsed = !this.getCollapsed()
        if (this.props.onCollapse) this.props.onCollapse(collapsed)
        else this.setState({ collapsed })
    }

    handleSubmit(target) {
        const form = this.element.querySelector('form')
        if (form) dispatchEvent(form, 'submit', target)
        else console.error(new Error('No form found.'))
    }

    render() {
        const { collapsible } = this.props
        const collapsed = this.getCollapsed()
        const shadow = this.props.shadow === true ? 'shadow' : this.props.shadow
        const className = classnames(
            cardClass('_', shadow, collapsible && 'collapsible', collapsed && 'collapsed'),
            this.props.className
        )

        const providerValue = {
            onCollapse: this.handleCollapse,
            collapsible,
            collapsed,
            formStatus: this.state.formStatus,
            onSubmit: this.handleSubmit,
            setFormStatus: this.setFormStatus,
        }

        return (
            <div className={className} ref={this.bindElement} style={this.props.style}>
                {/* 将Props作为context的传递值 传递下去 后面的组件根据需要进行filter */}
                <Provider value={providerValue}>{this.props.children}</Provider>
            </div>
        )
    }
}

Card.propTypes = {
    ...getProps(PropTypes),
    shadow: PropTypes.oneOf([true, false, 'hover']),
    forwardedRef: PropTypes.func,
}

Card.defaultProps = {
    ...defaultProps,
    defaultCollapsed: true,
    collapsible: false,
}

export default compose(moveable(`.${cardClass('header')}`), resizable)(Card)
