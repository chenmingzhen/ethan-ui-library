// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/component/Button'
import Alert from '@/component/Alert'
import { Component } from '@/utils/component'
import { popoverClass } from '@/styles'
import { getProps } from '@/utils/proptypes'
import { getLocale } from '@/locale'
import Popover from './Popover'

export default class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ok: false,
            cancel: false,
        }

        this.handleCancel = this.handleClick.bind(this, 'cancel')
        this.handleOk = this.handleClick.bind(this, 'ok')
    }

    /**
     *
     * @param {boolean} type ok or cancel
     * @param {function} close Panel中的handleHide
     */
    handleClick(type, close) {
        const { onOk, onCancel } = this.props
        const fn = type === 'ok' ? onOk : onCancel

        let callback

        if (fn) callback = fn()
        if (callback && typeof callback.then === 'function') {
            this.setState({ [type]: true }, () => {
                callback.then(() => {
                    close()
                    this.setState({ [type]: false })
                })
            })
        } else {
            close()
        }
    }

    render() {
        const { children, type, text, onOk, onCancel, ...other } = this.props
        const { ok, cancel } = this.state

        // close是从Panel的childrened传过来的 handleHide
        return (
            <Popover {...other} trigger="click">
                {close => (
                    <div className={popoverClass('confirm')}>
                        <div className={popoverClass('mention')}>
                            <Alert type={type} icon className={popoverClass('alert')}>
                                {children}
                            </Alert>
                        </div>

                        <div className={popoverClass('footer')}>
                            <Button loading={cancel} size="small" onClick={() => this.handleCancel(close)}>
                                {getLocale('cancel', text)}
                            </Button>
                            <Button loading={ok} size="small" type="primary" onClick={() => this.handleOk(close)}>
                                {getLocale('ok', text)}
                            </Button>
                        </div>
                    </div>
                )}
            </Popover>
        )
    }
}

Confirm.propTypes = {
    ...getProps(PropTypes, 'type'),
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    text: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
}

Confirm.defaultProps = {
    // eslint-disable-next-line react/default-props-match-prop-types
    type: 'warning',
}
