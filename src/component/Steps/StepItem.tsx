import React, { useEffect, useState, useCallback } from 'react'
import { stepsClass } from '@/styles'
import { FontAwesome } from '@/component/Icon'
import kindOf from '@/utils/kindOf'
import BaseIcon from '../Icon'

export interface StepItemProps {
    step?: number
    width?: number
    height?: number
    title?: string
    description?: string
    status?: 'wait' | 'process' | 'finish' | 'error'
    icon?: React.ReactElement
    onClick?: (index: number) => void
    index?: number
}

const StepItem: React.FC<StepItemProps> = (props) => {
    const { icon: Icon, title, description, step, status, width, height, onClick, index } = props
    const [showCustomIcon, setShowCustomIcon] = useState(Icon && kindOf(Icon.type, BaseIcon))

    const style: React.CSSProperties = {
        width: width ? `${width}%` : undefined,
        height: height ? `${height}%` : undefined,
    }

    const handleClick = useCallback(() => {
        onClick?.(index)
    }, [onClick, index])

    useEffect(() => {
        if (!Icon) return

        if (!React.isValidElement(Icon)) {
            console.error('Icon is not a valid Icon ,please check you Icon!')

            setShowCustomIcon(false)

            return
        }

        setShowCustomIcon(Icon && kindOf(Icon?.type, BaseIcon))
    }, [Icon])

    return (
        <div className={stepsClass('step-item', `${status}`)} style={style} onClick={handleClick}>
            <div className={stepsClass('step-item-tail')}>
                <i />
            </div>
            <div className={stepsClass('step-item-icon')}>
                {showCustomIcon && Icon}
                {!showCustomIcon && (
                    <div className={stepsClass('step-item-icon-inner')}>
                        {status !== 'finish' && status !== 'error' && <span>{step}</span>}
                        {status === 'finish' && <FontAwesome name="check-square-o" />}
                        {status === 'error' && <FontAwesome name="close" />}
                    </div>
                )}
            </div>
            <div className={stepsClass('step-item-main')}>
                <div className={stepsClass('step-item-title')}>{title}</div>
                <div className={stepsClass('step-item-description')}>{description}</div>
            </div>
        </div>
    )
}

StepItem.defaultProps = {
    status: 'wait',
}

export default React.memo(StepItem)
