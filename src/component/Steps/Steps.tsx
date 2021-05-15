// @ts-nocheck
import React, { memo, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { stepsClass } from '@/styles'

const Steps = props => {
    const { current, status, vertical, children, mini } = props

    const filterChildren = useMemo(() => {
        const newChildren = []
        let hasErrorChild = false

        React.Children.map(children, item => {
            if (item.type.displayName === 'EthanStepItem') {
                newChildren.push(item)
                return
            }

            hasErrorChild = true
        })

        if (hasErrorChild) console.error('Steps Component must be full of StepItem Component')

        return newChildren
    }, [children, current, mini, status, vertical])

    const renderStep = useCallback(() => {
        const total = React.Children.count(filterChildren)

        return React.Children.map(filterChildren, (child, index) => {
            const childProps = {}

            childProps.step = index + 1
            childProps.width = !vertical ? 100 / total : 0
            childProps.height = vertical ? 100 / total : 0
            childProps.index = index

            if (index === Number(current)) {
                childProps.status = status === 'error' ? 'error' : 'process'
            } else if (index > Number(current)) {
                childProps.status = 'wait'
            } else if (index < Number(current)) {
                childProps.status = 'finish'
            }

            return React.cloneElement(child, Object.assign({}, child.props, childProps))
        })
    }, [children, current, mini, status, vertical])

    return (
        <div className={stepsClass('_', { vertical, mini })} style={props.style}>
            {renderStep()}
        </div>
    )
}

Steps.defaultProps = {
    status: 'process',
    current: 0,
}
Steps.propTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
    mini: PropTypes.bool,
    status: PropTypes.oneOf(['wait', 'process', 'finish', 'error']),
    style: PropTypes.object,
}

export default memo(Steps)
