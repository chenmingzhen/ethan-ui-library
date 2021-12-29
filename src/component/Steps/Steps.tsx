import React, { memo } from 'react'
import { stepsClass } from '@/styles'
import kindOf from '@/utils/kindOf'
import StepItem, { StepItemProps } from './StepItem'

export interface StepsProps {
    current?: number | string
    vertical?: boolean
    mini?: boolean
    status?: 'wait' | 'process' | 'finish' | 'error'
    style?: React.CSSProperties
    children: React.ReactElement<StepItemProps>[]
}

const Steps: React.FC<StepsProps> = props => {
    const { current, status, vertical, children, mini } = props

    function renderStep() {
        const validChildren = React.Children.toArray(children).reduce(
            (total: React.ReactElement<StepItemProps>[], child: React.ReactElement<StepItemProps>) => {
                if (kindOf(child.type, StepItem)) {
                    total.push(child)
                }

                return total
            },
            []
        )

        const total = React.Children.count(validChildren)

        return React.Children.map(validChildren, (child: React.ReactElement<StepItemProps>, index) => {
            const childProps: StepItemProps = {}

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

            return React.cloneElement(
                child,
                Object.assign({}, child.props, childProps, { key: `__STEPS__ITEM__${index}` })
            )
        })
    }

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

export default memo(Steps)
