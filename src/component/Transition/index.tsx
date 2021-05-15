// @ts-nocheck
import React, { memo, useState } from 'react'
import { PropTypes } from 'prop-types'
import { useMount, useUnmount, useUpdateEffect } from 'react-use'
import { CSSTransition } from 'react-transition-group'

const Transition = props => {
    const [show, setShow] = useState(props.show)

    useMount(() => {
        if (show !== props.show) {
            setShow(props.show)
        }
    })

    useUnmount(() => {
        setShow(false)
    })

    useUpdateEffect(() => {
        setShow(props.show)
    }, [props.show])

    const onExited = e => {
        props.onExited && props.onExited(e)
    }
    const onEnter = e => {
        props.onEnter && props.onEnter(e)
    }

    return (
        <CSSTransition
            in={show}
            timeout={props.timeout}
            onExited={e => onExited(e)}
            onEnter={e => onEnter(e)}
            unmountOnExit
            classNames={props.name}
        >
            {props.children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    name: 'fade',
    timeout: 300,
}
Transition.propTypes = {
    onExited: PropTypes.func,
    onEnter: PropTypes.func,
    name: PropTypes.string,
    show: PropTypes.bool,
    timeout: PropTypes.number,
}

export default memo(Transition)
